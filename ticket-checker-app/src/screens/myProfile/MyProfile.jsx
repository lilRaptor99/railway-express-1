import { Formik } from 'formik';
import TextInput from '../../components/TextInput';
import * as yup from 'yup';
import { theme } from '../../../reactNativePaperTheme';
import request from '../../utils/request';
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/authContext';

const React = require('react');
const {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
} = require('react-native');
const { Button, Snackbar, Avatar } = require('react-native-paper');

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
});

export default function MyProfile({ navigation }) {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { currentUser, logout } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      setUser(await currentUser);
    })();
  }, [currentUser]);

  async function handleSubmitUpdatePassword(values, { setSubmitting }) {
    const submitValues = { ...values, rePassword: undefined };
    try {
      await request('post', '/user/reset-password', submitValues);
      setSuccess(true);
      setTimeout(() => {
        logout();
        navigation.navigate('Search Trains');
      }, 1500);
    } catch (e) {
      if (e?.response?.status === 500) {
        setError('Error updating password');
      } else {
        console.log(e?.response?.data);
        setError(e?.response?.data?.errors[0]);
      }
    } finally {
      setSubmitting(false);
    }
  }
  async function handleSubmitUpdateProfile(values, { setSubmitting }) {
    const submitValues = { ...values };
    try {
      await request('post', '/passenger/update-profile', submitValues);
      setSuccess(true);
    } catch (e) {
      if (e?.response?.status === 500) {
        setError('Error updating profile');
        console.error('Error: ', e);
      } else {
        console.log(e?.response?.data);
        setError(e?.response?.data?.errors[0]);
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <ScrollView
        style={{
          backgroundColor: '#F4F4F6',
        }}
      >
        <KeyboardAvoidingView className="flex-1 items-center mx-12 pt-10">
          <View className="pb-6">
            <Avatar.Text
              size={80}
              label={user.firstName[0] + user.lastName[0]}
              className="bg-slate-200"
            />
          </View>
          <Formik
            validationSchema={regValidationSchema}
            initialValues={{
              email: user?.email,
              firstName: user?.firstName,
              lastName: user?.lastName,
              phoneNumber: user?.phoneNumber,
              nic: user?.nic,
            }}
            onSubmit={handleSubmitUpdateProfile}
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
                  disabled
                />
                <Button
                  mode="contained"
                  className="mt-4"
                  onPress={handleSubmit}
                  disabled={!isValid || isSubmitting}
                  loading={isSubmitting}
                >
                  Update
                </Button>
              </>
            )}
          </Formik>

          <Text className="text-2xl font-normal mb-2 mt-8">
            Update password
          </Text>
          <Formik
            validationSchema={yup.object().shape({
              currentPassword: yup
                .string()
                .min(
                  8,
                  ({ min }) => `Password must be at least ${min} characters`
                )
                .required('Password is required'),
              newPassword: yup
                .string()
                .min(
                  8,
                  ({ min }) => `Password must be at least ${min} characters`
                )
                .required('Password is required'),
              rePassword: yup
                .string()
                .min(
                  8,
                  ({ min }) => `Password must be at least ${min} characters`
                )
                .required('Password is required')
                .equals([yup.ref('newPassword')], 'Passwords must match'),
            })}
            initialValues={{
              currentPassword: '',
              newPassword: '',
              rePassword: '',
            }}
            onSubmit={handleSubmitUpdatePassword}
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
                  name="currentPassword"
                  label="Current password"
                  onChangeText={handleChange('currentPassword')}
                  onBlur={handleBlur('currentPassword')}
                  value={values.currentPassword}
                  secureTextEntry
                  errorText={
                    touched.currentPassword ? errors.currentPassword : null
                  }
                />
                <TextInput
                  name="newPassword"
                  label="New password"
                  onChangeText={handleChange('newPassword')}
                  onBlur={handleBlur('newPassword')}
                  value={values.newPassword}
                  secureTextEntry
                  errorText={touched.newPassword ? errors.newPassword : null}
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
                  className="mt-4 mb-4"
                  onPress={handleSubmit}
                  disabled={!isValid || isSubmitting}
                  loading={isSubmitting}
                >
                  Update Password
                </Button>
              </>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </ScrollView>
      <Snackbar
        visible={Boolean(error)}
        onDismiss={() => setError(null)}
        action={{
          label: 'Close',
          onPress: () => setError(null),
        }}
        style={{ backgroundColor: theme.colors.error }}
      >
        {error}
      </Snackbar>
      <Snackbar
        visible={success}
        onDismiss={() => {
          setSuccess(false);
        }}
        style={{ backgroundColor: theme.colors.success }}
      >
        Updated successfully
      </Snackbar>
    </>
  );
}
