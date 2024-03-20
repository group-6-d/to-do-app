import { API_URL } from '../utils/utils';
import checkResponse from './checkResponse';

export const BASE_URL = API_URL;

export const fetchAll = (token: string) => {
  console.log(import.meta.env);
  return fetch(`${BASE_URL}/v1/categories`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};
