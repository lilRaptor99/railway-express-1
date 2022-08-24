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
  // @ts-ignore
  verificationCode: yup
    .string()
    .required('Required!')
    .min(4, 'Must be 4 characters long')
    .max(4, 'Must be 4 characters long'),
});

export default function VerifyEmail({ navigation }) {
  const { login } = useAuth();
  const [loginError, setLoginError] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(false);

  async function handleLoginSubmit(values, { setSubmitting }) {
    setLoginError(null);
    setLoginSuccess(false);

    try {
      setTimeout(() => {
        setLoginSuccess(true);
      }, 500);
      setTimeout(() => {
        setLoginSuccess(false);
        navigation.navigate('Login');
      }, 2500);
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
          <Text className="text-xl font-normal mb-4">
            Enter verification code sent to your email to continue:
          </Text>
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{ verificationCode: null }}
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
                  name="verificationCode"
                  label="Verification Code"
                  onChangeText={handleChange('verificationCode')}
                  onBlur={handleBlur('verificationCode')}
                  value={values.verificationCode}
                  keyboardType="numeric"
                  errorText={
                    touched.verificationCode ? errors.verificationCode : null
                  }
                />
                <Button
                  mode="contained"
                  className="mt-4"
                  onPress={handleSubmit}
                  disabled={!isValid || isSubmitting}
                  loading={isSubmitting}
                >
                  Verify Email
                </Button>
              </>
            )}
          </Formik>
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
        Verification success! Redirecting to login...
      </Snackbar>
    </>
  );
}
