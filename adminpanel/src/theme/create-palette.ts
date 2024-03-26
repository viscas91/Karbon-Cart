import { common } from '@mui/material/colors';
import { Palette, Theme, alpha } from '@mui/material/styles';
import { error, indigo, info, neutral, success, warning } from './colors';

interface NeutralColor {
  [key: number]: string;
}

export interface CustomPalette extends Palette {
  neutral: NeutralColor;
}

// interface CustomPaletteOptions extends PaletteOptions {
//   neutral?: NeutralColor;
// }

export interface CustomTheme extends Theme {
  palette: CustomPalette;
}

export const createPalette = (): CustomPalette => {
  const basePalette: CustomPalette = {
    // Include the missing properties dynamically
    ...({} as CustomPalette),
  };

  return {
    ...basePalette,
    action: {
      active: neutral[500],
      disabled: alpha(neutral[900], 0.38),
      disabledBackground: alpha(neutral[900], 0.12),
      focus: alpha(neutral[900], 0.16),
      hover: alpha(neutral[900], 0.04),
      selected: alpha(neutral[900], 0.12),
      hoverOpacity: 0,
      selectedOpacity: 0,
      disabledOpacity: 0,
      focusOpacity: 0,
      activatedOpacity: 0,
    },
    background: {
      default: '#EEE',
      paper: common.white,
    },
    divider: '#F2F4F7',
    error,
    info,
    mode: 'light',
    neutral,
    primary: indigo,
    success,
    text: {
      primary: neutral[900],
      secondary: neutral[500],
      disabled: alpha(neutral[900], 0.38),
    },
    warning,
  };
};
