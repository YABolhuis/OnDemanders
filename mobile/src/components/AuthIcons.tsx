import Svg, { Circle, Path, Rect } from 'react-native-svg';

type IconProps = { color: string; size?: number };

const stroke = { strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

export function ChevronLeftIcon({ color, size = 22 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M15 5l-7 7 7 7" stroke={color} {...stroke} strokeWidth={2.2} />
    </Svg>
  );
}

export function MailIcon({ color, size = 18 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x={3} y={5} width={18} height={14} rx={2} stroke={color} {...stroke} />
      <Path d="M3.5 6.5l8.5 6 8.5-6" stroke={color} {...stroke} />
    </Svg>
  );
}

export function LockIcon({ color, size = 18 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x={4.5} y={10} width={15} height={11} rx={2} stroke={color} {...stroke} />
      <Path d="M8 10V7a4 4 0 0 1 8 0v3" stroke={color} {...stroke} />
      <Circle cx={12} cy={15.5} r={1.3} fill={color} />
    </Svg>
  );
}

export function PersonIcon({ color, size = 18 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={8} r={4} stroke={color} {...stroke} />
      <Path d="M4.5 20.5c.8-3.6 3.8-5.5 7.5-5.5s6.7 1.9 7.5 5.5" stroke={color} {...stroke} />
    </Svg>
  );
}

export function CheckIcon({ color, size = 18 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M5 12.5l4.5 4.5L19 7.5" stroke={color} {...stroke} strokeWidth={2} />
    </Svg>
  );
}

export function SearchIcon({ color, size = 18 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={11} cy={11} r={6.5} stroke={color} {...stroke} />
      <Path d="M16 16l4.5 4.5" stroke={color} {...stroke} />
    </Svg>
  );
}

/** Open while the password shows, struck through while it is hidden. */
export function EyeIcon({ color, size = 18, struck }: IconProps & { struck?: boolean }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"
        stroke={color}
        {...stroke}
      />
      <Circle cx={12} cy={12} r={3} stroke={color} {...stroke} />
      {struck && <Path d="M4 4l16 16" stroke={color} {...stroke} />}
    </Svg>
  );
}
