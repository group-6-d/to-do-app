import { API_URL } from '../utils/utils';
import checkResponse from './checkResponse';

export const BASE_URL = API_URL;

export type Category = {
  id: number;
  name: string;
  color: string;
  icon: string;
  total_tasks: number;
};

export const fetchAll = (token: string): Promise<Category[]> => {
  return fetch(`${BASE_URL}/v1/categories`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};
