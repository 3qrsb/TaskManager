import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    primary: {
      50: "#e3f2fd", // Blue
      100: "#bbdefb",
      200: "#90caf9",
      300: "#64b5f6",
      400: "#42a5f5",
      500: "#2196f3",
      600: "#1e88e5",
      700: "#1976d2",
      800: "#1565c0",
      900: "#0d47a1",
    },
    secondary: {
      50: "#e0f7fa", // Something like teal
      100: "#b2ebf2",
      200: "#80deea",
      300: "#4dd0e1",
      400: "#26c6da",
      500: "#00bcd4",
      600: "#00acc1",
      700: "#0097a7",
      800: "#00838f",
      900: "#006064",
    },
    accent: {
      50: "#fff3e0", // Orange
      100: "#ffe0b2",
      200: "#ffcc80",
      300: "#ffb74d",
      400: "#ffa726",
      500: "#ff9800",
      600: "#fb8c00",
      700: "#f57c00",
      800: "#ef6c00",
      900: "#e65100",
    },
    background: {
      light: "#F5F5F5", // Very Light Gray
      dark: "#1a202c",
    },
    sidebarBg: {
      light: "#E0E0E0", // Light Gray
      dark: "#2D3748",
    },
    headerFooterBg: {
      light: "#FFFFFF", // White
      dark: "#2D3748",
    },
    text: {
      light: "#333333", // Dark Gray
      dark: "#ffffff",
    },
  },
});

export default theme;
