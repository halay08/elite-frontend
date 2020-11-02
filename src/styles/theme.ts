import { createMuiTheme } from '@material-ui/core';
import tinycolor from 'tinycolor2';

const primary = '#FF6711';
const secondary = '#FF5C93';
const warning = '#FFC260';
const success = '#3CD4A0';
const info = '#9013FE';

const lightenRate = 7.5;
const darkenRate = 45;

const globalTheme = createMuiTheme({
  typography: {
    h1: {
      fontSize: '3rem',
    },
    h2: {
      fontSize: '2rem',
    },
    h3: {
      fontSize: '1.64rem',
    },
    h4: {
      fontSize: '1.5rem',
    },
    h5: {
      fontSize: '1.285rem',
    },
    h6: {
      fontSize: '1.142rem',
    },
  },
  palette: {
    primary: {
      main: primary,
      light: tinycolor(primary).lighten(lightenRate).toHexString(),
      dark: tinycolor(primary).darken(darkenRate).toHexString(),
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: secondary,
      light: tinycolor(secondary).lighten(lightenRate).toHexString(),
      dark: tinycolor(secondary).darken(darkenRate).toHexString(),
      contrastText: '#FFFFFF',
    },
    warning: {
      main: warning,
      light: tinycolor(warning).lighten(lightenRate).toHexString(),
      dark: tinycolor(warning).darken(darkenRate).toHexString(),
    },
    success: {
      main: success,
      light: tinycolor(success).lighten(lightenRate).toHexString(),
      dark: tinycolor(success).darken(darkenRate).toHexString(),
    },
    info: {
      main: info,
      light: tinycolor(info).lighten(lightenRate).toHexString(),
      dark: tinycolor(info).darken(darkenRate).toHexString(),
    },
    text: {
      primary: '#4A4A4A',
      secondary: '#6E6E6E',
      hint: '#B9B9B9',
    },
    background: {
      default: '#F6F7FF',
      light: '#F3F5FF',
      white: '#FFFFFF',
    },
    mainSidebar: {
      main: '#313541',
    },
    mainSidebarText: {
      main: '#B8B3B3',
    },
    mainSidebarTextHover: {
      main: '#FFFFFF',
    },
  },
  customShadows: {},
  brand: '#E22525',
  footerHeight: 72,
  mobileFooterHeight: 56,
  sidebarWidth: 355,
  sidebarMobileHeight: 90,
  mobileTopBarHeight: 52,
});

export default createMuiTheme(
  {
    customShadows: {
      widget:
        '0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A',
      widgetDark:
        '0px 3px 18px 0px #4558A3B3, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A',
      widgetWide:
        '0px 12px 33px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A',
    },
    brand: '#E22525',
    footerHeight: 72,
    mobileFooterHeight: 56,
    sidebarWidth: 355,
    sidebarMobileHeight: 90,
    mobileTopBarHeight: 52,
    overrides: {
      MuiBackdrop: {
        root: {
          backgroundColor: '#4A4A4A1A',
        },
      },
      MuiMenu: {
        paper: {
          boxShadow:
            '0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A',
        },
      },
      MuiSelect: {
        icon: {
          color: '#B9B9B9',
        },
      },
      MuiListItem: {
        root: {
          '&$selected': {
            backgroundColor: '#F3F5FF !important',
            '&:focus': {
              backgroundColor: '#F3F5FF',
            },
          },
        },
        button: {
          '&:hover, &:focus': {
            backgroundColor: '#F3F5FF',
          },
        },
      },
      MuiTouchRipple: {
        child: {
          backgroundColor: 'white',
        },
      },
      MuiTableRow: {
        root: {
          height: 56,
        },
      },
      MuiTableCell: {
        root: {
          borderBottom: '1px solid rgba(224, 224, 224, .5)',
        },
        head: {
          fontSize: '0.95rem',
        },
        body: {
          fontSize: '0.95rem',
        },
      },
      MuiInput: {
        underline: {
          backgroundColor: 'transparent',
          '&:before': {
            borderBottomColor: globalTheme.palette.primary.light,
          },
          '&:after': {
            borderBottomColor: globalTheme.palette.primary.main,
          },
          '&:hover:before': {
            borderBottomColor: `${globalTheme.palette.primary.light} !important`,
          },
        },
      },
      MuiAppBar: {
        colorPrimary: {
          backgroundColor: '#FFFFFF',
        },
      },
      MuiDrawer: {
        paper: {
          backgroundColor: globalTheme.palette.mainSidebar.main,
        },
      },
    },
  },
  globalTheme,
);
