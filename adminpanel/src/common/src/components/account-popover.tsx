import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';
// import { useAuth } from 'src/hooks/use-auth';

interface AccountPopoverProps {
    anchorEl?: any;
    onClose?: () => void;
    open: boolean;
}

export const AccountPopover = (props: AccountPopoverProps) => {
  const { anchorEl, onClose, open } = props;
  const navigate = useNavigate();
//   const auth = useAuth();

  const handleSignOut = useCallback(
    () => {
      onClose?.();
    //   auth.signOut();
      navigate('/auth/login');
    },
    [onClose, navigate]
  );

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      slotProps={{ paper: { sx: { width: 200 } }}}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2
        }}
      >
        <Typography variant="overline">
          Account
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          Anika Visser
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1
          }
        }}
      >
        <MenuItem onClick={handleSignOut}>
          Sign out
        </MenuItem>
      </MenuList>
    </Popover>
  );
};