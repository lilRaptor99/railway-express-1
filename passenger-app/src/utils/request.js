import axios from 'axios';
const { AsyncStorage } = require('react-native');

const baseUrl = 'http://192.168.8.150:8080/api';

let userToken = '';

export function setUserToken(token) {
  userToken = token;
}

export default async function request(method = 'get', endpoint, data) {
  try {
    return await axios.request({
      method,
      baseURL: baseUrl,
      url: endpoint,
      headers: { Authorization: `Token ${userToken}` },
      data,
    });
  } catch (e) {
    console.error('Request error: ', e);
    throw e;
  }
}
