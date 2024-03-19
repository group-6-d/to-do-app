import checkResponse from './checkResponse';

export const BASE_URL = 'http://localhost:5174';

export const fetchAll = (token: string) => {
  return fetch(`${BASE_URL}/v1/categories`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};
