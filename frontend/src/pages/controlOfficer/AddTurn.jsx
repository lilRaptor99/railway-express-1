import ControlOfficerLayout from '../../layout/ControlOfficerLayout';
import React, { useEffect, useState } from 'react';

import TextField from '../../components/TextField';
import Button from '../../components/Button';

import { Formik } from 'formik';
import * as Yup from 'yup';

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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField as MuiTextField,
} from '@mui/material';
import { Add, Close } from '@mui/icons-material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import request from 'utils/request';

export default function AddTurn() {
  const [addError, setAddError] = useState('');
  const [addSuccess, setAddSuccess] = useState(false);
  const [stations, setStations] = useState([]);
  //const [selectedStation, setSelectedStation] = useState(null);

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

  const turnValidationSchema = Yup.object().shape({
    turnNumber: Yup.number()
      .min(3, ({ min }) => `Turn number must be at least ${min} characters`)
      .required('Turn number is required'),
    turnName: Yup.string().min(
      3,
      ({ min }) => `Turn name must be at least ${min} characters`
    ),
  });

  async function handleSubmit(values, { setSubmitting, resetForm }) {
    console.log('running');
    // @ts-ignore
    const submitValues = {
      ...values,
      turnNumber: parseInt(values.turnNumber),
      firstClass: undefined,
      secondClass: undefined,
      thirdClass: undefined,
      trainCompartments: [
        ...values.firstClassCompartments,
        ...values.secondClassCompartments,
        ...values.thirdClassCompartments,
      ],
      firstClassCompartments: undefined,
      secondClassCompartments: undefined,
      thirdClassCompartments: undefined,
      intermediateStations: values.intermediateStations.map(
        (station, index) => {
          return {
            stationId: station.stationId.stationId,
            arrivalTime: station?.arrivalTime
              ? station?.arrivalTime._d.getHours() +
                ':' +
                station?.arrivalTime._d.getMinutes()
              : null,
            departureTime: station?.departureTime
              ? station?.departureTime._d.getHours() +
                ':' +
                station?.departureTime._d.getMinutes()
              : null,
            isStart: index === 0,
            isEnd: index === values.intermediateStations.length - 1,
          };
        }
      ),
    };
    console.log(submitValues);

    setAddError('');
    setAddSuccess(false);
    try {
      await request('post', `/control-officer/train-turn/add/`, submitValues);
      setAddSuccess(true);
      resetForm();
    } catch (e) {
      if (e?.response?.status === 500) {
        setAddError('Error adding turn');
        console.error('Adding Error: ', e);
      } else {
        console.log(e?.response?.data);
        setAddError(e?.response?.data?.errors[0]);
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <ControlOfficerLayout>
      <h1 className="my-0">Add train turns</h1>
      <div className="bg-slate-100 rounded-3xl p-8">
        <div className="mb-4">
          <Collapse in={Boolean(addError)}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setAddError(null);
                  }}
                >
                  <Close fontSize="inherit" />
                </IconButton>
              }
            >
              Error adding train turn
            </Alert>
          </Collapse>

          <Collapse in={Boolean(addSuccess)}>
            <Alert
              severity="success"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setAddSuccess(null);
                  }}
                >
                  <Close fontSize="inherit" />
                </IconButton>
              }
            >
              Train turn added successfully.
            </Alert>
          </Collapse>
        </div>

        <div>
          <Formik
            validationSchema={turnValidationSchema}
            initialValues={{
              turnNumber: '',
              turnName: '',
              reservable: false,
              availability: 'DAILY',
              type: 'SLOW',
              firstClassCompartments: [],
              secondClassCompartments: [],
              thirdClassCompartments: [],
              firstClass: 0,
              secondClass: 0,
              thirdClass: 0,
              intermediateStations: [
                { stationId: null, arrivalTime: null, departureTime: null },
              ],
            }}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <>
                <form
                  onSubmit={formik.handleSubmit}
                  className="w-full flex flex-col gap-4 items-center"
                >
                  <div className="w-full grid gap-4 grid-cols-7">
                    <p className="col-start-1 col-end-2">Turn Number</p>
                    <TextField
                      className="col-start-3 col-end-5"
                      fullWidth
                      id="turnNumber"
                      name="turnNumber"
                      {...formik.getFieldProps('turnNumber')}
                      error={Boolean(
                        formik.touched.turnNumber && formik.errors.turnNumber
                      )}
                      helperText={formik.errors.turnNumber}
                    />

                    <p className="col-start-1 col-end-2">Turn Name</p>
                    <TextField
                      className="col-start-3 col-end-5"
                      fullWidth
                      id="turnName"
                      name="turnName"
                      {...formik.getFieldProps('turnName')}
                      error={Boolean(
                        formik.touched.turnName && formik.errors.turnName
                      )}
                      helperText={formik.errors.turnName}
                    />

                    <p className="col-start-1 col-end-2">Reservable?</p>
                    <Switch
                      className="col-start-3 col-end-5"
                      id="reservable"
                      name="reservable"
                      value={formik.values.reservable}
                      onChange={formik.handleChange}
                    />
                    <div
                      className={
                        formik.values.reservable
                          ? 'col-start-2 col-end-7'
                          : 'hidden'
                      }
                    >
                      <div className="col-start-3 col-end-6 bg-slate-200 p-7 rounded-2xl">
                        <h2 className="m-0 mb-5 font-light">
                          Reservable compartment configuration
                        </h2>
                        <div className="flex flex-wrap gap-3">
                          <p>No of first class compartments</p>
                          <TextField
                            type="number"
                            id="firstClass"
                            name="firstClass"
                            value={formik.values.firstClass}
                            onChange={(e) => {
                              console.log('field value change', e.target.value);
                              const number = Number(e.target.value);
                              const newCompartments = [];
                              for (let i = 0; i < number; i++) {
                                newCompartments.push({
                                  class: 'FIRST_CLASS',
                                  compartmentNumber: '',
                                  seatCount: 0,
                                });
                              }
                              console.log(number);
                              formik.setFieldValue(
                                'firstClassCompartments',
                                newCompartments
                              );
                              formik.handleChange(e);
                            }}
                          />
                        </div>
                        <div className="bg-slate-100 rounded-2xl mt-3">
                          <Table className="m-2">
                            <TableHead>
                              <TableRow>
                                <TableCell>Compartment Number</TableCell>
                                <TableCell>No of seats</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {formik.values.firstClassCompartments.map(
                                (compartment, index) => (
                                  <TableRow
                                    key={index}
                                    sx={{
                                      '&:last-child td, &:last-child th': {
                                        border: 0,
                                      },
                                    }}
                                  >
                                    <TableCell>
                                      <TextField
                                        type="text"
                                        id={`firstClassCompartments[${index}].compartmentNumber`}
                                        name={`firstClassCompartments[${index}].compartmentNumber`}
                                        {...formik.getFieldProps(
                                          `firstClassCompartments[${index}].compartmentNumber`
                                        )}
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <TextField
                                        type="number"
                                        id={`firstClassCompartments[${index}].seatCount`}
                                        name={`firstClassCompartments[${index}].seatCount`}
                                        {...formik.getFieldProps(
                                          `firstClassCompartments[${index}].seatCount`
                                        )}
                                      />
                                    </TableCell>
                                  </TableRow>
                                )
                              )}
                            </TableBody>
                          </Table>
                        </div>
                        <div className="flex flex-wrap gap-3 mt-3">
                          <p>No of second class compartments</p>
                          <TextField
                            type="number"
                            id="secondClass"
                            name="secondClass"
                            value={formik.values.secondClass}
                            onChange={(e) => {
                              console.log('field value change', e.target.value);
                              const number = Number(e.target.value);
                              const newCompartments = [];
                              for (let i = 0; i < number; i++) {
                                newCompartments.push({
                                  class: 'SECOND_CLASS',
                                  compartmentNumber: '',
                                  seatCount: 0,
                                });
                              }
                              console.log(number);
                              formik.setFieldValue(
                                'secondClassCompartments',
                                newCompartments
                              );
                              formik.handleChange(e);
                            }}
                          />
                        </div>
                        <div className="bg-slate-100 rounded-2xl mt-3">
                          <Table className="m-2">
                            <TableHead>
                              <TableRow>
                                <TableCell>Compartment Number</TableCell>
                                <TableCell>No of seats</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {formik.values.secondClassCompartments.map(
                                (compartment, index) => (
                                  <TableRow
                                    key={index}
                                    sx={{
                                      '&:last-child td, &:last-child th': {
                                        border: 0,
                                      },
                                    }}
                                  >
                                    <TableCell>
                                      <TextField
                                        type="text"
                                        id={`secondClassCompartments[${index}].compartmentNumber`}
                                        name={`secondClassCompartments[${index}].compartmentNumber`}
                                        {...formik.getFieldProps(
                                          `secondClassCompartments[${index}].compartmentNumber`
                                        )}
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <TextField
                                        type="number"
                                        id={`secondClassCompartments[${index}].seatCount`}
                                        name={`secondClassCompartments[${index}].seatCount`}
                                        {...formik.getFieldProps(
                                          `secondClassCompartments[${index}].seatCount`
                                        )}
                                      />
                                    </TableCell>
                                  </TableRow>
                                )
                              )}
                            </TableBody>
                          </Table>
                        </div>
                        <div className="flex flex-wrap gap-3 mt-3">
                          <p>No of third class compartments</p>
                          <TextField
                            type="number"
                            id="thirdClass"
                            name="thirdClass"
                            value={formik.values.thirdClass}
                            onChange={(e) => {
                              console.log('field value change', e.target.value);
                              const number = Number(e.target.value);
                              const newCompartments = [];
                              for (let i = 0; i < number; i++) {
                                newCompartments.push({
                                  class: 'THIRD_CLASS',
                                  compartmentNumber: '',
                                  seatCount: 0,
                                });
                              }
                              console.log(number);
                              formik.setFieldValue(
                                'thirdClassCompartments',
                                newCompartments
                              );
                              formik.handleChange(e);
                            }}
                          />
                        </div>
                        <div className="bg-slate-100 rounded-2xl mt-3">
                          <Table className="m-2">
                            <TableHead>
                              <TableRow>
                                <TableCell>Compartment Number</TableCell>
                                <TableCell>No of seats</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {formik.values.thirdClassCompartments.map(
                                (compartment, index) => (
                                  <TableRow
                                    key={index}
                                    sx={{
                                      '&:last-child td, &:last-child th': {
                                        border: 0,
                                      },
                                    }}
                                  >
                                    <TableCell>
                                      <TextField
                                        type="text"
                                        id={`thirdClassCompartments[${index}].compartmentNumber`}
                                        name={`thirdClassCompartments[${index}].compartmentNumber`}
                                        {...formik.getFieldProps(
                                          `thirdClassCompartments[${index}].compartmentNumber`
                                        )}
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <TextField
                                        type="number"
                                        id={`thirdClassCompartments[${index}].seatCount`}
                                        name={`thirdClassCompartments[${index}].seatCount`}
                                        {...formik.getFieldProps(
                                          `thirdClassCompartments[${index}].seatCount`
                                        )}
                                      />
                                    </TableCell>
                                  </TableRow>
                                )
                              )}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    </div>

                    <p className="col-start-1 col-end-2">Availability</p>
                    <FormControl className="col-start-3 col-end-7">
                      <RadioGroup
                        row
                        name="availability"
                        value={formik.values.availability}
                        className="grid gap-4 grid-cols-4"
                        onChange={(event) => {
                          formik.setFieldValue(
                            'availability',
                            event.currentTarget.value
                          );
                        }}
                      >
                        <FormControlLabel
                          value="DAILY"
                          control={<Radio />}
                          label="DAILY"
                          className="col-start-1"
                        />
                        <FormControlLabel
                          value="NS"
                          control={<Radio />}
                          label="NS"
                          className="col-start-2"
                        />
                        <FormControlLabel
                          value="SO"
                          control={<Radio />}
                          label="SO"
                          className="col-start-3"
                        />
                        <FormControlLabel
                          value="NSU"
                          control={<Radio />}
                          label="NSU"
                          className="col-start-4"
                        />
                      </RadioGroup>
                    </FormControl>

                    <p className="col-start-1 col-end-3">Type</p>
                    <FormControl className="col-start-3 col-end-7">
                      <RadioGroup
                        row
                        name="type"
                        value={formik.values.type}
                        className="grid gap-4 grid-cols-4"
                        onChange={(event) => {
                          formik.setFieldValue(
                            'type',
                            event.currentTarget.value
                          );
                        }}
                      >
                        <FormControlLabel
                          value="SLOW"
                          control={<Radio />}
                          label="SLOW"
                          className="col-start-1"
                        />
                        <FormControlLabel
                          value="EXPRESS"
                          control={<Radio />}
                          label="EXPRESS"
                          className="col-start-2"
                        />
                        <FormControlLabel
                          value="INTERCITY"
                          control={<Radio />}
                          label="INTERCITY"
                          className="col-start-3"
                        />
                      </RadioGroup>
                    </FormControl>

                    <p className="col-start-1 col-end-2">Add schedule</p>
                    <Table className="col-start-3 col-end-7">
                      <TableHead>
                        <TableRow>
                          <TableCell>Station</TableCell>
                          <TableCell>Arrival Time</TableCell>
                          <TableCell>Departure Time</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {formik.values.intermediateStations.map(
                          (station, index) => (
                            <TableRow
                              key={index}
                              sx={{
                                '&:last-child td, &:last-child th': {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell>
                                <Autocomplete
                                  disablePortal
                                  id="station"
                                  getOptionLabel={(stations) =>
                                    `${stations.name}`
                                  }
                                  options={stations}
                                  value={
                                    formik.values.intermediateStations[index]
                                      .stationId
                                  }
                                  onChange={(e, station) => {
                                    console.log(station, e);
                                    formik.setFieldValue(
                                      `intermediateStations[${index}].stationId`,
                                      station
                                    );
                                  }}
                                  isOptionEqualToValue={(option, value) =>
                                    option.name === value.name
                                  }
                                  noOptionsText={'No Available Stations'}
                                  classes={{
                                    inputRoot: 'w-44 rounded-2xl',
                                  }}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="Select a station"
                                      className="w-44"
                                    />
                                  )}
                                />
                              </TableCell>
                              <TableCell>
                                <TimePicker
                                  disabled={index === 0}
                                  label="Arrival time"
                                  value={
                                    formik.values.intermediateStations[index]
                                      .arrivalTime
                                  }
                                  onChange={(e) => {
                                    formik.setFieldValue(
                                      `intermediateStations[${index}].arrivalTime`,
                                      e
                                    );
                                  }}
                                  renderInput={(params) => (
                                    <MuiTextField
                                      {...params}
                                      InputProps={{
                                        ...params.InputProps,
                                        className: 'rounded-2xl',
                                      }}
                                    />
                                  )}
                                />
                              </TableCell>
                              <TableCell>
                                <TimePicker
                                  disabled={
                                    index ===
                                    formik.values.intermediateStations.length -
                                      1
                                  }
                                  label="Departure time"
                                  value={
                                    formik.values.intermediateStations[index]
                                      .departureTime
                                  }
                                  onChange={(e) => {
                                    formik.setFieldValue(
                                      `intermediateStations[${index}].departureTime`,
                                      e
                                    );
                                  }}
                                  renderInput={(params) => (
                                    <MuiTextField
                                      {...params}
                                      InputProps={{
                                        ...params.InputProps,
                                        className: 'rounded-2xl',
                                      }}
                                    />
                                  )}
                                />
                              </TableCell>
                            </TableRow>
                          )
                        )}
                      </TableBody>
                    </Table>
                    <IconButton
                      className="col-start-3 col-end-7 h-10 w-10 bg-slate-700 text-slate-50 hover:bg-slate-900
                      "
                      onClick={(e) => {
                        const newIntermediateStations = [
                          ...formik.values.intermediateStations,
                        ];
                        newIntermediateStations.push({
                          stationId: null,
                          arrivalTime: null,
                          departureTime: null,
                        });
                        formik.setFieldValue(
                          'intermediateStations',
                          newIntermediateStations
                        );
                      }}
                      edge="end"
                    >
                      <Add />
                    </IconButton>
                  </div>
                  <Button type="submit" isLoading={formik.isSubmitting}>
                    Add turn
                  </Button>
                </form>
              </>
            )}
          </Formik>
        </div>
      </div>
      {/* </div> */}
    </ControlOfficerLayout>
  );
}
