import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React, { useState } from 'react';

export default function DropDown(props) {
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
      <MenuItem value="CONTROL_OFFICER">Cotrol Officer</MenuItem>
      <MenuItem value="TICKETING_OFFICER">Ticketing Officer</MenuItem>
      <MenuItem value="TICKET_CHECKER">Ticket Checker</MenuItem>
    </Select>
  );
}
