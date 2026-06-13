export const palette = {
  plum: '#5B1F3A',
  red: '#A6362F',
  amber: '#D49A22',
  leaf: '#3F6F4F',
  ink: '#1E2320',
  paper: '#FBFCF8',
  mist: '#EEF3ED',
  white: '#FFFFFF',
  graphite: '#2C3130',
  slate: '#66716D',
} as const;

export const colors = {
  light: {
    background: palette.paper,
    surface: palette.white,
    surfaceMuted: palette.mist,
    text: palette.ink,
    textMuted: palette.slate,
    primary: palette.plum,
    primaryText: palette.white,
    accent: palette.amber,
    danger: palette.red,
    success: palette.leaf,
    border: '#DDE5DA',
  },
  dark: {
    background: '#101412',
    surface: '#1A201D',
    surfaceMuted: '#202923',
    text: '#F5F7F2',
    textMuted: '#AEB9B2',
    primary: '#E3AFC7',
    primaryText: '#1C1117',
    accent: '#E2B84A',
    danger: '#EA8D85',
    success: '#93C9A5',
    border: '#334039',
  },
} as const;

export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radius = {
  xs: 4,
  sm: 6,
  md: 8,
  round: 999,
} as const;

export const typography = {
  title: {
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '700',
  },
  heading: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '700',
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
  },
  small: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  label: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
  },
} as const;

export const shadows = {
  card: '0 8px 22px rgba(33, 43, 38, 0.10)',
  subtle: '0 1px 2px rgba(33, 43, 38, 0.08)',
} as const;

export const layout = {
  maxWidth: 760,
  touchTarget: 44,
  bottomNavHeight: 76,
} as const;

