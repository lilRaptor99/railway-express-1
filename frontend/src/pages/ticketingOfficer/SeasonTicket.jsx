import { Button } from '@mui/material';
import React from 'react';
import QRCode from 'react-qr-code';
import PrintIcon from '@mui/icons-material/Print';
import ReactToPrint from 'react-to-print';

export default function SeasonTicket({
  startStation,
  destinationStation,
  ticketId,
  createdAt,
  price,
  ticketClass,
  name,
  validPeriod,
}) {
  const componentRef = React.useRef(null);
  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [componentRef.current]);

  const reactToPrintTrigger = React.useCallback(() => {
    return <Button className="mb-3">{<PrintIcon />}</Button>;
  }, []);

  return (
    <div className="m-4">
      <div
        className="w-full flex flex-col items-center justify-center"
        ref={componentRef}
      >
        <div className="w-2/4 bg-slate-50 rounded-3xl drop-shadow-2xl">
          <div className="bg-slate-700 rounded-t-3xl h-14 w-full">
            <p className="text-slate-200 font-semibold text-xl text-center leading-loose">
              Season Ticket
            </p>
          </div>
          <div className="w-full pt-10 flex justify-between">
            <div className="flex flex-col items-center">
              <div className="w-4 h-4 rounded-full bg-slate-900 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-slate-50"></div>
              </div>
              <div>
                <p className="text-sm font-bold w-32 text-slate-600 text-center">
                  {startStation}
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
                  {destinationStation}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-0 mb-5 px-8">
            <TicketDetailRow title="Name" detail={name} />
            <TicketDetailRow title="Class" detail={ticketClass} />
            <TicketDetailRow title="Price" detail={price} />
            <TicketDetailRow title="Date" detail={createdAt} />
            <TicketDetailRow
              title="Valid period"
              detail={`${validPeriod} month(s)`}
            />
          </div>
        </div>
        <div className="bg-slate-50 rounded-3xl drop-shadow-2xl flex flex-col items-center justify-center w-2/4">
          <div className="m-6">
            <QRCode value={ticketId} />
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <ReactToPrint
          content={reactToPrintContent}
          documentTitle="Ticket"
          trigger={reactToPrintTrigger}
        />
      </div>
    </div>
  );
  function TicketDetailRow({ title, detail }) {
    return (
      <div className="flex justify-between items-center w-full">
        <p className="text-slate-400 font-medium w-4/12">{title}</p>
        <p className="text-slate-600 font-medium text-left ml-2 w-8/12">
          {detail}
        </p>
      </div>
    );
  }
}
