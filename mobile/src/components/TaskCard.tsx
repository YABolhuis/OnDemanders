import Ionicons from '@expo/vector-icons/Ionicons';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { type Coordinate, formatPrice, type Task } from '@/lib/tasks';
import { colors, fonts } from '@/theme';

function kilometres(from: Coordinate, to: Coordinate) {
  const radians = (degrees: number) => (degrees * Math.PI) / 180;
  const dLat = radians(to.latitude - from.latitude);
  const dLon = radians(to.longitude - from.longitude);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(radians(from.latitude)) * Math.cos(radians(to.latitude)) * Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/** Only when location access was already given; the card never asks for it. */
function useDistance(to: Coordinate) {
  const [km, setKm] = useState<number | null>(null);
  useEffect(() => {
    let cancelled = false;
    Location.getForegroundPermissionsAsync()
      .then(({ granted }) => (granted ? Location.getLastKnownPositionAsync() : null))
      .then((position) => {
        if (!cancelled && position) setKm(kilometres(position.coords, to));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [to]);
  return km;
}

export function TaskCard({
  task,
  accepted,
  onAccept,
}: {
  task: Task;
  accepted: boolean;
  onAccept: () => void;
}) {
  const km = useDistance(task.coordinate);
  const [saved, setSaved] = useState(false);

  return (
    <View style={styles.card}>
      {km !== null && (
        <View style={styles.distance}>
          <Ionicons name="location-outline" size={14} color={colors.ink} />
          <Text style={styles.distanceText}>{km < 1 ? '< 1' : Math.round(km)} km</Text>
        </View>
      )}
      <Text style={styles.address} numberOfLines={1}>
        {task.client}; {task.address}
      </Text>

      <View style={styles.divider} />

      <View style={styles.main}>
        <View style={styles.thumb}>
          <Ionicons name={task.icon} size={30} color={colors.primary} />
        </View>
        <View style={styles.titleBlock}>
          <Text style={styles.title} numberOfLines={2}>
            {task.title}
          </Text>
          <Text style={styles.price}>{formatPrice(task.price)}</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={saved ? 'Remove bookmark' : 'Bookmark'}
          hitSlop={8}
          onPress={() => setSaved(!saved)}
        >
          <Ionicons name={saved ? 'bookmark' : 'bookmark-outline'} size={22} color={colors.ink} />
        </Pressable>
        <Pressable accessibilityRole="button" accessibilityLabel="More" hitSlop={8}>
          <Ionicons name="ellipsis-vertical" size={20} color={colors.ink} />
        </Pressable>
      </View>

      <Text style={styles.description}>{task.description}</Text>

      <View style={styles.footer}>
        <View style={styles.chip}>
          <Text style={styles.chipText}>{task.category}</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ disabled: accepted }}
          disabled={accepted}
          onPress={onAccept}
          style={({ pressed }) => [
            styles.accept,
            accepted && styles.accepted,
            pressed && styles.pressed,
          ]}
        >
          <Ionicons
            name={accepted ? 'checkmark' : 'add'}
            size={20}
            color={accepted ? colors.primaryText : colors.ink}
          />
          <Text style={[styles.acceptText, accepted && styles.acceptedText]}>
            {accepted ? 'Accepted' : 'Accept'}
          </Text>
        </Pressable>
      </View>
      {accepted && (
        <Text style={styles.acceptedNote}>
          Added to your to-do list. You can chat with {task.client.split(' ')[0]} in your inbox.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
  },
  distance: {
    alignSelf: 'flex-start',
    height: 30,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.line,
  },
  distanceText: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.ink,
  },
  address: {
    marginTop: 8,
    fontFamily: fonts.body,
    fontSize: 15,
    color: colors.ink,
  },
  divider: {
    height: 8,
    marginTop: 14,
    marginHorizontal: -20,
    backgroundColor: colors.screen,
  },
  main: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
  },
  thumb: {
    width: 64,
    height: 64,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primarySoft,
  },
  titleBlock: {
    flex: 1,
    gap: 6,
  },
  title: {
    fontFamily: fonts.title,
    fontSize: 17,
    color: colors.ink,
  },
  price: {
    fontFamily: fonts.title,
    fontSize: 17,
    color: colors.price,
  },
  description: {
    marginTop: 12,
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 20,
    color: colors.inkSoft,
  },
  footer: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: colors.chip,
  },
  chipText: {
    fontFamily: fonts.bodyBold,
    fontSize: 14,
    color: colors.chipText,
  },
  accept: {
    height: 42,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.surface,
  },
  accepted: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  pressed: {
    opacity: 0.8,
  },
  acceptText: {
    fontFamily: fonts.body,
    fontSize: 17,
    color: colors.ink,
  },
  acceptedText: {
    color: colors.primaryText,
  },
  acceptedNote: {
    marginTop: 12,
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.primary,
  },
});
