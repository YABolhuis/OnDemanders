import { useEffect, useState } from 'react';
import { Dimensions, Keyboard } from 'react-native';

/**
 * How much of the screen the keyboard covers. Android draws the app edge to edge, so the keyboard
 * covers the page instead of shrinking it, and screens make room for it themselves.
 */
export function useKeyboardHeight() {
  const [height, setHeight] = useState(0);
  useEffect(() => {
    // The reported height leaves out Android's navigation bar below the keyboard, so measure from
    // the keyboard's top edge to the bottom of the screen instead.
    const shown = Keyboard.addListener('keyboardDidShow', (event) =>
      setHeight(
        Math.max(
          event.endCoordinates.height,
          Dimensions.get('screen').height - event.endCoordinates.screenY,
        ),
      ),
    );
    const hidden = Keyboard.addListener('keyboardDidHide', () => setHeight(0));
    return () => {
      shown.remove();
      hidden.remove();
    };
  }, []);
  return height;
}
