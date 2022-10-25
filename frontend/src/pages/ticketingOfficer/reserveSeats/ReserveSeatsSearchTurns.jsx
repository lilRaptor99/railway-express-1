import TicketingOfficerLayout from '../../../layout/TicketingOfficerLayout';
import React, { useState, useEffect } from 'react';
import Button from '../../../components/Button';
import TextField from '../../../components/TextField';
import { Formik } from 'formik';
// import * as Yup from 'yup';
import request from 'utils/request';
import { Autocomplete, TextField as MuiTextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import useLocalStorage from '../../../hooks/useLocalStorage';

export default function ReserveSeatsSearchTurns() {
  const [stations, setStations] = useState([]);
  const navigate = useNavigate();
  const setSchedule = useLocalStorage('schedule', null)[1];

  useEffect(() => {
    (async function () {
      try {
        const res = await request('get', '/public/stations');
        const stationList = res.data;
        setStations(stationList);
      } catch (e) {
        if (e?.response?.status === 500) {
          console.error('Fetching Error: ', e);
        } else {
          console.log(e?.response?.data);
          setStations(e?.response?.data?.errors[0]);
        }
      }
    })();
  }, []);

  // const turnValidationSchema = Yup.object().shape({
  // start: Yup.string().required('Start station is required'),
  // destination: Yup.string().required('Destination is required'),
  // date: Yup.date().required('Date is required'),
  //   noOfSeats: Yup.number().required('Number of seats is required'),
  // });

  async function handleSubmit(values, { setSubmitting, resetForm }) {
    console.log('running');
    const schedule = {
      ...values,
      from: values.start,
      to: values.destination,
      date: values.date,
      noOfSeats: values.noOfSeats,
    };
    try {
      navigate(`/ticketing/reserve/schedule`);
      setSchedule(schedule);
      resetForm();
    } catch (e) {
      if (e?.response?.status === 500) {
        console.error('Adding Error: ', e);
      } else {
        console.log(e?.response?.data);
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <TicketingOfficerLayout>
      <h1 className="mt-0">Reserve Seats</h1>
      <Formik
        // validationSchema={turnValidationSchema}
        initialValues={{
          start: null,
          destination: null,
          date: null,
          noOfSeats: 1,
        }}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <>
            <form
              className="w-full flex flex-col gap-1 items-center"
              onSubmit={formik.handleSubmit}
            >
              <div className="w-full grid gap-4 grid-cols-7">
                <p className="col-start-1 col-end-3 pl-14">Starting Station</p>
                <Autocomplete
                  className="col-start-3 col-end-6"
                  disablePortal
                  id="start"
                  getOptionLabel={(stations) => `${stations.name}`}
                  options={stations}
                  value={formik.values.start}
                  onChange={(e, station) => {
                    console.log(station, e);
                    formik.setFieldValue(`start`, station);
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option.name === value.name
                  }
                  noOptionsText={'No Available Stations'}
                  classes={{
                    inputRoot: 'w-full rounded-2xl',
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select a station"
                      className="w-full"
                    />
                  )}
                />

                <p className="col-start-1 col-end-3 pl-14">Destination</p>
                <Autocomplete
                  className="col-start-3 col-end-6"
                  disablePortal
                  id="destination"
                  getOptionLabel={(stations) => `${stations.name}`}
                  options={stations}
                  value={formik.values.destination}
                  onChange={(e, station) => {
                    console.log(station, e);
                    formik.setFieldValue(`destination`, station);
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option.name === value.name
                  }
                  noOptionsText={'No Available Stations'}
                  classes={{
                    inputRoot: 'w-full rounded-2xl',
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Select a station" />
                  )}
                />

                <p className="col-start-1 col-end-3 pl-14">Date</p>
                <DatePicker
                  className="col-start-3 col-end-6"
                  label="Date"
                  value={formik.values.date}
                  onChange={(e) => {
                    console.log('date' + e._d);
                    formik.setFieldValue(`date`, e._d);
                  }}
                  renderInput={(params) => (
                    <MuiTextField
                      {...params}
                      InputProps={{
                        ...params.InputProps,
                        className: 'w-full rounded-2xl border-slate-900',
                      }}
                    />
                  )}
                />

                <p className="col-start-1 col-end-3 pl-14">Number Of Seats</p>
                <TextField
                  type="number"
                  className="col-start-3 col-end-6"
                  fullWidth
                  id="noOfSeats"
                  name="noOfSeats"
                  value={formik.values.noOfSeats}
                  {...formik.getFieldProps('noOfSeats')}
                  error={Boolean(
                    formik.touched.noOfSeats && formik.errors.noOfSeats
                  )}
                  helperText={formik.errors.noOfSeats}
                />
              </div>
              <div className="flex gap-20 mt-10">
                <Button
                  type="reset"
                  isLoading={false}
                  onClick={formik.resetForm}
                  variant="outlined"
                >
                  Reset
                </Button>

                <Button
                  type="submit"
                  isLoading={formik.isSubmitting}
                  disabled={!formik.isValid}
                >
                  Filter Train Turns
                </Button>
              </div>
            </form>
          </>
        )}
      </Formik>
    </TicketingOfficerLayout>
  );
}
