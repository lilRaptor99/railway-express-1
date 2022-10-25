import TicketingOfficerLayout from '../../../layout/TicketingOfficerLayout';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Formik } from 'formik';
import TextField from '../../../components/TextField';
import Button from '../../../components/Button';
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import useLocalStorage from '../../../hooks/useLocalStorage';
import * as Yup from 'yup';
import { Close } from '@mui/icons-material';
import request from 'utils/request';
import { useParams, useNavigate } from 'react-router-dom';

export default function ReserveSeats() {
  const schedule = useLocalStorage('schedule', null)[0];
  const currentUser = useLocalStorage('currentUser', null)[0];
  const setTicketData = useLocalStorage('ticketData', null)[1];
  const [printTicketError, setPrintTicketError] = useState('');
  const [printTicketSuccess, setPrintTicketSuccess] = useState(false);
  const [totalSeatCount, setTotalSeatCount] = useState([]);
  const [ticketClass, setTicketClass] = useState('FIRST_CLASS');
  const trainTurnNumber = parseInt(useParams().turnNumber);
  const formikRef = useRef(null);
  const startStationId = schedule.from.stationId;
  const destinationStationId = schedule.to.stationId;
  const date = new Date(schedule.date);
  date.setHours(date.getHours() + 5);
  date.setMinutes(date.getMinutes() + 30);
  const userId = currentUser.userId;
  const scheduleData = useLocalStorage('scheduleData', null)[0];
  const trainScheduleId = scheduleData.trainScheduleId;
  const navigate = useNavigate();

  const getAvailableSeatCount = useCallback(async () => {
    try {
      const res = await request('post', '/public/available-seats', {
        turnNumber: trainTurnNumber,
        scheduleId: trainScheduleId,
      });
      setTotalSeatCount(res.data);
      console.log('availableSeatCount ', res.data);
    } catch (e) {
      console.error('Get total seat count error:', e);
    }
  }, [trainScheduleId, trainTurnNumber]);

  useEffect(() => {
    (async function () {
      try {
        if (
          schedule.from.stationId &&
          schedule.to.stationId &&
          formikRef?.current?.values.ticketClass
        ) {
          const res = await request(
            'post',
            `/public/ticket-prices/RESERVATION/${formikRef?.current?.values.ticketClass}`,
            {
              from: schedule.from.stationId,
              to: schedule.to.stationId,
            }
          );
          formikRef.current.setFieldValue('unitPrice', res.data.price);
          let totalPrice = res.data.price * schedule.noOfSeats.toString();
          formikRef.current.setFieldValue('totalPrice', totalPrice.toString());
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
    ticketClass,
    schedule.from.stationId,
    schedule.noOfSeats,
    schedule.to.stationId,
    formikRef?.current?.values.ticketClass,
  ]);

  useEffect(() => {
    getAvailableSeatCount();
  }, [getAvailableSeatCount]);

  const ticketValidationSchema = Yup.object().shape({
    primaryPassengerName: Yup.string()
      .min(
        5,
        ({ min }) => `Primary passenger name must be at least ${min} characters`
      )
      .required('Primary passenger name is required'),
    primaryPassengerNIC: Yup.string()
      .min(
        10,
        ({ min }) => `Primary passenger NIC must be at least ${min} characters`
      )
      .required('Primary passenger NIC is required'),
  });

  async function handleSubmit(values, { setSubmitting, resetForm }) {
    console.log('running');
    console.log('schedule id ', scheduleData[0].trainScheduleId);
    const submitValues = {
      ...values,
      unitPrice: undefined,
      totalPrice: undefined,
      primaryPassengerName: undefined,
      primaryPassengerNIC: undefined,
      userId: userId,
      returnStatus: false,
      price: parseInt(values.totalPrice),
      ticketClass: ticketClass,
      ticketStatus: 'UNUSED',
      ticketType: 'RESERVATION',
      startStationId: startStationId,
      destinationStationId: destinationStationId,
      Reservation: {
        primaryPassengerName: values.primaryPassengerName,
        passengerNICs: values.primaryPassengerNIC,
        reservationTrainScheduleId: scheduleData[0].trainScheduleId,
      },
    };
    console.log('submit values ', submitValues);

    setPrintTicketError('');
    setPrintTicketSuccess(false);
    try {
      await request('post', `/public/reservation-ticket`, submitValues);
      setTicketData(submitValues);
      setPrintTicketSuccess(true);
      resetForm();
      setTimeout(() => {
        navigate(
          `/ticketing/reserve/schedule/reservation/${trainTurnNumber}/ticket`
        );
      }, 2000);
    } catch (e) {
      if (e?.response?.status === 500) {
        setTicketData(submitValues);
        setPrintTicketError('Error printing ticket');
        console.error('Adding Error: ', e);
      } else {
        setTicketData(submitValues);
        console.log(e?.response?.data);
        setPrintTicketError(e?.response?.data?.errors[0]);
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <TicketingOfficerLayout>
      <h1 className="mt-0">Reserve Seats</h1>
      <div className="mb-4">
        <Collapse in={Boolean(printTicketError)}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setPrintTicketError(null);
                }}
              >
                <Close fontSize="inherit" />
              </IconButton>
            }
          >
            Error printing ticket
          </Alert>
        </Collapse>

        <Collapse in={Boolean(printTicketSuccess)}>
          <Alert
            severity="success"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setPrintTicketSuccess(null);
                }}
              >
                <Close fontSize="inherit" />
              </IconButton>
            }
          >
            Ticket printed successfully.
          </Alert>
        </Collapse>
      </div>

      <Table className="col-start-1 col-end-7 bg-slate-50 p-7 rounded-2xl mb-10">
        <TableHead>
          <TableRow>
            <TableCell>Class</TableCell>
            <TableCell>Compartment</TableCell>
            <TableCell>Available seat count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {totalSeatCount.map((seats) => (
            <TableRow
              key={seats.compartmentNumber}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>
                {seats.class === 'FIRST_CLASS'
                  ? 'First Class'
                  : seats.class === 'SECOND_CLASS'
                  ? 'Second Class'
                  : 'Third Class'}
              </TableCell>
              <TableCell>{seats.compartmentNumber}</TableCell>
              <TableCell>{seats.available}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Formik
        innerRef={formikRef}
        validationSchema={ticketValidationSchema}
        initialValues={{
          primaryPassengerName: '',
          primaryPassengerNIC: '',
          ticketClass: 'FIRST_CLASS',
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
                <p className="col-start-1 col-end-3 pl-14">Class</p>
                <div className="col-start-3 col-end-6 min-w-max">
                  <FormControl className="col-start-3 col-end-7">
                    <RadioGroup
                      row
                      name="ticketClass"
                      value={formik.values.ticketClass}
                      className="grid gap-4 grid-cols-3"
                      onChange={(event) => {
                        setTicketClass(event.currentTarget.value);
                        formik.setFieldValue(
                          'ticketClass',
                          event.currentTarget.value
                        );
                      }}
                    >
                      <FormControlLabel
                        value="FIRST_CLASS"
                        control={<Radio />}
                        label="First Class"
                        className="col-start-1"
                      />
                      <FormControlLabel
                        value="SECOND_CLASS"
                        control={<Radio />}
                        label="Second Class"
                        className="col-start-2"
                      />
                      <FormControlLabel
                        value="THIRD_CLASS"
                        control={<Radio />}
                        label="Third Classs"
                        className="col-start-3"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>

                <p className="col-start-1 col-end-3 pl-14">Primary Passenger</p>
                <TextField
                  className="col-start-3 col-end-6"
                  fullWidth
                  id="primaryPassengerName"
                  name="primaryPassengerName"
                  {...formik.getFieldProps('primaryPassengerName')}
                  error={Boolean(
                    formik.touched.primaryPassengerName &&
                      formik.errors.primaryPassengerName
                  )}
                  helperText={formik.errors.primaryPassengerName}
                />

                <p className="col-start-1 col-end-3 pl-14">
                  Primary Passenger NIC
                </p>
                <TextField
                  className="col-start-3 col-end-6"
                  fullWidth
                  id="primaryPassengerNIC"
                  name="primaryPassengerNIC"
                  {...formik.getFieldProps('primaryPassengerNIC')}
                  error={Boolean(
                    formik.touched.primaryPassengerNIC &&
                      formik.errors.primaryPassengerNIC
                  )}
                  helperText={formik.errors.primaryPassengerNIC}
                />

                <p className="col-start-1 col-end-3 pl-14">Price Per Ticket</p>
                <TextField
                  className="col-start-3 col-end-4"
                  fullWidth
                  id="unitPrice"
                  name="unitPrice"
                  value={formik.values.unitPrice}
                  disabled
                />

                <p className="col-start-1 col-end-3 pl-14">Total Price</p>
                <TextField
                  className="col-start-3 col-end-4"
                  fullWidth
                  id="totalPrice"
                  name="totalPrice"
                  value={formik.values.totalPrice}
                  disabled
                />
              </div>
              <div className="flex gap-20 mt-5">
                <Button type="submit" isLoading={formik.isSubmitting}>
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
