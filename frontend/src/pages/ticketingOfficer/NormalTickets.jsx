import TicketingOfficerLayout from '../../layout/TicketingOfficerLayout';
import React, { useState, useEffect, useRef } from 'react';

import Button from '../../components/Button';
import TextField from '../../components/TextField';
import {
  Alert,
  Autocomplete,
  Collapse,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Switch,
} from '@mui/material';
import request from 'utils/request';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Close } from '@mui/icons-material';
import useLocalStorage from 'hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';

export default function NormalTickets() {
  const [stations, setStations] = useState([]);
  const [updateStation, setUpdateStation] = useState(null);
  const [numOfTickets, setNumOfTickets] = useState(1);
  const [returnStatus, setReturnStatus] = useState(false);
  const [issueError, setIssueError] = useState('');
  const [issueSuccess, setIssueSuccess] = useState(false);
  const formikRef = useRef(null);
  const navigate = useNavigate();

  const setCurrentTicketData = useLocalStorage('currentTicketData', null)[1];

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

  useEffect(() => {
    (async function () {
      try {
        if (
          formikRef?.current?.values.end &&
          formikRef?.current?.values.start &&
          formikRef?.current?.values.ticketClass
        ) {
          const res = await request(
            'post',
            `/public/ticket-prices/NORMAL/${formikRef?.current?.values.ticketClass}`,
            {
              to: formikRef?.current?.values.end.stationId,
              from: formikRef?.current?.values.start.stationId,
            }
          );
          formikRef.current.setFieldValue('unitPrice', res.data.price);

          if (returnStatus) {
            formikRef.current.setFieldValue(
              'totalPrice',
              res.data.price * numOfTickets * 2
            );
          } else {
            formikRef.current.setFieldValue(
              'totalPrice',
              res.data.price * numOfTickets
            );
          }
        }
      } catch (e) {
        if (e?.response?.status === 500) {
          console.error('Fetching Error: ', e);
        } else {
          console.log(e?.response?.data);
        }
      }
    })();
  }, [
    updateStation,
    formikRef?.current?.values.end,
    formikRef?.current?.values.start,
    formikRef?.current?.values.ticketClass,
    numOfTickets,
    returnStatus,
  ]);

  const issueValidationSchema = Yup.object().shape({
    numberOfTickets: Yup.number()
      .required('Required!')
      .test(
        'Is positive?',
        'The number must be between 1 and 10',
        (value) => value > 0 && value < 11
      ),
  });

  async function handleSubmit(values, { setSubmitting, resetForm }) {
    try {
      console.log('values', values);
      const data = {
        price: values.totalPrice,
        quantity: values.numberOfTickets,
        ticketClass: values.ticketClass,
        startStationId: values.start.stationId,
        destinationStationId: values.end.stationId,
        email: '',
        phoneNumber: '',
        returnStatus: values.returnStatus,
      };
      const res = await request('post', '/public/normal-ticket', data);
      console.log('printing the response', res);

      setIssueSuccess(true);
      resetForm();
      setCurrentTicketData({ tickets: res.data.tickets });
      navigate(`/ticketing/print-ticket`);
    } catch (e) {
      if (e?.response?.status === 500) {
        setIssueError('Error issuing ticket');
        console.error('Issuing Error: ', e);
      } else {
        console.log(e?.response?.data);
        setIssueError(e?.response?.data?.errors[0]);
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <TicketingOfficerLayout>
      <Collapse in={Boolean(issueError)}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setIssueError(null);
              }}
            >
              <Close fontSize="inherit" />
            </IconButton>
          }
        >
          {issueError}
        </Alert>
      </Collapse>

      <Collapse in={Boolean(issueSuccess)}>
        <Alert
          severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setIssueSuccess(null);
              }}
            >
              <Close fontSize="inherit" />
            </IconButton>
          }
        >
          Ticket issued successfully.
        </Alert>
      </Collapse>
      <h1>Normal-Tickets</h1>
      <Formik
        validationSchema={issueValidationSchema}
        innerRef={formikRef}
        initialValues={{
          start: null,
          end: null,
          ticketClass: 'SECOND_CLASS',
          numberOfTickets: 1,
          returnStatus: false,
          unitPrice: 0,
          totalPrice: 0,
        }}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <>
            <form
              className="w-full flex flex-col gap-4 items-center"
              onSubmit={formik.handleSubmit}
            >
              <div className="w-full grid gap-4 grid-cols-7">
                <p className="col-start-1 col-end-3 pl-14">Starting Station</p>
                <Autocomplete
                  disablePortal
                  id="station"
                  getOptionLabel={(stations) => `${stations.name}`}
                  options={stations}
                  value={formik.values.start}
                  onChange={(e, station) => {
                    setUpdateStation(station);
                    formik.setFieldValue(`start`, station);
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option.name === value.name
                  }
                  noOptionsText={'No Available Stations'}
                  classes={{
                    root: 'col-start-3 col-end-6',
                    inputRoot: 'rounded-2xl',
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Select a station" />
                  )}
                />
                <p className="col-start-1 col-end-3 pl-14">Destination</p>
                <Autocomplete
                  disablePortal
                  id="station"
                  getOptionLabel={(stations) => `${stations.name}`}
                  options={stations}
                  value={formik.values.end}
                  onChange={(e, station) => {
                    setUpdateStation(station);
                    formik.setFieldValue(`end`, station);
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option.name === value.name
                  }
                  noOptionsText={'No Available Stations'}
                  classes={{
                    root: 'col-start-3 col-end-6',
                    inputRoot: 'rounded-2xl',
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Select a station" />
                  )}
                />

                <p className="col-start-1 col-end-3 pl-14">Class</p>
                <div className="col-start-3 col-end-6 min-w-max">
                  <FormControl>
                    <RadioGroup
                      row
                      name="ticketClass"
                      value={formik.values.ticketClass}
                      onChange={(event) => {
                        setUpdateStation(event);
                        formik.setFieldValue(
                          'ticketClass',
                          event.currentTarget.value
                        );
                      }}
                    >
                      <FormControlLabel
                        value="SECOND_CLASS"
                        control={<Radio />}
                        label="Second Class"
                      />
                      <FormControlLabel
                        value="THIRD_CLASS"
                        control={<Radio />}
                        label="Third Class"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>

                <p className="col-start-1 col-end-3 pl-14">Number Of Tickets</p>
                <TextField
                  {...formik.getFieldProps('numberOfTickets')}
                  error={Boolean(
                    formik.touched.numberOfTickets &&
                      formik.errors.numberOfTickets
                  )}
                  helperText={formik.errors.numberOfTickets}
                  className="col-start-3 col-end-6"
                  fullWidth
                  id="numOftickets"
                  name="numberOfTickets"
                  onChange={(event) => {
                    formik.setFieldValue(
                      'numberOfTickets',
                      event.currentTarget.value
                    );
                    setNumOfTickets(event.currentTarget.value);
                  }}
                />

                <p className="col-start-1 col-end-3 pl-14">Return status</p>
                <Switch
                  className="col-start-3 col-end-6"
                  id="returnStatus"
                  name="returnStatus"
                  value={formik.values.returnStatus}
                  onChange={() => {
                    setReturnStatus(!returnStatus);
                    formik.setFieldValue(`returnStatus`, !returnStatus);
                  }}
                />

                <p className="col-start-1 col-end-3 pl-14">Price Per Ticket</p>
                <TextField
                  className="col-start-3 col-end-4"
                  fullWidth
                  id="num0ftickets"
                  name="numoftickets"
                  value={formik.values.unitPrice}
                  disabled
                />

                <p className="col-start-1 col-end-3 pl-14">Total Price</p>
                <TextField
                  className="col-start-3 col-end-4"
                  fullWidth
                  id="numOftickets"
                  name="numoftickets"
                  value={formik.values.totalPrice}
                  disabled
                />
              </div>
              <div className="flex gap-20 mt-5">
                <Button
                  type="submit"
                  isLoading={formik.isSubmitting}
                  className="col-start-5 col-end-6 align-middle"
                >
                  Print Ticket
                </Button>
              </div>
            </form>
          </>
        )}
      </Formik>
    </TicketingOfficerLayout>
  );
}
