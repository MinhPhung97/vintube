import axios from 'axios';
import { localService } from './localService';

const BASE_URL = 'http://localhost:8080/api/';

const configHeader = () => {
  return {
    Authorization: localService.get(),
  };
};

export const https = axios.create({
  baseURL: BASE_URL,
  headers: configHeader(),
});
