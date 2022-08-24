import { Formik } from 'formik';
import React, { useState } from 'react';
import * as yup from 'yup';
import TextInput from '../../components/TextInput';

import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import { Button, IconButton, Snackbar } from 'react-native-paper';
import { theme } from '../../../reactNativePaperTheme';
// @ts-ignore
import UndrawSubway from '../../../assets/images/undraw_subway.png';

const loginValidationSchema = yup.object().shape({
  from: yup
    .string()
    .min(3, ({ min }) => `Must be at least ${min} characters`)
    .required('Required!'),
  to: yup
    .string()
    .min(3, ({ min }) => `Must be at least ${min} characters`)
    .required('Required!'),
});

export default function SearchTrains({ navigation }) {
  const [loginError, setLoginError] = useState(null);

  async function handleLoginSubmit(values, { setSubmitting }) {
    setLoginError(null);
    setTimeout(() => {
      navigation.navigate('SearchResults', values);
    }, 100);
    setSubmitting(false);
  }

  function handleFieldSwap(values, setValues) {
    const newValues = { from: values.to, to: values.from };
    setValues(newValues);
  }

  return (
    <>
      <ScrollView
        style={{
          backgroundColor: '#F4F4F6',
          minHeight: 500,
        }}
        className=""
      >
        <View className="" style={{ minHeight: 200, minWidth: '100%' }}>
          <Image source={UndrawSubway} style={{ height: 200, width: '100%' }} />
        </View>

        <View
          className="flex-1 items-center ml-12 mr-16 mt-10"
          style={{
            minHeight: 500,
          }}
        >
          <Text className="text-3xl font-normal mb-4 text-slate-700">
            Search Trains
          </Text>
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{ from: '', to: '' }}
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
              setValues,
            }) => (
              <>
                <TextInput
                  name="from"
                  label="From"
                  onChangeText={handleChange('from')}
                  onBlur={handleBlur('from')}
                  value={values.from}
                  errorText={touched.from ? errors.from : null}
                />
                <View className="w-full relative">
                  <TextInput
                    name="to"
                    label="To"
                    onChangeText={handleChange('to')}
                    onBlur={handleBlur('to')}
                    value={values.to}
                    errorText={touched.to ? errors.to : null}
                  />
                  <IconButton
                    icon="cached"
                    iconColor={theme.colors.primary}
                    size={30}
                    onPress={() => handleFieldSwap(values, setValues)}
                    className="absolute -top-6 -right-12"
                  />
                </View>

                <Button
                  mode="contained"
                  className="mt-4"
                  onPress={handleSubmit}
                  disabled={!isValid || isSubmitting}
                  loading={isSubmitting}
                >
                  Search
                </Button>
              </>
            )}
          </Formik>
        </View>
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
    </>
  );
}
