import React, { useEffect, useState } from 'react';

import { Formik } from 'formik';
import * as Yup from 'yup';

import Button from '../components/Button';
import TextField from '../components/TextField';
import { Collapse, Alert, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import Logo from '../assets/Logo.svg';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

export default function Login() {
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  const { currentUser, login } = useAuth();

  // Navigate logged in user
  useEffect(() => {
    switch (currentUser?.role) {
      case 'ADMIN':
        navigate('/admin/stats', { replace: true });
        break;
      case 'CONTROL_OFFICER':
        navigate('/control', { replace: true });
        break;
      case 'TICKETING_OFFICER':
        navigate('/ticketing', { replace: true });
        break;
      default:
        return;
    }
  }, [currentUser, navigate]);

  async function handleLoginSubmit(values, { setSubmitting }) {
    setLoginError('');

    try {
      await login(values.email, values.password);
    } catch (e) {
      if (e?.response?.status === 401) {
        setLoginError('Incorrect Email or Password');
      } else {
        setLoginError('Error logging in');
        console.error('Login Error: ', e);
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-slate-700 flex justify-center items-center">
      <div className="bg-slate-100 rounded-3xl p-8 w-full max-w-md mx-auto">
        <div className="bg-slate-700 p-5 mb-8 rounded-2xl flex flex-col justify-center items-center">
          <img src={Logo} alt="Railway Express Logo" />
          <h1 className="text-slate-100 text-3xl font-serif text-center m-0 pt-3">
            Railway Express
          </h1>
        </div>

        <div className="text-center mb-4">
          <h1 className="text-slate-800 text-2xl font-bold mb-1">
            Hi, Welcome Back
          </h1>
          <p className="text-slate-500 m-0">
            Enter your credentials to continue
          </p>
        </div>

        {/* Login error alert */}
        <div className="mb-4">
          <Collapse in={Boolean(loginError)}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setLoginError(null);
                  }}
                >
                  <Close fontSize="inherit" />
                </IconButton>
              }
            >
              {loginError}
            </Alert>
          </Collapse>
        </div>

        <div>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
              password: Yup.string()
                .max(25, 'Must be 25 characters or less')
                .min(8, 'Must be 8 characters or more')
                .required('Required'),
            })}
            onSubmit={handleLoginSubmit}
          >
            {(formik) => (
              <>
                <form
                  onSubmit={formik.handleSubmit}
                  className="flex flex-col gap-4 items-center"
                >
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    {...formik.getFieldProps('email')}
                    error={Boolean(formik.touched.email && formik.errors.email)}
                    helperText={formik.errors.email}
                    passwordField={false}
                  />
                  <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    {...formik.getFieldProps('password')}
                    error={Boolean(
                      formik.touched.password && formik.errors.password
                    )}
                    helperText={formik.errors.password}
                    passwordField
                  />
                  <Button type="submit" isLoading={formik.isSubmitting}>
                    Login
                  </Button>
                </form>
              </>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
