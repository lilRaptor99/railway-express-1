import ControlOfficerLayout from '../../layout/ControlOfficerLayout';
import React from 'react';

import TextField from '../../components/TextField';
import Button from '../../components/Button';

import { Formik } from 'formik';

import {
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
} from '@mui/material';
import { Add } from '@mui/icons-material';

export default function AddTurn() {
  async function handleSubmit() {}
  async function handleAdd() {}
  return (
    <ControlOfficerLayout>
      <h1 className="my-0">Add train turns</h1>
      {/* <div className="min-h-screen w-full bg-slate-700 flex justify-center items-center"> */}
      <div className="bg-slate-100 rounded-3xl p-8">
        <div>
          <Formik
            // validationSchema={regValidationSchema}
            initialValues={{
              turnNumber: '',
              turnName: '',
              availability: '',
              type: '',
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
                    <p className="col-start-1 col-end-2">Turn Numer</p>
                    <TextField
                      className="col-start-3 col-end-5"
                      fullWidth
                      id="turnNumber"
                      name="firstName"
                      {...formik.getFieldProps('firstName')}
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
                    <Switch className="col-start-3 col-end-5" />
                    <p className="col-start-1 col-end-2">Availability</p>

                    <FormControl className="col-start-3 col-end-7">
                      <RadioGroup
                        row
                        name="availability"
                        defaultValue="Daily"
                        className="grid gap-4 grid-cols-4"
                      >
                        <FormControlLabel
                          value="Daily"
                          control={<Radio />}
                          label="Daily"
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
                        defaultValue="Slow"
                        className="grid gap-4 grid-cols-4"
                      >
                        <FormControlLabel
                          value="Slow"
                          control={<Radio />}
                          label="Slow"
                          className="col-start-1"
                        />
                        <FormControlLabel
                          value="Express"
                          control={<Radio />}
                          label="Express"
                          className="col-start-2"
                        />
                        <FormControlLabel
                          value="Intercity"
                          control={<Radio />}
                          label="Intercity"
                          className="col-start-3"
                        />
                      </RadioGroup>
                    </FormControl>
                    <p className="col-start-1 col-end-2">Add schedule</p>
                    <Table className="col-start-3 col-end-7">
                      <TableHead>
                        <TableRow>
                          <TableCell>Station</TableCell>
                          <TableCell>Arrive</TableCell>
                          <TableCell>Departure</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
                        >
                          <TableCell>---</TableCell>
                          <TableCell>---</TableCell>
                          <TableCell>---</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    <IconButton
                      className="col-start-3 col-end-7 h-10 w-10 bg-slate-700 text-slate-50 hover:bg-slate-900
                      "
                      onClick={() => handleAdd()}
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
