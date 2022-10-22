import React, { useEffect, useState } from 'react';
import request from 'utils/request';
import ControlOfficerLayout from '../../../layout/ControlOfficerLayout';
import {
  Alert,
  CircularProgress,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import { Close } from '@mui/icons-material';
import { useCallback } from 'react';

export default function TurnDetails() {
  const [turnDetails, setTurnDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isActive, setActive] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const navigate = useNavigate();
  const turnNumber = useParams().turnNumber;

  const getTurnDetails = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await request(
        'get',
        `/control-officer/train-turn/search/${turnNumber}`,
        {}
      );
      setTurnDetails(res.data);
      setIsLoading(false);
    } catch (e) {
      console.error('Get train turn error:', e);
    }
  }, [turnNumber]);

  const deleteTrainTurn = useCallback(async () => {
    try {
      await request('delete', `/control-officer/train-turn/${turnNumber}`, {});
      setDeleteSuccess(true);
      setTimeout(() => {
        navigate('/control/search-turn');
      }, 2000);
    } catch (e) {
      if (e?.response?.status === 500) {
        setDeleteError('Error deleting train turn');
        console.error('Delete train turn error:', e);
      } else {
        console.log(e?.response?.data);
        setDeleteError(e?.response?.data?.errors[0]);
      }
    }
  }, [navigate, turnNumber]);

  useEffect(() => {
    getTurnDetails();
  }, [getTurnDetails]);

  const toggleClass = () => {
    setActive(!isActive);
  };

  function turnDetailTable(turn) {
    return (
      <div>
        <div>
          <Table>
            <TableRow>
              <TableCell className="font-medium">Turn Number</TableCell>
              <TableCell>{turn?.turnNumber}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Turn Name</TableCell>
              <TableCell>{turn?.turnName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Reservable</TableCell>
              <TableCell>{turn?.reservable === true ? 'Yes' : 'No'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Availability</TableCell>
              <TableCell>{turn?.availability}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Type</TableCell>
              <TableCell>{turn?.type}</TableCell>
            </TableRow>
          </Table>
        </div>

        <h2 className="mt-10 mb-5 font-light">Intermediate Stations</h2>
        <div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Station</TableCell>
                <TableCell>Arrival Time</TableCell>
                <TableCell>Departure Time</TableCell>
                <TableCell>Start/Destination</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {turn?.intermediateStations.map((station) => (
                <TableRow
                  key={station.stationId}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{station.stationId}</TableCell>
                  <TableCell>{station.arrivalTime}</TableCell>
                  <TableCell>{station.departureTime}</TableCell>
                  <TableCell>
                    {station.isStart === true
                      ? 'Start'
                      : station.isEnd === true
                      ? 'Destination'
                      : ''}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className={turn?.reservable === true ? 'block' : 'hidden'}>
          <h2 className="bt-10 mb-5 font-light">Train Compartments</h2>
          <div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Compartment</TableCell>
                  <TableCell>Seat Count</TableCell>
                  <TableCell>Class</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {turn?.trainCompartments.map((compartment) => (
                  <TableRow
                    key={compartment.compartmentId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{compartment.compartmentNumber}</TableCell>
                    <TableCell>{compartment.seatCount}</TableCell>
                    <TableCell>
                      {compartment.class === 'FIRST_CLASS'
                        ? 'First Class'
                        : compartment.class === 'SECOND_CLASS'
                        ? 'Second Class'
                        : 'Third Class'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ControlOfficerLayout>
      <h1 className="mt-0">Train Turn Details</h1>

      <div className="mb-4">
        <Collapse in={Boolean(deleteError)}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setDeleteError(null);
                }}
              >
                <Close fontSize="inherit" />
              </IconButton>
            }
          >
            Error deleting train turn
          </Alert>
        </Collapse>

        <Collapse in={Boolean(deleteSuccess)}>
          <Alert
            severity="success"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setDeleteSuccess(null);
                }}
              >
                <Close fontSize="inherit" />
              </IconButton>
            }
          >
            Train turn deleted successfully.
          </Alert>
        </Collapse>
      </div>

      {isLoading ? (
        <div className="flex justify-center w-full">
          <CircularProgress className="mt-5 text-slate-500" />
        </div>
      ) : turnDetails === null ? (
        <div className="flex justify-center w-full mt-10">
          <h1 className="font-light">No such turn exists!</h1>
        </div>
      ) : (
        turnDetailTable(turnDetails)
      )}

      <div
        className={
          turnDetails === null ? 'hidden' : 'flex justify-center w-full mt-10'
        }
      >
        <Button
          type="button"
          isLoading={false}
          onClick={toggleClass}
          className={isActive ? 'hidden' : 'block'}
          variant="outlined"
          color="error"
        >
          Delete Train Turn
        </Button>
      </div>
      <div className={isActive ? 'flex justify-center' : 'hidden'}>
        <div className="w-96 bg-red-100 p-7 rounded-2xl">
          <p className="m-0">
            This action is irreversible. Are you sure you want to delete this
            train turn?
          </p>
          <div className="flex justify-end mt-5 gap-10">
            <Button
              variant="outlined"
              type="button"
              isLoading={false}
              onClick={toggleClass}
            >
              No
            </Button>
            <Button
              color="error"
              type="button"
              isLoading={false}
              onClick={deleteTrainTurn}
            >
              Yes
            </Button>
          </div>
        </div>
      </div>
    </ControlOfficerLayout>
  );
}
