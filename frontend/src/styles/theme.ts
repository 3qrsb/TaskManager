import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === "dark" ? "background.dark" : "background.light",
        color: props.colorMode === "dark" ? "text.dark" : "text.light",
      },
    }),
  },
  colors: {
    primary: {
      50: "#e3f2f9",
      100: "#c5e4f3",
      200: "#a2d4ec",
      300: "#7ac1e4",
      400: "#47a9da",
      500: "#0088cc",
      600: "#007ab8",
      700: "#006ba1",
      800: "#005885",
      900: "#003f5e",
    },
    secondary: {
      50: "#ffe4e4",
      100: "#ffc9c9",
      200: "#ffacac",
      300: "#ff8f8f",
      400: "#ff7070",
      500: "#ff5252",
      600: "#e04848",
      700: "#c13e3e",
      800: "#a13535",
      900: "#7a2828",
    },
    accent: {
      50: "#ffe0f0",
      100: "#feb3d1",
      200: "#fe84b2",
      300: "#fd5592",
      400: "#fc2e7a",
      500: "#fb0069",
      600: "#e0005d",
      700: "#c5004f",
      800: "#aa0042",
      900: "#870033",
    },
    background: {
      light: "#F5F5F5",
      dark: "#1a202c",
    },
    sidebarBg: {
      light: "#E0E0E0",
      dark: "#2D3748",
    },
    headerFooterBg: {
      light: "#d1d1cf",
      dark: "#2D3748",
    },
    text: {
      light: "#333333",
      dark: "#ffffff",
    },
  },
});

export default theme;
