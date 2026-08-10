/* GENERATED FROM lib/kkds-common/tokens.json -- DO NOT EDIT. Run scripts/build-tokens.mjs. */
// Portable design tokens (colors as hex, motion as CSS strings). Web consumes the
// color theme via src/index.css; all platforms share this object.
export const tokens = {
  "color": {
    "light": {
      "background": "#f4f5e4",
      "foreground": "#6b4226",
      "border": "#e5e5e5",
      "card": "#f4f5e4",
      "cardForeground": "#6b4226",
      "popover": "#f4f5e4",
      "popoverForeground": "#6b4226",
      "primary": "#ff7b54",
      "primaryForeground": "#3d2412",
      "secondary": "#f4a261",
      "secondaryForeground": "#3d2412",
      "muted": "#e8e9d6",
      "mutedForeground": "#7a5a45",
      "accent": "#e76f51",
      "accentForeground": "#3d2412",
      "destructive": "#e7000b",
      "destructiveForeground": "#fff5f0",
      "input": "#e5e5e5",
      "ring": "#7a5c45",
      "chart1": "#f54900",
      "chart2": "#009689",
      "chart3": "#104e64",
      "chart4": "#ffb900",
      "chart5": "#fe9a00",
      "sidebar": "#fafafa",
      "sidebarForeground": "#252525",
      "sidebarBorder": "#e5e5e5",
      "sidebarPrimary": "#353535",
      "sidebarPrimaryForeground": "#fafafa",
      "sidebarAccent": "#f5f5f5",
      "sidebarAccentForeground": "#353535",
      "sidebarRing": "#a1a1a1"
    },
    "dark": {
      "background": "#1c1208",
      "foreground": "#f5eee6",
      "border": "#3a2614",
      "card": "#241a0d",
      "cardForeground": "#f5eee6",
      "popover": "#241a0d",
      "popoverForeground": "#f5eee6",
      "primary": "#ff8b66",
      "primaryForeground": "#1c1208",
      "secondary": "#3a2614",
      "secondaryForeground": "#f5eee6",
      "muted": "#2d1e0f",
      "mutedForeground": "#a8886b",
      "accent": "#cc5a36",
      "accentForeground": "#f5eee6",
      "destructive": "#b83028",
      "destructiveForeground": "#f5eee6",
      "input": "#3a2614",
      "ring": "#ff8b66",
      "chart1": "#ff7b54",
      "chart2": "#3dbcab",
      "chart3": "#5b8fbf",
      "chart4": "#f4c842",
      "chart5": "#f4a83c",
      "sidebar": "#1c1208",
      "sidebarForeground": "#f5eee6",
      "sidebarBorder": "#3a2614",
      "sidebarPrimary": "#ff8b66",
      "sidebarPrimaryForeground": "#1c1208",
      "sidebarAccent": "#2d1e0f",
      "sidebarAccentForeground": "#f5eee6",
      "sidebarRing": "#ff8b66"
    }
  },
  "fontFamily": {
    "sans": [
      "Quicksand",
      "ui-sans-serif",
      "system-ui",
      "sans-serif"
    ],
    "serif": [
      "Georgia",
      "Times New Roman",
      "serif"
    ],
    "mono": [
      "ui-monospace",
      "SFMono-Regular",
      "Menlo",
      "Monaco",
      "Consolas",
      "Liberation Mono",
      "Courier New",
      "monospace"
    ]
  },
  "radius": "0.625rem",
  "spacing": "0.25rem",
  "motion": {
    "duration": {
      "instant": "50ms",
      "fast": "100ms",
      "normal": "200ms",
      "slow": "350ms",
      "deliberate": "500ms",
      "skeleton": "1500ms"
    },
    "easing": {
      "standard": "cubic-bezier(0.4, 0, 0.2, 1)",
      "enter": "cubic-bezier(0, 0, 0.2, 1)",
      "exit": "cubic-bezier(0.4, 0, 1, 1)",
      "spring": "cubic-bezier(0.175, 0.885, 0.32, 1.275)"
    }
  }
} as const;

export type Tokens = typeof tokens;

export default tokens;
