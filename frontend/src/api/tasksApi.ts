import { API_URL } from '../utils/utils';
import checkResponse from './checkResponse';
import TaskCard from '../models/TaskCard';

export const BASE_URL = API_URL;

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
    body: JSON.stringify({ data }),
  }).then(checkResponse);
};

export const deleteTask = async (id: number, token: string) => {
  const response = await fetch(`${BASE_URL}/v1/task/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);

  return response;
};

export const createNewTask = (data: TaskCard, token: string) => {
  return fetch(`${BASE_URL}/v1/task`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ data }),
  }).then(checkResponse);
};
