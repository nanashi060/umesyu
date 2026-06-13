import type React from 'react';
import { ScrollView, View, type ScrollViewProps } from 'react-native';

import { useDesignTheme } from './theme';
import { layout, spacing } from './tokens';

export type ScreenProps = ScrollViewProps & {
  footer?: React.ReactNode;
};

export function Screen({ children, footer, contentContainerStyle, style, ...props }: ScreenProps) {
  const theme = useDesignTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={[{ flex: 1, backgroundColor: theme.background }, style]}
        contentContainerStyle={[
          {
            width: '100%',
            maxWidth: layout.maxWidth,
            alignSelf: 'center',
            padding: spacing.md,
            paddingBottom: footer ? layout.bottomNavHeight + spacing.xl : spacing.xl,
            gap: spacing.md,
          },
          contentContainerStyle,
        ]}
        {...props}>
        {children}
      </ScrollView>
      {footer}
    </View>
  );
}
