import { ThemeOptions, Theme } from '@material-ui/core/styles/createMuiTheme';

type Shadow = {
  widget?: string;
  widgetDark?: string;
  widgetWide?: string;
};

declare module '@material-ui/core/styles/createMuiTheme' {
  interface ThemeOptions {
    customShadows: Shadow;
    brand: string;
    footerHeight: number;
    mobileFooterHeight: number;
    sidebarWidth: number;
    sidebarMobileHeight: number;
    mobileTopBarHeight: number;
  }

  interface Theme {
    customShadows: Shadow;
    brand: string;
    footerHeight: number;
    mobileFooterHeight: number;
    sidebarWidth: number;
    sidebarMobileHeight: number;
    mobileTopBarHeight: number;
  }
}
