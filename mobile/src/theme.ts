import { Platform } from 'react-native';

// Neutral placeholder values. Replace with the real palette and typography once the designs arrive.
export const colors = {
  background: '#FFFFFF',
  text: '#111111',
  textMuted: '#6B6B6B',
  border: '#E5E5E5',
};

export const fonts = {
  regular: Platform.select({
    ios: 'System',
    android: 'sans-serif',
    default: 'system-ui, -apple-system, sans-serif',
  }),
};
