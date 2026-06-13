import { Pressable, type PressableProps } from 'react-native';

import { AppText } from './text';
import { useDesignTheme } from './theme';
import { layout, radius, spacing } from './tokens';

export type ChipProps = PressableProps & {
  label: string;
  selected?: boolean;
};

export function Chip({ label, selected, style, ...props }: ChipProps) {
  const theme = useDesignTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      style={(state) => {
        const customStyle = typeof style === 'function' ? style(state) : style;
        return [
          {
            minHeight: layout.touchTarget,
            paddingHorizontal: spacing.md,
            borderRadius: radius.round,
            borderWidth: 1,
            borderColor: selected ? theme.primary : theme.border,
            backgroundColor: selected ? theme.primary : theme.surface,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: state.pressed ? 0.72 : 1,
          },
          customStyle,
        ];
      }}
      {...props}>
      <AppText variant="label" style={{ color: selected ? theme.primaryText : theme.text }}>
        {label}
      </AppText>
    </Pressable>
  );
}
