import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

/**
 * How much of the screen the keyboard covers. Android draws the app edge to edge, so the keyboard
 * covers the page instead of shrinking it, and screens make room for it themselves.
 */
export function useKeyboardHeight() {
  const [height, setHeight] = useState(0);
  useEffect(() => {
    const shown = Keyboard.addListener('keyboardDidShow', (event) =>
      setHeight(event.endCoordinates.height),
    );
    const hidden = Keyboard.addListener('keyboardDidHide', () => setHeight(0));
    return () => {
      shown.remove();
      hidden.remove();
    };
  }, []);
  return height;
}
