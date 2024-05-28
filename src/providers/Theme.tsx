'use client';
import { useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import colors from './theme-colors';

const Theme = props => {
  const { children, mode } = props;
  const theme = useMemo(
    () =>
      createTheme({
        components: {
          MuiButton: {
            styleOverrides: {
              root: ({ ownerState }) => ({
                padding: '6px 16px 7px 16px',
                borderRadius: 2,
                height: 32,
                gap: 8,
                textTransform: 'none',
                fontWeight: 'bold',
                fontSize: 16,
                lineHeight: 1,
                color: theme.palette[ownerState.color].contrastText,
                '&.Mui-disabled': {
                  opacity: 0.4,
                  color: theme.palette[ownerState.color].main,
                },
                '&.MuiButton-endIcon': {
                  fontSize: 14,
                  ml: 0,
                },
              }),
            },
          },
          MuiChip: {
            styleOverrides: {
              root: {
                '& .MuiChip-label': {
                  padding: '0 16px',
                },
                borderRadius: 20,
                fontWeight: 600,
                minHeight: 44,
              },
            },
            variants: [
              {
                props: {
                  variant: 'outlined',
                },
                style: {
                  borderColor: mode === 'light' ? colors.indigo : colors.indigoLight,
                  color: mode === 'light' ? colors.indigo : colors.indigoLight,
                },
              },
              {
                props: {
                  variant: 'filled',
                },
                style: {
                  '&:hover': {
                    backgroundColor: mode === 'light' ? colors.indigoDeep : colors.indigoLight,
                  },
                  backgroundColor: mode === 'light' ? colors.indigo : colors.indigoLight,
                  color: colors.white,
                },
              },
            ],
          },
          MuiDataGrid: {
            styleOverrides: {
              root: {
                '& .MuiSvgIcon-root': {
                  color: mode === 'light' ? colors.darkGray : colors.white,
                },
              },
            },
          },
          MuiIconButton: {
            styleOverrides: {
              root: {
                aspectRatio: '1 / 1',
                color: mode === 'light' ? colors.darkGray : colors.white,
              },
            },
          },
          MuiListItemIcon: {
            styleOverrides: {
              root: {
                color: mode === 'light' ? colors.darkGray : colors.lightGray,
              },
            },
          },
          MuiModal: {
            styleOverrides: {
              root: {
                '& .MuiMenu-paper': {
                  overflow: 'visible',
                },
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundColor: mode === 'light' ? colors.white : colors.offBlack,
                color: mode === 'light' ? colors.darkGray : colors.lightGray,
              },
            },
          },
          MuiInput: {
            styleOverrides: {
              root: {
                borderBottomColor: colors.lightGray,
                '&:before': {
                  borderBottomColor: mode === 'light' ? colors.darkGray : colors.lightGray,
                },
              },
            },
          },
          MuiInputBase: {
            styleOverrides: {
              root: {
                marginBottom: 32,
                fieldset: {
                  borderColor: mode === 'light' ? colors.darkGray : colors.lightGray,
                },
                svg: {
                  color: mode === 'light' ? colors.darkGray : colors.lightGray,
                },
              },
            },
          },
          MuiInputLabel: {
            styleOverrides: {
              root: {
                color: mode === 'light' ? colors.darkGray : colors.lightGray,
              },
            },
          },
        },
        palette:
          mode === 'light'
            ? {
                primary: {
                  main: colors.indigo,
                  light: colors.indigoPale,
                  dark: colors.indigoDeep,
                  contrastText: colors.indigo,
                },
                secondary: {
                  main: colors.mint,
                  light: colors.mintLight,
                  dark: colors.mintDark,
                  contrastText: colors.white,
                },
                text: {
                  primary: colors.darkGray,
                },
                background: {
                  default: colors.white,
                },
              }
            : {
                primary: {
                  main: colors.mint,
                  light: colors.mintLight,
                  contrastText: colors.mint,
                  dark: colors.mintDark,
                },
                secondary: {
                  main: colors.indigo,
                  dark: colors.indigoDeep,
                  contrastText: colors.white,
                  light: colors.indigoLight,
                },
                text: {
                  primary: colors.lightGray,
                },
                background: {
                  default: colors.offBlack,
                },
              },
        typography: {
          fontFamily: 'inherit',
        },
      }),
    [mode],
  );
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
