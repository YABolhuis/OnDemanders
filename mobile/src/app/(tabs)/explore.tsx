import { useCallback, useState } from 'react';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import type { ComponentProps } from 'react';

import { AppHeader } from '@/components/AppHeader';
import { ExploreMap, type ExploreMapHandle } from '@/components/ExploreMap';
import { colors } from '@/theme';

export default function ExploreScreen() {
  const [map, setMap] = useState<ExploreMapHandle | null>(null);
  const onReady = useCallback((handle: ExploreMapHandle) => setMap(handle), []);

  return (
    <View style={styles.screen}>
      <AppHeader
        title="Explore"
        actions={[
          { icon: 'help-circle', label: 'Help' },
          { icon: 'search-outline', label: 'Search' },
        ]}
      />
      <View style={styles.mapArea}>
        <ExploreMap onReady={onReady} />
        <MapButton icon="options-outline" label="Filters" style={styles.filters} />
        <MapButton
          icon="locate-outline"
          label="Show my location"
          style={styles.locate}
          onPress={() => map?.locate()}
        />
        <View style={styles.zoom}>
          <Pressable
            style={styles.zoomButton}
            onPress={() => map?.zoomIn()}
            accessibilityRole="button"
            accessibilityLabel="Zoom in"
          >
            <Ionicons name="add" size={24} color={colors.inkSoft} />
          </Pressable>
          <View style={styles.zoomDivider} />
          <Pressable
            style={styles.zoomButton}
            onPress={() => map?.zoomOut()}
            accessibilityRole="button"
            accessibilityLabel="Zoom out"
          >
            <Ionicons name="remove" size={24} color={colors.inkSoft} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

function MapButton({
  icon,
  label,
  style,
  onPress,
}: {
  icon: ComponentProps<typeof Ionicons>['name'];
  label: string;
  style: StyleProp<ViewStyle>;
  onPress?: () => void;
}) {
  return (
    <Pressable
      style={[styles.mapButton, style]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Ionicons name={icon} size={20} color={colors.ink} />
    </Pressable>
  );
}

const shadow = {
  shadowColor: '#000',
  shadowOpacity: 0.15,
  shadowRadius: 3,
  shadowOffset: { width: 0, height: 1 },
  elevation: 3,
} as const;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.screen,
  },
  mapArea: {
    flex: 1,
  },
  mapButton: {
    position: 'absolute',
    top: 10,
    width: 34,
    height: 34,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    ...shadow,
  },
  filters: {
    left: 8,
  },
  locate: {
    right: 10,
  },
  zoom: {
    position: 'absolute',
    right: 10,
    bottom: 16,
    width: 34,
    borderRadius: 4,
    backgroundColor: colors.surface,
    ...shadow,
  },
  zoomButton: {
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoomDivider: {
    height: StyleSheet.hairlineWidth,
    marginHorizontal: 6,
    backgroundColor: colors.line,
  },
});
