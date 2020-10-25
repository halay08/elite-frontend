import { ThemeOptions, Theme } from '@material-ui/core/styles/createMuiTheme';

type Shadow = {
  widget?: string;
  widgetDark?: string;
  widgetWide?: string;
};

declare module '@material-ui/core/styles/createMuiTheme' {
  interface ThemeOptions {
    customShadows: Shadow;
  }

  interface Theme {
    customShadows: Shadow;
  }
}
