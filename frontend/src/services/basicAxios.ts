import axios from 'axios';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function readCSRFToken() {
  const csrfToken = document.cookie
    ?.split('; ')
    ?.find((row) => row.startsWith('csrftoken='))
    ?.split('=')[1];
  return csrfToken;
}

export const basicAxios = async (endpoint: string, options: any) => {
  const csrftoken = readCSRFToken();
  const headers = options?.headers || {
    'Content-Type': 'application/json',
  };
  if (csrftoken)
    headers['X-CSRFTOKEN'] = csrftoken;
  const res = await axios({
    baseURL: BACKEND_URL,
    url: endpoint,
    method: 'GET',
    withCredentials: true,
    headers: headers,
    ...options,
  });

  return res;
};