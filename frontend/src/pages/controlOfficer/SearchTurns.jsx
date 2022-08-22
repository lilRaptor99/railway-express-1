// @ts-nocheck
import ControlOfficerLayout from '../../layout/ControlOfficerLayout';
import React from 'react';
import SearchBar from 'components/SearchBar';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';

export default function SearchTurn() {
  return (
    <ControlOfficerLayout>
      <h2>Search Train Turn</h2>
      <div className="my-4 w-100">
        {' '}
        <SearchBar />
      </div>

      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Turn Number</TableCell>
            <TableCell>4567</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Turn Name</TableCell>
            <TableCell>Yal Devi</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Reservable</TableCell>
            <TableCell>True</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Availability</TableCell>
            <TableCell>Daily</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Express</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <h2> Intermediate Stations</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Station</TableCell>
            <TableCell>Time (Arrived)</TableCell>
            <TableCell>Time (depature)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Kelaniys</TableCell>
            <TableCell>08.20</TableCell>
            <TableCell>08.25</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Dematagoda</TableCell>
            <TableCell>08.40</TableCell>
            <TableCell>08.45</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Kotuwa</TableCell>
            <TableCell>08.50</TableCell>
            <TableCell>08.55</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </ControlOfficerLayout>
  );
}
