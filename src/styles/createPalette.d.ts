import { TypeBackground } from '@material-ui/core/styles/createPalette';
declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    mainSidebar: Palette['primary'];
    mainSidebarText: Palette['primary'];
    mainSidebarTextHover: Palette['primary'];
  }
  interface PaletteOptions {
    mainSidebar: PaletteOptions['primary'];
    mainSidebarText: PaletteOptions['primary'];
    mainSidebarTextHover: PaletteOptions['primary'];
  }
  interface TypeBackground {
    light?: string;
    dark?: string;
    table?: string;
    white?: string;
  }
}
