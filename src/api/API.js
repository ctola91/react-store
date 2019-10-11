import axios from 'axios';
import { URL, PORT } from '../shared/utils/constants';

const api = axios.create({
  baseURL: `${URL}:${PORT}`,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default api;
