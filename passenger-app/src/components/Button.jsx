import React from 'react';
import { Touchable } from 'react-native';

export default function Button({ children }) {
  return (
    <Touchable>
      <Text>{children}</Text>
    </Touchable>
  );
}
