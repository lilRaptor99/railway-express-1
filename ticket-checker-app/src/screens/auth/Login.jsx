import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import TextInput from '../../components/TextInput';
const {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} = require('react-native');
const { Button, Snackbar } = require('react-native-paper');
// @ts-ignore
import AuthLogo from '../../../assets/images/AuthLogo.png';
import { useAuth } from '../../contexts/authContext';
import { theme } from '../../../reactNativePaperTheme';

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});

export default function Login({ navigation }) {
  const { login } = useAuth();
  const [loginError, setLoginError] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(false);

  async function handleLoginSubmit(values, { setSubmitting }) {
    setLoginError(null);
    setLoginSuccess(false);

    try {
      await login(values.email, values.password);
      setLoginSuccess(true);
      setTimeout(() => {
        setLoginSuccess(false);
        navigation.navigate('Search Trains');
      }, 1500);
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
    <>
      <ScrollView
        style={{
          backgroundColor: '#F4F4F6',
        }}
      >
        <View
          className="flex-1 items-center mt-8 mb-2"
          style={{ maxHeight: 200 }}
        >
          <Image source={AuthLogo} style={{ height: 200, width: 280 }} />
        </View>

        <KeyboardAvoidingView className="flex-1 items-center mx-12">
          <Text className="text-4xl font-normal mb-4">Login</Text>
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{ email: '', password: '' }}
            onSubmit={handleLoginSubmit}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isValid,
              isSubmitting,
              touched,
            }) => (
              <>
                <TextInput
                  name="email"
                  label="Email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                  errorText={touched.email ? errors.email : null}
                />
                <TextInput
                  name="password"
                  label="Password"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry
                  errorText={touched.password ? errors.password : null}
                />
                <Button
                  mode="contained"
                  className="mt-4"
                  onPress={handleSubmit}
                  disabled={!isValid || isSubmitting}
                  loading={isSubmitting}
                >
                  Login
                </Button>
              </>
            )}
          </Formik>
          <Button
            mode="text"
            className="mt-6"
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            Forgot Password?
          </Button>
        </KeyboardAvoidingView>
      </ScrollView>
      <Snackbar
        visible={Boolean(loginError)}
        onDismiss={() => setLoginError(null)}
        action={{
          label: 'Close',
          onPress: () => setLoginError(null),
        }}
        style={{ backgroundColor: theme.colors.error }}
      >
        {loginError}
      </Snackbar>
      <Snackbar
        visible={loginSuccess}
        onDismiss={() => {}}
        style={{ backgroundColor: theme.colors.success }}
      >
        Login success! Redirecting to search...
      </Snackbar>
    </>
  );
}
