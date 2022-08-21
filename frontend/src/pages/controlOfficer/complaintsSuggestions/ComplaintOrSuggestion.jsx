import ControlOfficerLayout from '../../../layout/ControlOfficerLayout';
import React from 'react';
import { Table, TableRow, TableCell } from '@mui/material';

export default function ComplaintOrSuggestion() {
  return (
    <ControlOfficerLayout>
      <h1>Complaint/Suggestion Description</h1>
      <Table>
        <TableRow>
          <TableCell className="font-medium">Complaint/Suggestion</TableCell>
          <TableCell>Complaint</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Complaint/Suggestion Id</TableCell>
          <TableCell>001</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Passenger Name</TableCell>
          <TableCell>Pratheek Senevirathne</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Title</TableCell>
          <TableCell>Regarding ticket money refunding</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Description</TableCell>
          <TableCell>
            I booked 2 tickets from Colombo-Fort to Anuradhapura in Yaldevi
            train on 2022-08-15. Due to a personal reason I couldn't go on that
            train that day. When I ask for a refund from Colombo-Fort station
            for my tickets, they said it can't be done. I don't think that's
            fair.
          </TableCell>
        </TableRow>
      </Table>
    </ControlOfficerLayout>
  );
}
