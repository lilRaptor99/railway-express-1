import TicketingOfficerLayout from '../../layout/TicketingOfficerLayout';
import React from 'react';
import Button from '../../components/Button';
import TextField from '../../components/TextField';
import StationDropDown from 'components/StationDropDown';
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';

export default function SeasonTickets() {
  return (
    <TicketingOfficerLayout>
      <h1>Season-Tickets</h1>
      <form className="w-full flex flex-col gap-4 items-center">
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

          <p className="col-start-1 col-end-3 pl-14">Class</p>
          <div className="col-start-3 col-end-6 min-w-max">
            <FormControl>
              <RadioGroup row name="class" defaultValue="SecondClass">
                <FormControlLabel
                  value="SecondClass"
                  control={<Radio />}
                  label="Second Class"
                />
                <FormControlLabel
                  value="ThirdClass"
                  control={<Radio />}
                  label="Third Class"
                />
              </RadioGroup>
            </FormControl>
          </div>

          <p className="col-start-1 col-end-3 pl-14">Name</p>
          <TextField
            className="col-start-3 col-end-6"
            fullWidth
            id="name"
            name="name"
          />

          <p className="col-start-1 col-end-3 pl-14">Price</p>
          <TextField
            className="col-start-3 col-end-6"
            fullWidth
            id="totalprice"
            name="totalprice"
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
            Print Ticket
          </Button>
        </div>
      </form>
    </TicketingOfficerLayout>
  );
}
