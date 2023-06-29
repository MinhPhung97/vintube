import axios from 'axios';
import { localService } from './localService';

const BASE_URL = 'https://vintube-server.onrender.com/api';

const configHeader = () => {
  return {
    Authorization: localService.get(),
  };
};

export const https = axios.create({
  baseURL: BASE_URL,
  headers: configHeader(),
});
