import React, { useState, useEffect, useRef } from 'react';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
import TrainIcon from '@mui/icons-material/Train';
import Button from '../components/Button';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Autocomplete from '@mui/material/Autocomplete';
import request from 'utils/request';
// import { TextField as MuiTextField } from '@mui/material';
import TextField from '../components/TextField';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

export default function AlloCrewMemCard(
  {
    TName,
    TNumber,
    Date,
    Driver,
    AssiDriver,
    HeadGuard,
    UnderGuard,
    ScheduleId,
  },
  // @ts-ignore
  props
) {
  const [driverList, setDriverList] = useState([]);
  const [assiDriverList, setAssiDriverList] = useState([]);
  const [headGuardList, setHeadGuardList] = useState([]);
  const [underGuardList, setUnderGuardList] = useState([]);
  const formikRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async function () {
      try {
        const res = await request('get', '/control-officer/crew-member');
        const crewMembers = res.data;
        // @ts-ignore
        const driverList = crewMembers.filter(
          (crewMembers) => crewMembers.occupation === 'DRIVER'
        );
        const assiDriverList = crewMembers.filter(
          (crewMembers) => crewMembers.occupation === 'DRIVER_ASSISTANT'
        );
        const headGuardList = crewMembers.filter(
          (crewMembers) => crewMembers.occupation === 'HEAD_GUARD'
        );
        const underGuardList = crewMembers.filter(
          (crewMembers) => crewMembers.occupation === 'UNDER_GUARD'
        );

        setDriverList(driverList);
        setAssiDriverList(assiDriverList);
        setHeadGuardList(headGuardList);
        setUnderGuardList(underGuardList);
      } catch (e) {
        if (e?.response?.status === 500) {
          console.error('Fetching Error: ', e);
        } else {
          console.log(e?.response?.data);
        }
      }
    })();
  }, []);

  const refreshPage = () => {
    navigate(0);
  };

  // @ts-ignore
  async function handleSubmit(values, { setSubmitting, resetForm }) {
    const submitValues = {
      driverUserId: values.driver.userId,
      driverAssistantUserId: values.assiDriver.userId,
      headGuarduserId: values.headGuard.userId,
      underGuardUserId: values.underGuard.userId,
    };
    try {
      await request(
        'put',
        `/control-officer/allocate-crew-members/${ScheduleId}`,
        submitValues
      );
      console.log('submit values: ', submitValues);
      console.log('scheduleId ', ScheduleId);
      resetForm();
      refreshPage();
    } catch (e) {
      if (e?.response?.status === 500) {
        console.error('Allocating crew member error: ', e);
      } else {
        console.log(e?.response?.data);
      }
    } finally {
      setSubmitting(false);
    }
  }

  const regValidationSchema = Yup.object().shape({});

  return (
    <div>
      <div className="my-3 bg-slate-50 rounded-3xl px-5 py-5 w-full">
        <div className="bg-slate-50 rounded-3xl w-full">
          <div className="relative flex-row items-center justify-evenly">
            <div className="text-lg font-bold flex flex-col justify-between">
              <div>
                <TrainIcon />
              </div>
              <div>
                <div className="font-semibold">Turn Name: {TName}</div>
                <div className="font-semibold">Turn Number: {TNumber}</div>
                <div className="font-semibold">
                  Date: {moment(Date).format('YYYY MM DD')}
                </div>
              </div>
            </div>
            <div className="absolute h-0.5 bg-slate-500/25 w-full left-0 bottom-0">
              <div></div>
            </div>
          </div>
          <div className="flex flex-col gap-10">
            <Formik
              validationSchema={regValidationSchema}
              innerRef={formikRef}
              initialValues={{
                driver: null,
                assiDriver: null,
                headGuard: null,
                underGuard: null,
              }}
              onSubmit={handleSubmit}
            >
              {(formik) => (
                <form
                  onSubmit={formik.handleSubmit}
                  className="flex flex-col gap-4 items-center"
                >
                  <div className="flex flex-row gap-10 mt-5">
                    <div className="flex flex-col gap-7">
                      {Driver}
                      <Autocomplete
                        className="w-72"
                        disablePortal
                        getOptionLabel={(driverList) =>
                          `${driverList.firstName} ${driverList.lastName}`
                        }
                        options={driverList}
                        value={
                          // @ts-ignore
                          formik.values.drivers
                        }
                        onChange={(e, driver) => {
                          console.log(driver, e);
                          formik.setFieldValue(
                            // @ts-ignore
                            `driver`,
                            driver
                          );
                        }}
                        isOptionEqualToValue={(option, value) =>
                          option.name === value.name
                        }
                        noOptionsText={'No Available Drivers'}
                        classes={{
                          inputRoot: 'w-72 rounded-2xl',
                        }}
                        renderInput={(params) => (
                          // @ts-ignore
                          <TextField
                            {...params}
                            label="Select Driver"
                            className="w-72"
                          />
                        )}
                      />
                      {AssiDriver}
                      <Autocomplete
                        className="w-72"
                        disablePortal
                        getOptionLabel={(assiDriverList) =>
                          `${assiDriverList.firstName} ${assiDriverList.lastName}`
                        }
                        options={assiDriverList}
                        value={
                          // @ts-ignore
                          formik.values.assiDrivers
                        }
                        onChange={(e, assiDriver) => {
                          console.log(assiDriver, e);
                          formik.setFieldValue(
                            // @ts-ignore
                            `assiDriver`,
                            assiDriver
                          );
                        }}
                        isOptionEqualToValue={(option, value) =>
                          option.name === value.name
                        }
                        noOptionsText={'No Available Assistant Drivers'}
                        classes={{
                          inputRoot: 'w-72 rounded-2xl',
                        }}
                        renderInput={(params) => (
                          // @ts-ignore
                          <TextField
                            {...params}
                            label="Select Assistant Driver"
                            className="w-72"
                          />
                        )}
                      />
                    </div>
                    <div className="flex flex-col gap-7">
                      {HeadGuard}
                      <Autocomplete
                        className="w-72"
                        disablePortal
                        getOptionLabel={(headGuardList) =>
                          `${headGuardList.firstName} ${headGuardList.lastName}`
                        }
                        options={headGuardList}
                        value={
                          // @ts-ignore
                          formik.values.headGuards
                        }
                        onChange={(e, headGuard) => {
                          console.log(headGuard, e);
                          formik.setFieldValue(
                            // @ts-ignore
                            `headGuard`,
                            headGuard
                          );
                        }}
                        isOptionEqualToValue={(option, value) =>
                          option.name === value.name
                        }
                        noOptionsText={'No Available Head Guards'}
                        classes={{
                          inputRoot: 'w-72 rounded-2xl',
                        }}
                        renderInput={(params) => (
                          // @ts-ignore
                          <TextField
                            {...params}
                            label="Select Head Guard"
                            className="w-72"
                          />
                        )}
                      />
                      {UnderGuard}
                      <Autocomplete
                        className="w-72"
                        disablePortal
                        getOptionLabel={(underGuardList) =>
                          `${underGuardList.firstName} ${underGuardList.lastName}`
                        }
                        options={underGuardList}
                        value={
                          // @ts-ignore
                          formik.values.underGuards
                        }
                        onChange={(e, underGuard) => {
                          console.log(underGuard, e);
                          formik.setFieldValue(
                            // @ts-ignore
                            `underGuard`,
                            underGuard
                          );
                        }}
                        isOptionEqualToValue={(option, value) =>
                          option.name === value.name
                        }
                        noOptionsText={'No Available Under Guards'}
                        classes={{
                          inputRoot: 'w-72 rounded-2xl',
                        }}
                        renderInput={(params) => (
                          // @ts-ignore
                          <TextField
                            {...params}
                            label="Select Under Guard"
                            className="w-72"
                          />
                        )}
                      />
                    </div>
                  </div>
                  <Button type="submit" isLoading={formik.isSubmitting}>
                    Save
                  </Button>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
