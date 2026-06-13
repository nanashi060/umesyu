import { Pressable, View, type PressableProps } from 'react-native';

import { AppText } from './text';
import { useDesignTheme } from './theme';
import { layout, radius, spacing } from './tokens';

export type ButtonProps = PressableProps & {
  label: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: string;
};

export function Button({ label, variant = 'primary', icon, style, disabled, ...props }: ButtonProps) {
  const theme = useDesignTheme();
  const backgroundColor =
    variant === 'primary' ? theme.primary : variant === 'secondary' ? theme.surfaceMuted : 'transparent';
  const color = variant === 'primary' ? theme.primaryText : theme.text;
  const borderColor = variant === 'ghost' ? theme.border : backgroundColor;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      style={(state) => {
        const customStyle = typeof style === 'function' ? style(state) : style;
        return [
          {
            minHeight: layout.touchTarget,
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.sm,
            borderRadius: radius.round,
            borderWidth: 1,
            borderColor,
            backgroundColor,
            opacity: disabled ? 0.48 : state.pressed ? 0.74 : 1,
            alignItems: 'center',
            justifyContent: 'center',
          },
          customStyle,
        ];
      }}
      {...props}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
        {icon ? <AppText style={{ color }}>{icon}</AppText> : null}
        <AppText variant="label" style={{ color }}>
          {label}
        </AppText>
      </View>
    </Pressable>
  );
}
