import { TextInput, View, type TextInputProps } from 'react-native';

import { AppText } from './text';
import { useDesignTheme } from './theme';
import { radius, spacing, typography } from './tokens';

export type TextFieldProps = TextInputProps & {
  label: string;
};

export function TextField({ label, style, ...props }: TextFieldProps) {
  const theme = useDesignTheme();

  return (
    <View style={{ gap: spacing.xs }}>
      <AppText variant="label">{label}</AppText>
      <TextInput
        placeholderTextColor={theme.textMuted}
        style={[
          typography.body,
          {
            minHeight: 48,
            borderColor: theme.border,
            borderWidth: 1,
            borderRadius: radius.md,
            paddingHorizontal: spacing.md,
            color: theme.text,
            backgroundColor: theme.surface,
          },
          style,
        ]}
        {...props}
      />
    </View>
  );
}

