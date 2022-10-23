import { useState } from 'react';
import { AsyncStorage } from 'react-native';

export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(async () => {
    try {
      let item;
      if (typeof window === 'undefined') {
        item = await AsyncStorage.getItem(key);
      } else {
        item = window?.localStorage?.getItem(key);
      }

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  async function setValue(value) {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      const jsonValueToStore = JSON.stringify(valueToStore);
      if (typeof window === 'undefined') {
        await AsyncStorage.setItem(key, jsonValueToStore);
      } else {
        window?.localStorage?.setItem(key, jsonValueToStore);
      }
    } catch (error) {
      console.error(error);
    }
  }
  return [storedValue, setValue];
}
