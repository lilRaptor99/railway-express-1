import { Formik } from 'formik';
import * as yup from 'yup';
import { useState } from 'react';
import { theme } from '../../../reactNativePaperTheme';
import { useAuth } from '../../contexts/authContext';

const React = require('react');
const {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Image,
} = require('react-native');
import TextInput from '../../components/TextInput';
const { Button, Snackbar } = require('react-native-paper');
// @ts-ignore
import AuthLogo from '../../../assets/images/AuthLogo.png';

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
});

export default function ForgotPassword({ navigation }) {
  const { login } = useAuth();
  const [loginError, setLoginError] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(false);

  async function handleLoginSubmit(values, { setSubmitting }) {
    setLoginError(null);
    setLoginSuccess(false);

    try {
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
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{ email: '' }}
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
                <Button
                  mode="contained"
                  className="mt-4"
                  onPress={handleSubmit}
                  disabled={!isValid || isSubmitting}
                  loading={isSubmitting}
                >
                  Reset password
                </Button>
              </>
            )}
          </Formik>
          <Button
            mode="text"
            className="mt-6"
            onPress={() => navigation.navigate('Login')}
          >
            Login?
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
        Check your email to continue...
      </Snackbar>
    </>
  );
}
