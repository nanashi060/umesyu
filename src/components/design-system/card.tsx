import { View, type ViewProps } from 'react-native';

import { useDesignTheme } from './theme';
import { radius, shadows, spacing } from './tokens';

export function Card({ style, ...props }: ViewProps) {
  const theme = useDesignTheme();
  return (
    <View
      style={[
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
          borderWidth: 1,
          borderRadius: radius.md,
          padding: spacing.md,
          gap: spacing.sm,
          boxShadow: shadows.card,
        },
        style,
      ]}
      {...props}
    />
  );
}

