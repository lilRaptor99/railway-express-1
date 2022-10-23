import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Button, RadioButton } from 'react-native-paper';

export default function TicketChecker({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(true);

  const [validateState, setValidateState] = useState('VALIDATE');

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
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
                value={'VALIDATE'}
                color="#1b1f2f"
                status="checked"
              />
              <Text>Validate Ticket</Text>
            </View>
            <View className="flex flex-row items-center">
              <RadioButton value={'DISCREDIT'} color="#1b1f2f" />
              <Text>Discredit Ticket</Text>
            </View>
          </View>
        </RadioButton.Group>
      </View>
    </View>
  );
}
