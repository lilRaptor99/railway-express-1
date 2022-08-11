import React from 'react';
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
const { Button } = require('react-native-paper');
// @ts-ignore
import AuthLogo from '../../../assets/images/AuthLogo.png';

const regValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(3, ({ min }) => `First name must be at least ${min} characters`)
    .required('First name is required'),
  lastName: yup
    .string()
    .min(3, ({ min }) => `Last name must be at least ${min} characters`)
    .required('Last name is required'),
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
  return (
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
          }}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            setSubmitting(false);
          }}
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
                label="First Name"
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                value={values.lastName}
                errorText={touched.lastName ? errors.lastName : null}
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
          className="mt-6"
          onPress={() => navigation.navigate('Login')}
        >
          Already registered?
        </Button>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
