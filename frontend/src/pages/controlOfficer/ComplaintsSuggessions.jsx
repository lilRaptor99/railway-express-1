import ControlOfficerLayout from '../../layout/ControlOfficerLayout';
import React from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { NavLink } from 'react-router-dom';

export default function ComplaintsSuggestions() {
  return (
    <ControlOfficerLayout>
      <h1>Complaints and Suggestions</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Complaint/Suggestion Id</TableCell>
            <TableCell>Passenger Name</TableCell>
            <TableCell>Complaint/Suggestion</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <NavLink
                to={'description'}
                style={{ color: '#065b8d' }}
                className="no-underline my-0"
              >
                001
              </NavLink>
            </TableCell>
            <TableCell>Pratheek Senevirathne</TableCell>
            <TableCell>Complaint</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <NavLink
                to={'description'}
                style={{ color: '#065b8d' }}
                className="no-underline my-0"
              >
                002
              </NavLink>
            </TableCell>
            <TableCell>Pramudi Vihanga</TableCell>
            <TableCell>suggestion</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <NavLink
                to={'description'}
                style={{ color: '#065b8d' }}
                className="no-underline my-0"
              >
                003
              </NavLink>
            </TableCell>
            <TableCell>Sathya Wijesooriya</TableCell>
            <TableCell>suggestion</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <NavLink
                to={'description'}
                style={{ color: '#065b8d' }}
                className="no-underline my-0"
              >
                004
              </NavLink>
            </TableCell>
            <TableCell>Sahani Silva</TableCell>
            <TableCell>suggestion</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <NavLink
                to={'description'}
                style={{ color: '#065b8d' }}
                className="no-underline my-0"
              >
                005
              </NavLink>
            </TableCell>
            <TableCell>Lasanthi Wathsala</TableCell>
            <TableCell>Complaint</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </ControlOfficerLayout>
  );
}
