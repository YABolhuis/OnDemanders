import Svg, { Circle, Defs, LinearGradient, RadialGradient, Rect, Stop } from 'react-native-svg';

import { colors } from '@/theme';

/** The app icon as drawn in assets/brand/logo.svg, sharp at any size. */
export function AppLogo({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 1024 1024" accessibilityLabel="OnDemanders logo">
      <Defs>
        <LinearGradient id="appLogoBg" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#1B1C1B" />
          <Stop offset="0.55" stopColor="#131413" />
          <Stop offset="1" stopColor="#0D0E0D" />
        </LinearGradient>
        <RadialGradient id="appLogoGlow" cx="0.5" cy="0" r="0.75">
          <Stop offset="0" stopColor="#FFFFFF" stopOpacity={0.045} />
          <Stop offset="1" stopColor="#FFFFFF" stopOpacity={0} />
        </RadialGradient>
        <LinearGradient id="appLogoEdge" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFFFFF" stopOpacity={0.16} />
          <Stop offset="0.25" stopColor="#FFFFFF" stopOpacity={0.03} />
          <Stop offset="1" stopColor="#FFFFFF" stopOpacity={0} />
        </LinearGradient>
      </Defs>
      <Rect width={1024} height={1024} rx={228} fill="url(#appLogoBg)" />
      <Rect width={1024} height={1024} rx={228} fill="url(#appLogoGlow)" />
      <Rect
        x={2}
        y={2}
        width={1020}
        height={1020}
        rx={226}
        fill="none"
        stroke="url(#appLogoEdge)"
        strokeWidth={4}
      />
      <Circle cx={492} cy={500} r={186} fill="none" stroke="#FFFFFF" strokeWidth={96} />
      <Rect x={719} y={622} width={92} height={92} fill={colors.accent} />
    </Svg>
  );
}
