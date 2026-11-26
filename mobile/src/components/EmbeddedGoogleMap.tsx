import * as Location from 'expo-location';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { WebView, type WebViewMessageEvent } from 'react-native-webview';

import type { ExploreMapProps, MapPin } from './ExploreMap';
import { PIN_HEIGHT, PIN_WIDTH, taskPinSvg } from './TaskPin';

const INITIAL_VIEW = { latitude: 53.28, longitude: 6.6, zoom: 10 };

function pinMarkup(pins: MapPin[]) {
  return pins.map((pin) => ({ ...pin, svg: taskPinSvg(pin.count) }));
}

function mapHtml(pins: MapPin[]) {
  const { latitude, longitude, zoom } = INITIAL_VIEW;
  return `<!doctype html><html><head>
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<style>
html,body,#map{margin:0;height:100%;background:#e5e3df}
.pin{background:none;border:0}
.pin svg{display:block;filter:drop-shadow(0 2px 3px rgba(0,0,0,.35))}
.me{width:16px;height:16px;border-radius:50%;background:#4285F4;border:3px solid #fff;box-shadow:0 0 0 1px rgba(0,0,0,.2);box-sizing:border-box}
.leaflet-control-attribution{font-size:9px}
</style></head><body><div id="map"></div><script>
var map = L.map('map', { zoomControl: false, attributionControl: true }).setView([${latitude}, ${longitude}], ${zoom});
L.tileLayer('https://mt{s}.google.com/vt/lyrs=m&hl=nl&x={x}&y={y}&z={z}', {
  subdomains: '0123', maxZoom: 20, attribution: 'Kaartgegevens &copy; Google'
}).addTo(map);
var pins = L.layerGroup().addTo(map), me = null;
function send(message) { window.ReactNativeWebView.postMessage(JSON.stringify(message)); }
window.setPins = function (list) {
  pins.clearLayers();
  list.forEach(function (pin) {
    L.marker([pin.latitude, pin.longitude], {
      icon: L.divIcon({ className: 'pin', html: pin.svg, iconSize: [${PIN_WIDTH}, ${PIN_HEIGHT}], iconAnchor: [${PIN_WIDTH / 2}, ${PIN_HEIGHT}] })
    }).on('click', function () { send({ type: 'pin', id: pin.id }); }).addTo(pins);
  });
};
window.showMe = function (lat, lng) {
  if (me) me.setLatLng([lat, lng]);
  else me = L.marker([lat, lng], { icon: L.divIcon({ className: 'me', iconSize: [16, 16] }), interactive: false }).addTo(map);
  map.setView([lat, lng], 14);
};
setPins(${JSON.stringify(pinMarkup(pins))});
</script></body></html>`;
}

/**
 * Google Maps without an API key, for Android builds that have no Maps SDK key configured: Leaflet
 * draws Google's map tiles, so it can also show the task pins. Panning and pinch-zoom happen in the
 * WebView; the zoom and locate buttons drive it from outside.
 */
export function EmbeddedGoogleMap({ onReady, pins, onPinPress }: ExploreMapProps) {
  const web = useRef<WebView<object>>(null);
  // The page is built once; later pin changes are pushed into it.
  const [html] = useState(() => mapHtml(pins));
  const loaded = useRef(false);
  const onPinPressRef = useRef(onPinPress);

  useEffect(() => {
    onPinPressRef.current = onPinPress;
  }, [onPinPress]);

  useEffect(() => {
    if (loaded.current) {
      web.current?.injectJavaScript(`setPins(${JSON.stringify(pinMarkup(pins))}); true;`);
    }
  }, [pins]);

  useEffect(() => {
    const run = (script: string) => web.current?.injectJavaScript(`${script}; true;`);
    onReady({
      zoomIn: () => run('map.zoomIn()'),
      zoomOut: () => run('map.zoomOut()'),
      locate: async () => {
        const { granted } = await Location.requestForegroundPermissionsAsync();
        if (!granted) {
          return;
        }
        const position = await Location.getCurrentPositionAsync({});
        run(`showMe(${position.coords.latitude}, ${position.coords.longitude})`);
      },
    });
  }, [onReady]);

  return (
    <WebView
      ref={web}
      style={StyleSheet.absoluteFill}
      source={{ html, baseUrl: 'https://ondemanders.app' }}
      originWhitelist={['*']}
      javaScriptEnabled
      domStorageEnabled
      setSupportMultipleWindows={false}
      overScrollMode="never"
      onLoadEnd={() => {
        loaded.current = true;
      }}
      onMessage={(event: WebViewMessageEvent) => {
        try {
          const message = JSON.parse(event.nativeEvent.data) as { type: string; id: string };
          if (message.type === 'pin') onPinPressRef.current(message.id);
        } catch {}
      }}
    />
  );
}
