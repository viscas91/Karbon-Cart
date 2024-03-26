import { PaletteColor, styled, Typography, useTheme } from '@mui/material';
import React from 'react';
import { CustomTheme } from '../../../theme/create-palette';

type SeverityPillProps = {
  children?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'warning' | 'success';
};

type SeverityPillRootProps = {
    theme: CustomTheme;
    ownerState: { color: SeverityPillProps['color'] };
};

interface ColorWithAlphas extends PaletteColor {
    lightest?: string;
    darkest?: string;
    alpha4?: string;
    alpha8?: string;
    alpha12?: string;
    alpha30?: string;
    alpha50?: string;
  }

const SeverityPillRoot = styled('span')<SeverityPillRootProps>(
  ({ theme, ownerState }) => {
    const backgroundColor = (theme.palette[ownerState.color!] as ColorWithAlphas).alpha12;
    const color =
      theme.palette.mode === 'dark'
        ? theme.palette[ownerState.color!].main
        : theme.palette[ownerState.color!].dark;

    return {
      alignItems: 'center',
      backgroundColor,
      borderRadius: 12,
      color,
      cursor: 'default',
      display: 'inline-flex',
      flexGrow: 0,
      flexShrink: 0,
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(12),
      lineHeight: 2,
      fontWeight: 600,
      justifyContent: 'center',
      letterSpacing: 0.5,
      minWidth: 20,
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
    };
  }
);

export const SeverityPill = (props: SeverityPillProps) => {
    const theme = useTheme() as CustomTheme;
  const { color = 'primary', children, ...other } = props;

  const ownerState = { color };

  return (
    <SeverityPillRoot theme={theme} ownerState={ownerState} {...other}>
      <Typography>{children}</Typography>
    </SeverityPillRoot>
  );
};