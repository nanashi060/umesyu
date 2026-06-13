import { Text, type TextProps } from 'react-native';

import { useDesignTheme } from './theme';
import { typography } from './tokens';

export type AppTextProps = TextProps & {
  variant?: keyof typeof typography;
  tone?: 'default' | 'muted' | 'primary' | 'success' | 'danger';
};

export function AppText({ variant = 'body', tone = 'default', style, ...props }: AppTextProps) {
  const theme = useDesignTheme();
  const color =
    tone === 'muted'
      ? theme.textMuted
      : tone === 'primary'
        ? theme.primary
        : tone === 'success'
          ? theme.success
          : tone === 'danger'
            ? theme.danger
            : theme.text;

  return <Text selectable style={[typography[variant], { color }, style]} {...props} />;
}

