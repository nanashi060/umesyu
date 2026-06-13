import { Link, usePathname } from 'expo-router';
import { Pressable, View } from 'react-native';

import { AppText, useDesignTheme, layout, radius, spacing } from '@/components/design-system';
import { useApp } from '@/providers/app-provider';

const NAV_ITEMS = [
  { href: '/', key: 'nav.home' },
  { href: '/batches', key: 'nav.batches' },
  { href: '/tips', key: 'nav.tips' },
  { href: '/settings', key: 'nav.settings' },
] as const;

export function BottomNav() {
  const pathname = usePathname();
  const theme = useDesignTheme();
  const { t } = useApp();

  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        padding: spacing.sm,
        alignItems: 'center',
      }}>
      <View
        style={{
          width: '100%',
          maxWidth: layout.maxWidth,
          minHeight: 58,
          borderRadius: radius.md,
          borderWidth: 1,
          borderColor: theme.border,
          backgroundColor: theme.surface,
          flexDirection: 'row',
          padding: spacing.xs,
          gap: spacing.xs,
          boxShadow: '0 8px 24px rgba(20, 28, 24, 0.16)',
        }}>
        {NAV_ITEMS.map((item) => {
          const selected = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href} asChild>
              <Pressable
                accessibilityRole="link"
                accessibilityState={{ selected }}
                style={({ pressed }) => ({
                  flex: 1,
                  minHeight: 44,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: radius.sm,
                  backgroundColor: selected ? theme.primary : 'transparent',
                  opacity: pressed ? 0.72 : 1,
                })}>
                <AppText
                  variant="label"
                  style={{
                    color: selected ? theme.primaryText : theme.textMuted,
                    textAlign: 'center',
                  }}>
                  {t(item.key)}
                </AppText>
              </Pressable>
            </Link>
          );
        })}
      </View>
    </View>
  );
}

