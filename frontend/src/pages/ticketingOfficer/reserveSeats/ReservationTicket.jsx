import TicketingOfficerLayout from '../../../layout/TicketingOfficerLayout';
import React from 'react';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { useParams } from 'react-router-dom';
import QRCode from 'react-qr-code';
import { IconButton, Table, TableCell, TableRow } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';

export default function ReserveTicket() {
  const schedule = useLocalStorage('schedule', null)[0];
  const ticketData = useLocalStorage('ticketData', null)[0];
  const scheduleData = useLocalStorage('scheduleData', null)[0];
  const trainTurnNumber = useParams().turnNumber;

  const seatNumber1 = Math.floor(Math.random() * 10);

  const seartArr = [];
  for (let i = 0; i < schedule?.noOfSeats; i++) {
    seartArr.push(seatNumber1 + i);
  }

  return (
    <TicketingOfficerLayout>
      <h1 className="mt-0">Ticket</h1>
      <div className="m-4">
        <div className="w-full flex flex-col items-center justify-center">
          <div className="w-2/4 bg-slate-50 rounded-3xl drop-shadow-2xl">
            <div className="bg-slate-700 rounded-t-3xl h-14 w-full pt-2">
              <p className="text-slate-200 font-semibold text-xl text-center leading-loose my-0">
                Reservation Ticket
              </p>
            </div>
            <div className="w-full pt-10 flex justify-between">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-slate-900 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-slate-50"></div>
                </div>
                <div>
                  <p className="text-sm font-bold w-32 text-slate-600 text-center">
                    {schedule.from.name}
                  </p>
                </div>
              </div>
              <div className="h-0.5 rounded-full bg-slate-900 w-full">
                <p></p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-slate-900 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-slate-50"></div>
                </div>
                <div>
                  <p className="text-sm font-bold w-32 text-slate-600 text-center">
                    {schedule.to.name}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-0 mb-5 px-8">
              <Table className="col-start-1 col-end-7 bg-slate-50 p-7 rounded-2xl mb-10">
                <TableRow>
                  <TableCell className="font-medium border-b-0">
                    Train Turn
                  </TableCell>
                  <TableCell className="border-b-0">
                    {trainTurnNumber}
                    {scheduleData[0].trainTurn.turnName === ''
                      ? ' '
                      : ' - ' + scheduleData[0].trainTurn.turnName}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium border-b-0">
                    Status
                  </TableCell>
                  <TableCell className="border-b-0">
                    {ticketData.ticketStatus === 'UNUSED'
                      ? 'Unused'
                      : ticketData.ticketStatus === 'EXPIRED'
                      ? 'Expired'
                      : ticketData.ticketStatus === 'USED'
                      ? 'Used'
                      : 'Used one way'}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium border-b-0">Date</TableCell>
                  <TableCell className="border-b-0">
                    {schedule.date[0]}
                    {schedule.date[1]}
                    {schedule.date[2]}
                    {schedule.date[3]}
                    {schedule.date[4]}
                    {schedule.date[5]}
                    {schedule.date[6]}
                    {schedule.date[7]}
                    {schedule.date[8]}
                    {schedule.date[9]}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium border-b-0">
                    <p className="my-0">Primary Passenger</p>
                    <p className="my-0">Name</p>
                  </TableCell>
                  <TableCell className="border-b-0">
                    {ticketData.Reservation.primaryPassengerName}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium border-b-0">
                    <p className="my-0">Primary Passenger</p>
                    <p className="my-0">NIC</p>
                  </TableCell>
                  <TableCell className="border-b-0">
                    {ticketData.Reservation.passengerNICs}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium border-b-0">
                    Class
                  </TableCell>
                  <TableCell className="border-b-0">
                    {ticketData.ticketClass === 'FIRST_CLASS'
                      ? 'First Class'
                      : ticketData.ticketClass === 'SECOND_CLASS'
                      ? 'Second Class'
                      : 'Third Class'}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium border-b-0">
                    Price
                  </TableCell>
                  <TableCell className="border-b-0">
                    Rs.{ticketData.price}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium border-b-0">
                    No of seats
                  </TableCell>
                  <TableCell className="border-b-0">
                    {schedule.noOfSeats}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium border-b-0">
                    Seat Numbers
                  </TableCell>
                  <TableCell className="border-b-0">
                    <div className="flex flex-wrap gap-2">
                      {' '}
                      {seartArr.map((seatNo) => (
                        <div className="bg-slate-900 text-slate-100 rounded-2xl py-2 px-5">
                          A - {seatNo}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              </Table>
            </div>
          </div>
          <div className="bg-slate-50 rounded-3xl drop-shadow-2xl flex flex-col items-center justify-center w-2/4">
            <div className="m-6">
              <QRCode value={ticketData.userId} />
            </div>
            <IconButton className="mb-3">{<PrintIcon />}</IconButton>
          </div>
        </div>
      </div>
    </TicketingOfficerLayout>
  );
}
