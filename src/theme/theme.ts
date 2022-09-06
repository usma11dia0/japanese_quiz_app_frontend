import { createTheme, responsiveFontSizes } from "@mui/material";
import { brown, grey } from "@mui/material/colors";

let theme = createTheme({
  spacing: 8,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: ["Yuji Boku", "serif"].join(","),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
          @font-face {
            font-family: 'Yuji Boku', serif;
          }
          body {
            background-image: url(../assets/background/japanese-paper_00372.jpg);
          }
        `,
    },
  },
  palette: {
    primary: {
      main: brown["A400"],
      // contrastText: grey[800],
    },
    secondary: {
      main: grey[50],
    },
  },
});
theme = responsiveFontSizes(theme);

// 日本語フォント初期
// font-family: "Kameron", "serif";
// font-family: 'Noto Sans JP', sans-serif;

export default theme;
