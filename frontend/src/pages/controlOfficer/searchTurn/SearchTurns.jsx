import ControlOfficerLayout from '../../../layout/ControlOfficerLayout';
import React, { useState, useEffect } from 'react';
import SearchBar from 'components/SearchBar';
import request from 'utils/request';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

export default function SearchTurn() {
  const [isLoading, setIsLoading] = useState(true);
  const [turnDetails, setTurnDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getTurnDetails();
  }, []);

  async function getTurnDetails() {
    try {
      const res = await request('get', '/control-officer/train-turn', {});
      setTurnDetails(res.data);
      setIsLoading(false);
    } catch (e) {
      console.error('Get train turn list error:', e);
    }
  }

  async function searchTrainTurn(turnNumber) {
    navigate(`/control/search-turn/turn-details/${turnNumber}`);
  }

  function detailTable() {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Turn Number</TableCell>
            <TableCell>Turn Name</TableCell>
            <TableCell>Reservable</TableCell>
            <TableCell>Availability</TableCell>
            <TableCell>Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {turnDetails.map((turn) => (
            <TableRow
              key={turn.turnNumber}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>
                <Link
                  color="#065b8d"
                  to={`turn-details/${turn.turnNumber}`}
                  className="no-underline my-0 text-slate-500 hover:underline"
                >
                  {turn.turnNumber}
                </Link>
              </TableCell>
              <TableCell>{turn.turnName}</TableCell>
              <TableCell>{turn.reservable === true ? 'Yes' : 'No'}</TableCell>
              <TableCell>{turn.availability}</TableCell>
              <TableCell>{turn.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  return (
    <ControlOfficerLayout>
      <h2>Search Train Turn</h2>
      <SearchBar
        handleSearch={searchTrainTurn}
        placeholder="Enter turn number"
      />
      <div className="flex justify-center w-full">
        {isLoading ? (
          <CircularProgress className="mt-5 text-slate-500" />
        ) : (
          detailTable()
        )}
      </div>
    </ControlOfficerLayout>
  );
}
