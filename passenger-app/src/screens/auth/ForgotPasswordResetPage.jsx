import { Formik } from 'formik';
import * as yup from 'yup';
import { useState } from 'react';
import { theme } from '../../../reactNativePaperTheme';

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
import request from '../../utils/request';

const loginValidationSchema = yup.object().shape({
  verifyKey: yup
    .string()
    .required('Required!')
    .min(4, 'Must be 4 characters long')
    .max(4, 'Must be 4 characters long'),
  newPassword: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  rePassword: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required')
    .equals([yup.ref('newPassword')], 'Passwords must match'),
});

export default function ForgotPasswordResetPage({ navigation, route }) {
  const { verifyKey, email } = route.params;
  console.log('received verify key:', verifyKey);

  const [loginError, setLoginError] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(false);

  async function handleLoginSubmit(values, { setSubmitting }) {
    setLoginError(null);
    setLoginSuccess(false);
    const submitValues = { ...values, rePassword: undefined };
    try {
      if (values.verifyKey != verifyKey) {
        setLoginError('Incorrect verify key!');
        return;
      }
      const res = await request(
        'post',
        '/public/reset-password-using-key',
        submitValues
      );
      setLoginSuccess(true);
      setTimeout(() => {
        setLoginSuccess(false);
        navigation.navigate('Login');
      }, 1500);
    } catch (e) {
      setLoginError('Error resetting password!');
      console.error('Login Error: ', e);
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
            initialValues={{
              verifyKey: '',
              newPassword: '',
              rePassword: '',
              email,
            }}
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
                  label="Verification Key"
                  onChangeText={handleChange('verifyKey')}
                  onBlur={handleBlur('verifyKey')}
                  value={values.verifyKey}
                  errorText={touched.verifyKey ? errors.verifyKey : null}
                />
                <TextInput
                  label="Email"
                  value={values.email}
                  keyboardType="email-address"
                  errorText={null}
                  disabled
                />
                <TextInput
                  label="New password"
                  onChangeText={handleChange('newPassword')}
                  onBlur={handleBlur('newPassword')}
                  value={values.newPassword}
                  secureTextEntry
                  errorText={touched.newPassword ? errors.newPassword : null}
                />
                <TextInput
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
                  Reset password
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
        Password reset success. Login to continue...
      </Snackbar>
    </>
  );
}
