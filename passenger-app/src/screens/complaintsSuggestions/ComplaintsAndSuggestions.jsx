import { Formik } from 'formik';
import * as yup from 'yup';
import { useState } from 'react';
import { theme } from '../../../reactNativePaperTheme';
import TextInput from '../../components/TextInput';
import request from '../../utils/request';

const React = require('react');
const {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
} = require('react-native');
const { Button, RadioButton, Snackbar } = require('react-native-paper');

export default function ComplaintsAndSuggestions({ navigation }) {
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  async function handleSubmit(values, { setSubmitting }) {
    const submitValues = { ...values };
    submitValues.isComplaint = values.isComplaint === 'true' ? true : false;
    setSubmitSuccess(false);
    try {
      await request('post', '/passenger/complaint', submitValues);
      setSubmitSuccess(true);
    } catch (e) {
      if (e?.response?.status === 500) {
        setSubmitError('Error submitting');
        console.error('Login Error: ', e);
      } else {
        console.log(e?.response?.data);
        setSubmitError(e?.response?.data?.errors[0]);
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
        <KeyboardAvoidingView style={{ flex: 1 }} className="px-8 py-3">
          <Text className="text-lg mb-3 text-left">
            Submit a complaint or a suggestion,
          </Text>
          <Formik
            validationSchema={yup.object().shape({
              title: yup
                .string()
                .min(5, ({ min }) => `Must be at least ${min} characters`)
                .required('Required!'),
              description: yup
                .string()
                .min(15, ({ min }) => `Must be at least ${min} characters`)
                .required('Required!'),
            })}
            initialValues={{
              title: '',
              description: '',
              isComplaint: 'true',
            }}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <>
                <TextInput
                  label="Title"
                  onChangeText={formik.handleChange('title')}
                  value={formik.values.title}
                  onBlur={formik.handleBlur('title')}
                  errorText={formik.touched.title ? formik.errors.title : null}
                />
                <TextInput
                  label="Description"
                  multiline
                  numberOfLines={8}
                  onChangeText={formik.handleChange('description')}
                  value={formik.values.description}
                  onBlur={formik.handleBlur('description')}
                  errorText={
                    formik.touched.description
                      ? formik.errors.description
                      : null
                  }
                />

                <Text className="text-base mt-3 mb-1">Type</Text>
                <RadioButton.Group
                  onValueChange={(newValue) =>
                    formik.setFieldValue('isComplaint', newValue)
                  }
                  value={formik.values.isComplaint}
                >
                  <View className="flex flex-row">
                    <View className="flex flex-row items-center mr-8">
                      <RadioButton
                        value={'true'}
                        color="#1b1f2f"
                        status="checked"
                      />
                      <Text>Complaint</Text>
                    </View>
                    <View className="flex flex-row items-center">
                      <RadioButton value={'false'} color="#1b1f2f" />
                      <Text>Suggestion</Text>
                    </View>
                  </View>
                </RadioButton.Group>

                <View>
                  <Button
                    mode="contained"
                    onPress={formik.handleSubmit}
                    className="mt-4"
                  >
                    Submit
                  </Button>
                </View>
              </>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </ScrollView>
      <Snackbar
        visible={Boolean(submitError)}
        onDismiss={() => setSubmitError(null)}
        action={{
          label: 'Close',
          onPress: () => setSubmitError(null),
        }}
        style={{ backgroundColor: theme.colors.error }}
      >
        {submitError}
      </Snackbar>
      <Snackbar
        visible={submitSuccess}
        onDismiss={() => {
          setSubmitSuccess(false);
        }}
        style={{ backgroundColor: theme.colors.success }}
      >
        Submitted successfully
      </Snackbar>
    </>
  );
}
