import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/authContext';
import AdminLayout from '../layout/AdminLayout';
import ControlOfficerLayout from 'layout/ControlOfficerLayout';
import TicketingOfficerLayout from 'layout/TicketingOfficerLayout';

import { Formik } from 'formik';
import * as Yup from 'yup';

import Button from '../components/Button';
import TextField from '../components/TextField';
import { Close } from '@mui/icons-material';
import { Collapse, Alert, IconButton } from '@mui/material';
import request from 'utils/request';
import { useSearchParams } from 'react-router-dom';

export default function UserProfile() {
  const { currentUser } = useAuth();

  switch (currentUser?.role) {
    case 'ADMIN':
      return (
        <AdminLayout>
          <UserProfilePage />
        </AdminLayout>
      );
    case 'CONTROL_OFFICER':
      return (
        <ControlOfficerLayout>
          <UserProfilePage />
        </ControlOfficerLayout>
      );
    case 'TICKETING_OFFICER':
      return (
        <TicketingOfficerLayout>
          <UserProfilePage />
        </TicketingOfficerLayout>
      );
    default:
      return;
  }
}

function UserProfilePage() {
  const { currentUser } = useAuth();
  let userRole = currentUser?.role;
  const [regError, setRegError] = useState('');
  const [regSuccess, setRegSuccess] = useState(false);
  const [searchParams] = useSearchParams();
  const [initialLogInMsg, setInitialLogInMsg] = useState('');
  useEffect(() => {
    if (searchParams.get('initialLogIn') === 'true') {
      setInitialLogInMsg('Please Reset Your Password Before Proceeding.');
      console.log(initialLogInMsg);
    }
  }, [initialLogInMsg, searchParams]);

  const regValidationSchema = Yup.object().shape({
    currentPassword: Yup.string().required('Current Password is required'),
    newPassword: Yup.string()
      .min(8, ({ min }) => `New Password must be at least ${min} characters`)
      .required('New Password is required'),
    reenterNewPassword: Yup.string()
      .required('Re-enter password field cannot be empty')
      .equals([Yup.ref('newPassword')], 'Passwords must match'),
  });

  switch (currentUser?.role) {
    case 'ADMIN':
      userRole = 'Administrator';
      break;
    case 'CONTROL_OFFICER':
      userRole = 'Control Officer';
      break;
    case 'TICKETING_OFFICER':
      userRole = 'Ticketing Officer';
      break;
    default:
      return;
  }

  async function handleSubmit(values, { setSubmitting, resetForm }) {
    const submitValues = { ...values, reenterNewPassword: undefined };
    try {
      await request('post', `/user/reset-password`, submitValues);
      setRegSuccess(true);
      resetForm();
    } catch (e) {
      if (e?.response?.status === 500) {
        setRegError('Error resetting password');
        console.error('Password resetting Error: ', e);
      } else {
        console.log(e?.response?.data);
        setRegError(e?.response?.data?.errors[0]);
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <h1> Profile Page </h1>

      <div className="bg-slate-100 rounded-3xl p-8">
        <div className="w-full grid gap-1 grid-cols-7">
          <p className="col-start-1 col-end-2">First Name -</p>
          <p className="col-start-2 col-end-5">{currentUser?.firstName}</p>
          <p className="col-start-1 col-end-2">Last Name -</p>
          <p className="col-start-2 col-end-5">{currentUser?.lastName}</p>
          <p className="col-start-1 col-end-2">Email Address -</p>
          <p className="col-start-2 col-end-5">{currentUser?.email}</p>
          <p className="col-start-1 col-end-2">Phone Number -</p>
          <p className="col-start-2 col-end-5">{currentUser?.phoneNumber}</p>
          <p className="col-start-1 col-end-2">NIC -</p>
          <p className="col-start-2 col-end-5">{currentUser?.nic}</p>
          <p className="col-start-1 col-end-2">Address -</p>
          <p className="col-start-2 col-end-5">{currentUser?.address}</p>
          <p className="col-start-1 col-end-2">Position -</p>
          <p className="col-start-2 col-end-5">{userRole}</p>
        </div>
      </div>

      <h1 style={{ color: 'red' }}>{initialLogInMsg}</h1>
      <h1>Reset Password</h1>

      <div className="bg-slate-100 rounded-3xl p-8">
        <div className="mb-4">
          <Collapse in={Boolean(regError)}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setRegError(null);
                  }}
                >
                  <Close fontSize="inherit" />
                </IconButton>
              }
            >
              {regError}
            </Alert>
          </Collapse>

          <Collapse in={Boolean(regSuccess)}>
            <Alert
              severity="success"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setRegSuccess(null);
                  }}
                >
                  <Close fontSize="inherit" />
                </IconButton>
              }
            >
              Password was changed successfully.
            </Alert>
          </Collapse>
        </div>
        <Formik
          validationSchema={regValidationSchema}
          initialValues={{
            currentPassword: '',
            newPassword: '',
            reenterNewPassword: '',
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
                  <p className="col-start-1 col-end-2">Current Password</p>
                  <TextField
                    passwordField
                    className="col-start-3 col-end-7"
                    fullWidth
                    id="currentPassword"
                    name="currentPassword"
                    {...formik.getFieldProps('currentPassword')}
                    error={Boolean(
                      formik.touched.currentPassword &&
                        formik.errors.currentPassword
                    )}
                    helperText={formik.errors.currentPassword}
                  />
                  <p className="col-start-1 col-end-3">New Password</p>
                  <TextField
                    passwordField
                    className="col-start-3 col-end-7"
                    fullWidth
                    id="newPassword"
                    name="newPassword"
                    {...formik.getFieldProps('newPassword')}
                    error={Boolean(
                      formik.touched.newPassword && formik.errors.newPassword
                    )}
                    helperText={formik.errors.newPassword}
                  />
                  <p className="col-start-1 col-end-3">Re-Enter New Password</p>
                  <TextField
                    passwordField
                    className="col-start-3 col-end-7"
                    fullWidth
                    id="reenterNewPassword"
                    name="nic"
                    {...formik.getFieldProps('reenterNewPassword')}
                    error={Boolean(
                      formik.touched.reenterNewPassword &&
                        formik.errors.reenterNewPassword
                    )}
                    helperText={formik.errors.reenterNewPassword}
                  />
                </div>
                <Button type="submit" isLoading={formik.isSubmitting}>
                  Reset Password
                </Button>
              </form>
            </>
          )}
        </Formik>
      </div>
    </div>
  );
}
