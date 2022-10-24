import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Button, RadioButton, Snackbar } from 'react-native-paper';
import { theme } from '../../../reactNativePaperTheme';
import request from '../../utils/request';

export default function TicketChecker({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(true);

  const [validateState, setValidateState] = useState('validate');

  const [loginError, setLoginError] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(null);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  function handleBarCodeScanned({ type, data }) {
    setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    validateTicket(data);
  }

  async function validateTicket(ticketId) {
    setLoginSuccess(null);
    try {
      await request('POST', `/ticket-checker/${validateState}`, { ticketId });
      if (validateState === 'validate') {
        setLoginSuccess('Ticket is valid');
      } else {
        setLoginSuccess('Ticket discredited successfully');
      }
    } catch (e) {
      setLoginError(e.response.data.error);
    }
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <>
      <View className="flex-1 items-center">
        <View className="flex-1 items-center w-full max-h-96 mt-4">
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        </View>

        <Button
          mode="contained"
          className="mt-4"
          onPress={() => setScanned(false)}
          loading={!scanned}
          disabled={!scanned}
        >
          {scanned ? 'Scan now' : 'Scanning'}
        </Button>

        <View className="mt-3">
          <Text className="text-base mt-6 mb-1">Select action,</Text>
          <RadioButton.Group
            onValueChange={(newValue) => setValidateState(newValue)}
            value={validateState}
          >
            <View className="flex flex-row">
              <View className="flex flex-row items-center mr-8">
                <RadioButton
                  value={'validate'}
                  color="#1b1f2f"
                  status="checked"
                />
                <Text>Validate Ticket</Text>
              </View>
              <View className="flex flex-row items-center">
                <RadioButton value={'discredit'} color="#1b1f2f" />
                <Text>Discredit Ticket</Text>
              </View>
            </View>
          </RadioButton.Group>
        </View>
      </View>
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
        visible={Boolean(loginSuccess)}
        onDismiss={() => {}}
        action={{
          label: 'Close',
          onPress: () => setLoginSuccess(null),
        }}
        style={{ backgroundColor: theme.colors.success }}
      >
        {loginSuccess}
      </Snackbar>
    </>
  );
}
