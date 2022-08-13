import React, { useState } from 'react';
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
import { theme } from '../../../reactNativePaperTheme';
import request from '../../utils/request';

const phoneRegExp = /\+[0-9]{1,4}\-[0-9]{9}/;
const regValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(3, ({ min }) => `First name must be at least ${min} characters`)
    .required('First name is required'),
  lastName: yup
    .string()
    .min(3, ({ min }) => `Last name must be at least ${min} characters`)
    .required('Last name is required'),
  nic: yup
    .string()
    .min(
      10,
      ({ min }) => `NIC/Passport number must be at least ${min} characters`
    )
    .required('NIC/Passport number is required'),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, 'Phone number format: +{country code}-{number}')
    .required('Phone number is required'),
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  rePassword: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required')
    .equals([yup.ref('password')], 'Passwords must match'),
});

export default function Register({ navigation }) {
  const [registerError, setRegisterError] = useState(null);
  const [regSuccess, setRegSuccess] = useState(false);

  async function handleSubmit(values, { setSubmitting }) {
    const submitValues = { ...values, rePassword: undefined };
    try {
      await request('post', '/user', submitValues);
      setRegSuccess(true);
      setTimeout(() => {
        navigation.navigate('Login');
      }, 5000);
    } catch (e) {
      if (e?.response?.status === 500) {
        setRegisterError('Error registering user');
        console.error('Login Error: ', e);
      } else {
        console.log(e?.response?.data);
        setRegisterError(e?.response?.data?.errors[0]);
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
          <Text className="text-4xl font-normal mb-4">Register</Text>
          <Formik
            validationSchema={regValidationSchema}
            initialValues={{
              email: '',
              password: '',
              rePassword: '',
              firstName: '',
              lastName: '',
              phoneNumber: '',
              nic: '',
            }}
            onSubmit={handleSubmit}
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
                  name="firstName"
                  label="First Name"
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  value={values.firstName}
                  errorText={touched.firstName ? errors.firstName : null}
                />
                <TextInput
                  name="lastName"
                  label="Last Name"
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  value={values.lastName}
                  errorText={touched.lastName ? errors.lastName : null}
                />
                <TextInput
                  name="phoneNumber"
                  label="Phone Number"
                  onChangeText={handleChange('phoneNumber')}
                  onBlur={handleBlur('phoneNumber')}
                  value={values.phoneNumber}
                  errorText={touched.phoneNumber ? errors.phoneNumber : null}
                />
                <TextInput
                  name="nic"
                  label="NIC/Passport Number"
                  onChangeText={handleChange('nic')}
                  onBlur={handleBlur('nic')}
                  value={values.nic}
                  errorText={touched.nic ? errors.nic : null}
                />
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
                <TextInput
                  name="rePassword"
                  label="Re-type password"
                  onChangeText={handleChange('rePassword')}
                  onBlur={handleBlur('rePassword')}
                  value={values.rePassword}
                  secureTextEntry
                  errorText={touched.rePassword ? errors.rePassword : null}
                />
                <Button
                  mode="contained"
                  className="mt-4"
                  onPress={handleSubmit}
                  disabled={!isValid || isSubmitting}
                  loading={isSubmitting}
                >
                  Register
                </Button>
              </>
            )}
          </Formik>
          <Button
            mode="text"
            className="mt-6 mb-12"
            onPress={() => navigation.navigate('Login')}
          >
            Already registered?
          </Button>
        </KeyboardAvoidingView>
      </ScrollView>
      <Snackbar
        visible={Boolean(registerError)}
        onDismiss={() => setRegisterError(null)}
        action={{
          label: 'Close',
          onPress: () => setRegisterError(null),
        }}
        style={{ backgroundColor: theme.colors.error }}
      >
        {registerError}
      </Snackbar>
      <Snackbar
        visible={regSuccess}
        onDismiss={() => {}}
        action={{
          label: 'Login',
          onPress: () => navigation.navigate('Login'),
        }}
        style={{ backgroundColor: theme.colors.success }}
      >
        Registration successful Login to continue.
      </Snackbar>
    </>
  );
}
