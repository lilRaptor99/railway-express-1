import axios from 'axios';
const baseUrl = process.env.REACT_APP_BASE_URL;

export default async function request(method, endpoint, data = null) {
  const item = window?.localStorage?.getItem('currentUser');

  const currentUser = item ? JSON.parse(item) : null;

  console.log('Base url: ', baseUrl);

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
