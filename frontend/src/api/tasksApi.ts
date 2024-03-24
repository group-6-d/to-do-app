import checkResponse from './checkResponse';
import TaskCard from '../models/TaskCard';

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

export const editTask = (data: TaskCard, token: string) => {
  return fetch(`${BASE_URL}/v1/task/${data.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({data}),
  }).then(checkResponse);
};
