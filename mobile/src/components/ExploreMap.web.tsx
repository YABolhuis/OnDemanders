import { createElement, useEffect } from 'react';

import type { ExploreMapHandle } from './ExploreMap';

export type { ExploreMapHandle } from './ExploreMap';

const EMBED_CARD_HEIGHT = 64;

// react-native-maps has no web support; the browser preview embeds Google Maps instead.
export function ExploreMap({ onReady }: { onReady: (handle: ExploreMapHandle) => void }) {
  useEffect(() => {
    onReady({ zoomIn: () => {}, zoomOut: () => {}, locate: () => {} });
  }, [onReady]);

  // The embed always shows an "Open in Maps" card in its top-left corner, which would sit under
  // the filter button, so it is shifted out of the clipped container.
  return createElement(
    'div',
    { style: { position: 'absolute', inset: 0, overflow: 'hidden' } },
    createElement('iframe', {
      title: 'Map',
      src: 'https://maps.google.com/maps?ll=53.28,6.6&z=10&output=embed',
      style: {
        position: 'absolute',
        top: -EMBED_CARD_HEIGHT,
        left: 0,
        width: '100%',
        height: `calc(100% + ${EMBED_CARD_HEIGHT}px)`,
        border: 0,
      },
    }),
  );
}
