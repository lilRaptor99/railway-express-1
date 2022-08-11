const React = require('react');
const { View, Text } = require('react-native');
const { Button } = require('react-native-paper');

export default function ForgotPassword({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Forgot Password</Text>
      <Button mode="contained" onPress={() => console.log('ForgotPassword...')}>
        Reset
      </Button>
    </View>
  );
}
