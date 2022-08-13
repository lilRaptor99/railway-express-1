import axios from 'axios';
const { AsyncStorage } = require('react-native');

const baseUrl = 'http://192.168.8.150:8080/api';

export default async function request(method = 'get', endpoint, data) {
  let item;
  if (typeof window === 'undefined') {
    item = await AsyncStorage.getItem('currentUser');
  } else {
    item = window?.localStorage?.getItem('currentUser');
  }

  const currentUser = item ? JSON.parse(item) : null;

  try {
    return await axios.request({
      method,
      baseURL: baseUrl,
      url: endpoint,
      headers: { Authorization: `Token ${(await currentUser)?.token}` },
      data,
    });
  } catch (e) {
    console.error('Request error: ', e);
    throw e;
  }
}
