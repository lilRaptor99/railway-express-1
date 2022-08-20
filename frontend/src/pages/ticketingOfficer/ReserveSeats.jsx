import TicketingOfficerLayout from '../../layout/TicketingOfficerLayout';
import React from 'react';
import Button from '../../components/Button';
import TextField from '../../components/TextField';
import StationDropDown from 'components/StationDropDown';

export default function ReserveSeats() {
  return (
    <TicketingOfficerLayout>
      <h1>Reserve-Seats</h1>
      <form className="w-full flex flex-col gap-1 items-center">
        <div className="w-full grid gap-4 grid-cols-7">
          <p className="col-start-1 col-end-3 pl-14">Starting Station</p>
          <StationDropDown
            className="col-start-3 col-end-6 rounded-2xl"
            id="start"
            name="start"
          />

          <p className="col-start-1 col-end-3 pl-14">Destination</p>
          <StationDropDown
            className="col-start-3 col-end-6 rounded-2xl"
            id="end"
            name="end"
          />

          <p className="col-start-1 col-end-3 pl-14">Date</p>
          <TextField
            className="col-start-3 col-end-6"
            fullWidth
            id="date"
            name="date"
          />

          <p className="col-start-1 col-end-3 pl-14">Number Of Seats</p>
          <TextField
            className="col-start-3 col-end-6"
            fullWidth
            id="seats"
            name="seats"
          />

          <br></br>
          <br></br>
        </div>
        <div className="flex gap-20 mt-5">
          <Button
            type="reset"
            isLoading={''}
            className="col-start-3 col-end-4 align-middle"
            variant="outlined"
          >
            Reset
          </Button>

          <Button
            type="submit"
            isLoading={''}
            className="col-start-5 col-end-6 align-middle"
          >
            Filter Trains
          </Button>
        </div>
      </form>
    </TicketingOfficerLayout>
  );
}
