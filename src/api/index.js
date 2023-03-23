import axios from 'axios';

export const baseUrl = 'https://api.punkapi.com/v2/';
const instance = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
});

const handleError = error => {
  if (error.response) {
    return Promise.reject(error.response.data);
  }
  return Promise.reject(error.message);
};

const handleResponse = res => {
  return res;
};

instance.interceptors.response.use(handleResponse, handleError);
export default instance;
