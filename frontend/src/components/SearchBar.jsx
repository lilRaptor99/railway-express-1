import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { InputAdornment, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';

export default function SearchBar({ handleSearch, ...props }) {
  const [search, setSearch] = useState('');
  return (
    <div className="my-4 w-80">
      <TextField
        InputProps={{
          className: 'rounded-2xl',
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => handleSearch(search)} edge="end">
                <Search />
              </IconButton>
            </InputAdornment>
          ),
        }}
        onChange={(event) => setSearch(event.target.value)}
        fullWidth
        {...props}
      />
    </div>
  );
}
