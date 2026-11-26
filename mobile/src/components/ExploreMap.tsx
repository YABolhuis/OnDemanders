import Constants, { ExecutionEnvironment } from 'expo-constants';
import * as Location from 'expo-location';
import { useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, type Region } from 'react-native-maps';

import { EmbeddedGoogleMap } from './EmbeddedGoogleMap';
import { TaskPin } from './TaskPin';

export type ExploreMapHandle = {
  zoomIn: () => void;
  zoomOut: () => void;
  locate: () => void;
};

export type MapPin = { id: string; latitude: number; longitude: number; count: number };

export type ExploreMapProps = {
  onReady: (handle: ExploreMapHandle) => void;
  pins: MapPin[];
  onPinPress: (id: string) => void;
};

export const INITIAL_REGION: Region = {
  latitude: 53.28,
  longitude: 6.6,
  latitudeDelta: 0.45,
  longitudeDelta: 0.45,
};

const MIN_DELTA = 0.0005;
const MAX_DELTA = 90;

// Expo Go ships its own Google Maps key. A standalone Android build has none yet, and the native
// Google map crashes without one, so it shows a WebView map instead.
const nativeMapAvailable =
  Platform.OS !== 'android' || Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

export function ExploreMap(props: ExploreMapProps) {
  return nativeMapAvailable ? <NativeMap {...props} /> : <EmbeddedGoogleMap {...props} />;
}

function NativeMap({ onReady, pins, onPinPress }: ExploreMapProps) {
  const map = useRef<MapView>(null);
  const region = useRef<Region>(INITIAL_REGION);
  const [hasLocation, setHasLocation] = useState(false);
  // Android snapshots custom markers; they must track changes until the SVG has drawn once.
  const [pinsDrawn, setPinsDrawn] = useState(false);

  useEffect(() => {
    Location.requestForegroundPermissionsAsync().then(({ granted }) => setHasLocation(granted));
    const timer = setTimeout(() => setPinsDrawn(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const zoomBy = (factor: number) => {
      const current = region.current;
      const delta = (value: number) => Math.min(MAX_DELTA, Math.max(MIN_DELTA, value * factor));
      map.current?.animateToRegion(
        {
          ...current,
          latitudeDelta: delta(current.latitudeDelta),
          longitudeDelta: delta(current.longitudeDelta),
        },
        250,
      );
    };

    onReady({
      zoomIn: () => zoomBy(0.5),
      zoomOut: () => zoomBy(2),
      locate: async () => {
        const { granted } = await Location.requestForegroundPermissionsAsync();
        setHasLocation(granted);
        if (!granted) {
          return;
        }
        const position = await Location.getCurrentPositionAsync({});
        map.current?.animateToRegion(
          {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          },
          400,
        );
      },
    });
  }, [onReady]);

  return (
    <MapView
      ref={map}
      style={StyleSheet.absoluteFill}
      // Expo Go on iOS only ships Apple Maps; Google Maps there needs a development build with an API key.
      provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
      initialRegion={INITIAL_REGION}
      onRegionChangeComplete={(next) => {
        region.current = next;
      }}
      showsUserLocation={hasLocation}
      showsMyLocationButton={false}
      showsCompass={false}
      toolbarEnabled={false}
      zoomControlEnabled={false}
    >
      {pins.map((pin) => (
        <Marker
          key={pin.id}
          coordinate={pin}
          anchor={{ x: 0.5, y: 1 }}
          tracksViewChanges={!pinsDrawn}
          onPress={() => onPinPress(pin.id)}
        >
          <TaskPin count={pin.count} />
        </Marker>
      ))}
    </MapView>
  );
}
