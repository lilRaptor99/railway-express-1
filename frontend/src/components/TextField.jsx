import { useState } from 'react';

import {
  TextField as MuiTextField,
  IconButton,
  InputAdornment,
} from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function TextField({ passwordField, ...props }) {
  const [showPassword, setShowPassword] = useState(false);

  function handleClickShowPassword() {
    setShowPassword(!showPassword);
  }
  function handleMouseDownPassword(event) {
    event.preventDefault();
  }

  if (passwordField) {
    return (
      <MuiTextField
        InputProps={{
          className: 'rounded-2xl',
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...props}
        type={showPassword ? 'text' : 'password'}
      />
    );
  }
  return <MuiTextField InputProps={{ className: 'rounded-2xl' }} {...props} />;
}
