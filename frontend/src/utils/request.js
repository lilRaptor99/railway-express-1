import axios from 'axios';
const baseUrl = process.env.REACT_APP_BASE_URL;

export default async function request(method = 'get', endpoint, data = null) {
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

export async function postFormData(endpoint, formData) {
  const item = window?.localStorage?.getItem('currentUser');
  const currentUser = item ? JSON.parse(item) : null;
  return await axios.post(`${baseUrl}${endpoint}`, formData, {
    headers: {
      Authorization: `Token ${(await currentUser)?.token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
}
