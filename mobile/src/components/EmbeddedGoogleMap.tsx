import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

import type { ExploreMapHandle } from './ExploreMap';

const EMBED_CARD_HEIGHT = 64;
const MIN_ZOOM = 3;
const MAX_ZOOM = 20;

type View = { latitude: number; longitude: number; zoom: number };

const INITIAL_VIEW: View = { latitude: 53.28, longitude: 6.6, zoom: 10 };

function embedHtml({ latitude, longitude, zoom }: View) {
  const src = `https://maps.google.com/maps?ll=${latitude},${longitude}&z=${zoom}&output=embed`;
  // The embed always shows an "Open in Maps" card in its top-left corner, which would sit under
  // the filter button, so it is shifted out of the clipped page.
  return `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<style>html,body{margin:0;height:100%;overflow:hidden;background:#e5e3df}
iframe{position:absolute;top:-${EMBED_CARD_HEIGHT}px;left:0;width:100%;height:calc(100% + ${EMBED_CARD_HEIGHT}px);border:0}</style>
</head><body><iframe src="${src}" allowfullscreen></iframe></body></html>`;
}

/**
 * Google Maps without an API key, for Android builds that have no Maps SDK key configured.
 * Panning and pinch-zoom happen inside the embed; the zoom and locate buttons re-centre it.
 */
export function EmbeddedGoogleMap({ onReady }: { onReady: (handle: ExploreMapHandle) => void }) {
  const [view, setView] = useState<View>(INITIAL_VIEW);

  useEffect(() => {
    const zoomBy = (step: number) =>
      setView((current) => ({
        ...current,
        zoom: Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, current.zoom + step)),
      }));

    onReady({
      zoomIn: () => zoomBy(1),
      zoomOut: () => zoomBy(-1),
      locate: async () => {
        const { granted } = await Location.requestForegroundPermissionsAsync();
        if (!granted) {
          return;
        }
        const position = await Location.getCurrentPositionAsync({});
        setView({ latitude: position.coords.latitude, longitude: position.coords.longitude, zoom: 14 });
      },
    });
  }, [onReady]);

  return (
    <WebView
      style={StyleSheet.absoluteFill}
      source={{ html: embedHtml(view), baseUrl: 'https://maps.google.com' }}
      originWhitelist={['*']}
      javaScriptEnabled
      domStorageEnabled
      setSupportMultipleWindows={false}
      overScrollMode="never"
    />
  );
}
