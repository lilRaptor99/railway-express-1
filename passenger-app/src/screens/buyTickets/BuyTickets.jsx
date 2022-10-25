import React, { useEffect, useRef, useState } from 'react';
import * as yup from 'yup';

import { Formik } from 'formik';
import { KeyboardAvoidingView, ScrollView, Text, View } from 'react-native';
import { Button, RadioButton, Snackbar, Switch } from 'react-native-paper';
import { theme } from '../../../reactNativePaperTheme';
import Autocomplete from '../../components/Autocomplete';
import TextInput from '../../components/TextInput';
import request from '../../utils/request';

let fromStation = null;
let toStation = null;
let previousSelectedStations = [null, null];
let stationData = null;
let unitPrice = 0;
let totalPrice = 0;

export default function BuyTickets({ navigation }) {
  const [loginError, setLoginError] = useState(null);
  const [allStations, setAllStations] = useState([]);
  const [price, setPrice] = useState(0);

  const formikRef = useRef(null);

  // Fetch stations
  useEffect(() => {
    request('get', '/public/stations')
      .then((res) => {
        stationData = res.data;
        setAllStations(res.data.map((stationObj) => stationObj.name));
      })
      .catch((e) => setLoginError('Error Loading station data!'));
  }, []);

  // Fetch ticket prices
  useEffect(() => {
    const updatePriceInterval = setInterval(() => {
      (async () => {
        try {
          if (
            fromStation !== previousSelectedStations[0] ||
            toStation !== previousSelectedStations[1]
          ) {
            previousSelectedStations = [fromStation, toStation];
            const from = stationData.filter(
              (stationObj) => stationObj.name === fromStation
            )[0].stationId;
            const to = stationData.filter(
              (stationObj) => stationObj.name === toStation
            )[0].stationId;

            try {
              const res = await request(
                'post',
                `/public/ticket-prices/NORMAL/${formikRef.current.values.ticketClass}`,
                { from, to }
              );
              unitPrice = Number.parseFloat(res.data.price);
            } catch (e) {
              console.log('Request Error: ', e);
            }
          }
          if (formikRef?.current?.values) {
            totalPrice = formikRef.current?.values.return
              ? unitPrice * parseInt(formikRef.current?.values.noOfTickets) * 2
              : unitPrice * parseInt(formikRef.current?.values.noOfTickets);
            setPrice(totalPrice);
          }
        } catch (e) {
          console.log('error! in train search filter');
        }
      })();
    }, 500);
    return () => clearInterval(updatePriceInterval);
  }, []);

  async function handleSubmit(values, { setSubmitting }) {
    if (fromStation === null || toStation === null) {
      setLoginError('Enter stations to search!');
      return;
    }
    if (fromStation === toStation) {
      setLoginError('Enter valid station!');
      return;
    }

    setLoginError(null);

    const from = stationData?.filter(
      (stationObj) => stationObj?.name === fromStation
    )[0].stationId;
    const to = stationData?.filter(
      (stationObj) => stationObj?.name === toStation
    )[0].stationId;

    const ticketData = {
      startStationId: from,
      destinationStationId: to,
      price: values.return ? unitPrice * 2 : unitPrice,
      email: values.email,
      phoneNumber: values.phoneNumber,
      quantity: Number.parseInt(values.noOfTickets),
      returnStatus: values.return,
    };
    // console.log('Ticket Data: ', ticketData);

    navigation.navigate('TicketPayment', { ticketData, totalPrice });
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
        <KeyboardAvoidingView>
          <Text className="text-3xl font-normal text-center mt-10 mb-4 text-slate-700">
            Buy normal tickets
          </Text>
          <Text className="text-base font-normal text-left ml-4 mt-4 mb-0 text-slate-700">
            Enter starting and destination stations,
          </Text>
          <View className="flex-1 px-8">
            <Formik
              innerRef={formikRef}
              validationSchema={yup.object().shape({
                email: yup.string().email('Please enter valid email'),
                noOfTickets: yup
                  .number()
                  .required('Required!')
                  .test(
                    'Is positive?',
                    'The number must be between 1 and 10',
                    (value) => value > 0 && value < 11
                  ),
                phoneNumber: yup
                  .string()
                  .matches(
                    /\+[0-9]{1,4}\-[0-9]{9}/,
                    'Phone number format: +{country code}-{number}'
                  ),
              })}
              initialValues={{
                ticketClass: 'SECOND_CLASS',
                noOfTickets: '1',
                return: false,
                email: '',
                phoneNumber: '',
              }}
              onSubmit={handleSubmit}
            >
              {(formik) => (
                <>
                  <Autocomplete
                    placeholder="Start"
                    onSelectItem={(item) => {
                      fromStation = item;
                    }}
                    itemsArray={allStations}
                  />
                  <Autocomplete
                    placeholder="Destination"
                    onSelectItem={(item) => {
                      toStation = item;
                    }}
                    itemsArray={allStations}
                  />

                  <Text className="text-base mt-6 mb-1">Select Class</Text>
                  <RadioButton.Group
                    onValueChange={(newValue) =>
                      formik.setFieldValue('ticketClass', newValue)
                    }
                    value={formik.values.ticketClass}
                  >
                    <View className="flex flex-row">
                      <View className="flex flex-row items-center mr-8">
                        <RadioButton
                          value={'SECOND_CLASS'}
                          color="#1b1f2f"
                          status="checked"
                        />
                        <Text>Second Class</Text>
                      </View>
                      <View className="flex flex-row items-center">
                        <RadioButton value={'THIRD_CLASS'} color="#1b1f2f" />
                        <Text>Third Class</Text>
                      </View>
                    </View>
                  </RadioButton.Group>

                  <TextInput
                    className="mt-2"
                    label="Number of tickets"
                    onChangeText={formik.handleChange('noOfTickets')}
                    value={formik.values.noOfTickets}
                    onBlur={formik.handleBlur('noOfTickets')}
                    errorText={
                      formik.touched.noOfTickets
                        ? formik.errors.noOfTickets
                        : null
                    }
                    keyboardType="numeric"
                  />

                  <View className="flex-1 flex-row items-center mt-2">
                    <Text className="text-base">Return</Text>
                    <View className="pl-5">
                      <Switch
                        color={theme.colors.primary}
                        value={formik.values.return}
                        onValueChange={() => {
                          formik.setFieldValue('return', !formik.values.return);
                        }}
                      />
                    </View>
                  </View>

                  <View className="flex-1 flex-row items-center">
                    <Text className="text-base">Price</Text>
                    <View className="pl-5">
                      <TextInput
                        value={`LKR ${price.toFixed(2)}`}
                        errorText=""
                        disabled
                      />
                    </View>
                  </View>

                  <TextInput
                    label="Email"
                    placeholder="Email (optional)"
                    onChangeText={formik.handleChange('email')}
                    onBlur={formik.handleBlur('email')}
                    value={formik.values.email}
                    keyboardType="email-address"
                    errorText={
                      formik.touched.email ? formik.errors.email : null
                    }
                  />

                  <TextInput
                    label="Phone Number"
                    placeholder="Phone Number (optional)"
                    onChangeText={formik.handleChange('phoneNumber')}
                    onBlur={formik.handleBlur('phoneNumber')}
                    value={formik.values.phoneNumber}
                    errorText={
                      formik.touched.phoneNumber
                        ? formik.errors.phoneNumber
                        : null
                    }
                  />

                  <Button
                    mode="contained"
                    className="mt-6 mb-8"
                    onPress={formik.handleSubmit}
                    disabled={!formik.isValid || formik.isSubmitting}
                    loading={formik.isSubmitting}
                  >
                    Proceed to pay
                  </Button>
                </>
              )}
            </Formik>
          </View>
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
    </>
  );
}
