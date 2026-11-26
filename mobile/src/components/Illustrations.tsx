import Svg, { Line, Path, Rect } from 'react-native-svg';

import { colors } from '@/theme';

const INK = '#1A1A1A';

export function OpenBriefcase() {
  return (
    <Svg width={92} height={72} viewBox="0 0 92 72">
      {/* rays */}
      <Line x1="10" y1="22" x2="16" y2="25" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" />
      <Line x1="8" y1="34" x2="15" y2="34" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" />
      <Line x1="10" y1="46" x2="16" y2="43" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" />
      <Line x1="82" y1="22" x2="76" y2="25" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" />
      <Line x1="84" y1="34" x2="77" y2="34" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" />
      <Line x1="82" y1="46" x2="76" y2="43" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" />
      {/* handle */}
      <Rect x="38" y="4" width="16" height="6" rx="1.5" fill="none" stroke={INK} strokeWidth="2.5" />
      {/* open lid */}
      <Path d="M24 10 H68 L62 38 H30 Z" fill="#FFFFFF" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      {/* body */}
      <Path d="M20 38 H72 L74 46 H18 Z" fill="#FFFFFF" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      <Rect x="18" y="46" width="56" height="14" rx="1.5" fill={INK} />
      <Line x1="25" y1="53" x2="30" y2="53" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      <Line x1="62" y1="53" x2="67" y2="53" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}

export function Clipboard() {
  return (
    <Svg width={64} height={84} viewBox="0 0 64 84">
      <Rect x="4" y="10" width="56" height="72" rx="3" fill="#FFFFFF" stroke="#555555" strokeWidth="2" />
      <Rect x="10" y="16" width="44" height="60" fill="#FFFFFF" stroke="#555555" strokeWidth="1.5" />
      <Path d="M22 4 H42 V14 H22 Z" fill="#555555" />
      <Rect x="28" y="0" width="8" height="6" rx="3" fill="#555555" />
      <Path
        d="M24 50 L30 38 L32 46 L38 36 L36 52"
        fill="none"
        stroke="#8A8A8A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function ChatBubbles() {
  return (
    <Svg width={116} height={84} viewBox="0 0 116 84">
      <Rect x="2" y="4" width="76" height="44" rx="4" fill="#FFFFFF" />
      <Path d="M14 48 L14 58 L24 48 Z" fill="#FFFFFF" />
      <Rect x="12" y="16" width="44" height="5" rx="2.5" fill="#E2E2E2" />
      <Rect x="12" y="28" width="28" height="5" rx="2.5" fill="#E2E2E2" />
      <Rect x="40" y="28" width="74" height="44" rx="4" fill={colors.primary} />
      <Path d="M92 72 L100 82 L102 72 Z" fill={colors.primary} />
      <Rect x="52" y="42" width="50" height="5" rx="2.5" fill="#FFFFFF" opacity={0.7} />
      <Rect x="52" y="54" width="36" height="5" rx="2.5" fill="#FFFFFF" opacity={0.7} />
    </Svg>
  );
}
