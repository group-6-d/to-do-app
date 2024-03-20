import checkResponse from './checkResponse';

export const BASE_URL = 'http://localhost:5174';

export const fetchAll = (token: string) => {
  const response = fetch(`${BASE_URL}/v1/task`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
  return response;
};
