import * as Location from 'expo-location';
import { useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, type Region } from 'react-native-maps';

export type ExploreMapHandle = {
  zoomIn: () => void;
  zoomOut: () => void;
  locate: () => void;
};

export const INITIAL_REGION: Region = {
  latitude: 53.28,
  longitude: 6.6,
  latitudeDelta: 0.45,
  longitudeDelta: 0.45,
};

const MIN_DELTA = 0.0005;
const MAX_DELTA = 90;

type Props = { onReady: (handle: ExploreMapHandle) => void };

export function ExploreMap({ onReady }: Props) {
  const map = useRef<MapView>(null);
  const region = useRef<Region>(INITIAL_REGION);
  const [hasLocation, setHasLocation] = useState(false);

  useEffect(() => {
    Location.requestForegroundPermissionsAsync().then(({ granted }) => setHasLocation(granted));
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
    />
  );
}
