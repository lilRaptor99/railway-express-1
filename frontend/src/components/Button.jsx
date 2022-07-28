import { Button as MuiButton } from '@mui/material';

import CircularProgress from '@mui/material/CircularProgress';

export default function Button(props) {
  // Loading button
  if (props.isLoading) {
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
  return (
    <MuiButton
      variant="contained"
      {...props}
      className={`rounded-3xl tracking-wider px-6 py-2 ${props.className}`}
    />
  );
}
