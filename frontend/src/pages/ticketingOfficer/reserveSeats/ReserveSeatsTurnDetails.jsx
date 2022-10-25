import TicketingOfficerLayout from '../../../layout/TicketingOfficerLayout';
import React, { useState, useEffect } from 'react';
import request from 'utils/request';
import useLocalStorage from '../../../hooks/useLocalStorage';
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { Link } from 'react-router-dom';

export default function ReservableTurnDetails() {
  const [turnDetails, setTurnDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const schedule = useLocalStorage('schedule', null)[0];
  const setScheduleData = useLocalStorage('scheduleData', null)[1];

  useEffect(() => {
    (async () => {
      // console.log('schedule: ', schedule);
      const start = schedule.from.stationId;
      const destination = schedule.to.stationId;
      const date = new Date(schedule.date);
      date.setHours(date.getHours() + 5);
      date.setMinutes(date.getMinutes() + 30);

      setIsLoading(true);
      try {
        const res = await request('post', `/public/search-schedule`, {
          from: start,
          to: destination,
          date: date.toString(),
        });
        setTurnDetails(res.data.results);
        setScheduleData(res.data.results);
        // console.log('scheduleData ');
        setIsLoading(false);
      } catch (e) {
        console.error('Get train turns error:', e);
      }
    })();
  }, [
    schedule.date,
    schedule.from.stationId,
    schedule.to.stationId,
    setScheduleData,
  ]);

  function detailTable() {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Turn Number</TableCell>
            <TableCell>Turn</TableCell>
            <TableCell>Departure Time</TableCell>
            <TableCell>Arrival Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {turnDetails &&
            turnDetails.map((turn) => {
              const startStation = turn.trainTurn.intermediateStations.filter(
                (station) => station.stationId === schedule.from.stationId
              )[0];
              const destinationStation =
                turn.trainTurn.intermediateStations.filter(
                  (station) => station.stationId === schedule.to.stationId
                )[0];
              return (
                <TableRow
                  key={turn.turnNumber}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                    <Link
                      color="#065b8d"
                      to={`reservation/${turn.turnNumber}`}
                      className="no-underline my-0 text-slate-500 hover:underline"
                    >
                      {turn.turnNumber}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {startStation.station.name} -{' '}
                    {destinationStation.station.name}
                  </TableCell>
                  <TableCell>{startStation.departureTime}</TableCell>
                  <TableCell>{destinationStation.arrivalTime}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    );
  }

  return (
    <TicketingOfficerLayout>
      <h1 className="mt-0">Reserve Seats</h1>
      <h2 className="font-light">Select a train turn to proceed</h2>
      <div className="flex justify-center w-full">
        {isLoading ? (
          <CircularProgress className="mt-5 text-slate-500" />
        ) : (
          detailTable()
        )}
      </div>
    </TicketingOfficerLayout>
  );
}
