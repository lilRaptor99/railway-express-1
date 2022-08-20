import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React, { useState } from 'react';

export default function StationDropDown(props) {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Select
      labelId="select"
      id="role-select"
      value={value}
      onChange={handleChange}
      {...props}
    >
      <MenuItem value="kelaniya">KELANIYA</MenuItem>
      <MenuItem value="dematagoda">DEMATAGODA</MenuItem>
      <MenuItem value="maradana">MARADANA</MenuItem>
      <MenuItem value="ragama">RAGAMA</MenuItem>
      <MenuItem value="ganemulla">GANEMULLA</MenuItem>
      <MenuItem value="kotuwa">KOTUWA</MenuItem>
    </Select>
  );
}
