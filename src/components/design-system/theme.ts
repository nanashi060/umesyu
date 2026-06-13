import { useColorScheme } from 'react-native';

import { colors } from './tokens';

export function useDesignTheme() {
  const scheme = useColorScheme();
  return colors[scheme === 'dark' ? 'dark' : 'light'];
}

