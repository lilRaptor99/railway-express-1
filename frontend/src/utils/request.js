import axios from 'axios';

const baseUrl = 'http://localhost:8080/api';

export default async function request(method = 'get', endpoint, data) {
  const item = window?.localStorage?.getItem('currentUser');

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
