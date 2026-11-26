import { useEffect, useState } from 'react';
import { PanResponder, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { colors, fonts } from '@/theme';

/** A box to sign in with a finger. Reports whether anything has been drawn. */
export function SignaturePad({ onChange }: { onChange: (signed: boolean) => void }) {
  const [strokes, setStrokes] = useState<string[]>([]);
  const [current, setCurrent] = useState('');

  const [responder] = useState(() => {
    let path = '';
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      // The sheet around it must not take over the gesture halfway through a signature.
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: (event) => {
        const { locationX, locationY } = event.nativeEvent;
        path = `M${locationX.toFixed(1)} ${locationY.toFixed(1)}`;
        setCurrent(path);
      },
      onPanResponderMove: (event) => {
        const { locationX, locationY } = event.nativeEvent;
        path += ` L${locationX.toFixed(1)} ${locationY.toFixed(1)}`;
        setCurrent(path);
      },
      onPanResponderRelease: () => {
        const finished = path;
        path = '';
        setCurrent('');
        setStrokes((previous) => [...previous, finished]);
      },
    });
  });

  const signed = strokes.length > 0;
  useEffect(() => {
    onChange(signed);
  }, [signed, onChange]);

  return (
    <View>
      {/* Nothing inside takes touches, so locations stay relative to the box itself. */}
      <View style={styles.box} {...responder.panHandlers} accessibilityLabel="Signature box">
        <Svg style={StyleSheet.absoluteFill} pointerEvents="none">
          {[...strokes, current].filter(Boolean).map((d, index) => (
            <Path
              key={index}
              d={d}
              stroke={colors.ink}
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          ))}
        </Svg>
        {!signed && !current && (
          <Text style={styles.hint} pointerEvents="none">
            Sign here
          </Text>
        )}
        <View style={styles.baseline} pointerEvents="none" />
      </View>
      <Pressable
        accessibilityRole="button"
        hitSlop={8}
        onPress={() => setStrokes([])}
        disabled={!signed}
        style={styles.clear}
      >
        <Text style={[styles.clearText, !signed && styles.clearDisabled]}>Clear</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    height: 150,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.screen,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  hint: {
    fontFamily: fonts.body,
    fontSize: 15,
    color: colors.muted,
  },
  baseline: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 34,
    height: 1,
    backgroundColor: colors.line,
  },
  clear: {
    alignSelf: 'flex-end',
    marginTop: 6,
  },
  clearText: {
    fontFamily: fonts.bodyBold,
    fontSize: 14,
    color: colors.primary,
  },
  clearDisabled: {
    color: colors.muted,
  },
});
