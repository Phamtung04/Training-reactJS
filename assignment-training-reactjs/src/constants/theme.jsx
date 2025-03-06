import { createTheme, responsiveFontSizes } from '@mui/material/styles';


let demoTheme = createTheme({
    cssVariables: {
      colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    colorSchemes: {
      light: true,
      dark: {
        palette: {
          background: {
            default: '#111827',
            paper: '#111827',
          },
          text: {
            primary: 'var(--color-white)',
            secondary: 'var(--color-white)',
          },
        },
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
  });

  demoTheme = responsiveFontSizes(demoTheme);

export default demoTheme;