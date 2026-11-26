import Svg, { Path, Text as SvgText } from 'react-native-svg';

import { colors, fonts } from '@/theme';

export const PIN_WIDTH = 40;
export const PIN_HEIGHT = 50;
export const PIN_PATH =
  'M20 2C10.06 2 2 9.86 2 19.56c0 4.3 1.6 8 4 11.3L20 48l14-17.14c2.4-3.3 4-7 4-11.3C38 9.86 29.94 2 20 2z';

/** The green map pin with the number of tasks offered in a village or city. */
export function TaskPin({ count }: { count: number }) {
  return (
    <Svg width={PIN_WIDTH} height={PIN_HEIGHT} viewBox={`0 0 ${PIN_WIDTH} ${PIN_HEIGHT}`}>
      <Path d={PIN_PATH} fill={colors.primary} stroke="#FFFFFF" strokeWidth={2.5} strokeLinejoin="round" />
      <SvgText
        x={20}
        y={25.5}
        fill="#FFFFFF"
        fontFamily={fonts.bold}
        fontSize={16}
        fontWeight="700"
        textAnchor="middle"
      >
        {String(count)}
      </SvgText>
    </Svg>
  );
}

/** The same pin as markup, for the map that runs in a WebView. */
export function taskPinSvg(count: number) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${PIN_WIDTH}" height="${PIN_HEIGHT}" viewBox="0 0 ${PIN_WIDTH} ${PIN_HEIGHT}"><path d="${PIN_PATH}" fill="${colors.primary}" stroke="#fff" stroke-width="2.5" stroke-linejoin="round"/><text x="20" y="25.5" fill="#fff" font-family="Roboto,Arial,sans-serif" font-size="16" font-weight="700" text-anchor="middle">${count}</text></svg>`;
}
