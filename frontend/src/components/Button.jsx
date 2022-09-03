import React from 'react';
import { Button as MuiButton } from '@mui/material';

import CircularProgress from '@mui/material/CircularProgress';

export default function Button({ isLoading = false, ...props }) {
  // Loading button
  if (isLoading) {
    return (
      <MuiButton
        endIcon={<CircularProgress size={22} className="text-slate-800 ml-1" />}
        variant="contained"
        {...props}
        className={`rounded-3xl tracking-wider px-6 py-2 ${props.className}`}
        disabled
      />
    );
  }

  // Normal button
  // if (props.isLoading !== undefined) {
  //   delete props.isLoading;
  // }
  return (
    <MuiButton
      variant="contained"
      {...props}
      className={`rounded-3xl tracking-wider px-6 py-2 ${props.className}`}
    />
  );
}
