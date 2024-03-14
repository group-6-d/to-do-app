import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import bootstrap from './express';

jest.mock('./service/users', () => ({
  ...jest.requireActual('./service/users'),

  register: jest.fn().mockImplementation((user) => {
    const { firstName } = user;
    if (firstName === 'fire') {
      return {};
    }
    return { result: user };
  }),

  login: jest.fn().mockImplementation(({ password }) => {
    if (password === 'return_error') {
      return { code: StatusCodes.BAD_REQUEST, error: 'BAD BOY' };
    }
    return { code: StatusCodes.OK, token: 'here.you.go' };
  }),
}));

describe('Test express.ts', () => {
  [
    {
      name: 'Create user `/v1/users` missing firstName',
      code: StatusCodes.BAD_REQUEST,
      err: { error: 'Missing `firstName`' },
    },
    {
      name: 'Create user `/v1/users` missing lastName',
      code: StatusCodes.BAD_REQUEST,
      err: { error: 'Missing `lastName`' },
      body: () => ({
        firstName: 'First',
      }),
    },
    {
      name: 'Create user `/v1/users` missing email',
      code: StatusCodes.BAD_REQUEST,
      err: { error: 'Missing `email`' },
      body: () => ({
        firstName: 'First ',
        lastName: 'Born',
      }),
    },
    {
      name: 'Create user `/v1/users` missing password',
      code: StatusCodes.BAD_REQUEST,
      err: { error: 'Missing `password`' },
      body: () => ({
        firstName: 'First ',
        lastName: 'Born',
        email: 'first.born@hospital.se',
      }),
    },
    {
      name: 'Create user `/v1/users` password length error',
      code: StatusCodes.BAD_REQUEST,
      err: { error: 'Password length at least 8' },
      body: () => ({
        firstName: 'First ',
        lastName: 'Born',
        email: 'first.born@hospital.se',
        password: '1234567',
      }),
    },
  ].map(({ name, code, err, body }) => {
    test(name, async () => {
      const res = body
        ? await request(bootstrap).post('/v1/users').send(body())
        : await request(bootstrap).post('/v1/users');
      expect(res.status).toEqual(code);
      expect(res.body).toEqual(err);
    });
  });

  test('Create user `/v1/users` but Server Error', async () => {
    const req = {
      firstName: 'fire',
      lastName: 'Born',
      email: 'first.born@hospital.se',
      password: '12345678',
    };
    const res = await request(bootstrap).post('/v1/users').send(req);
    expect(res.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
  });

  test('Create user `/v1/users` success', async () => {
    const req = {
      firstName: 'First',
      lastName: 'Born',
      email: 'first.born@hospital.se',
      password: '12345678',
    };
    const res = await request(bootstrap).post('/v1/users').send(req);
    expect(res.status).toEqual(StatusCodes.CREATED);
  });

  [
    {
      name: 'User login `/v1/users/login` missing email',
      code: StatusCodes.BAD_REQUEST,
      err: { error: 'Missing `email`' },
    },
    {
      name: 'User login `/v1/users/login` missing password',
      code: StatusCodes.BAD_REQUEST,
      err: { error: 'Missing `password`' },
      body: () => ({
        email: 'first.born@hospital.se',
      }),
    },
  ].forEach(({ name, code, err, body }) => {
    test(name, async () => {
      const res = body
        ? await request(bootstrap).post('/v1/users/login').send(body())
        : await request(bootstrap).post('/v1/users/login');
      expect(res.status).toEqual(code);
      expect(res.body).toEqual(err);
    });
  });

  test('User login `/v1/users/login` no token', async () => {
    const req = {
      email: 'first.born@hospital.se',
      password: 'return_error',
    };

    const res = await request(bootstrap).post('/v1/users/login').send(req);
    expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body.error).toBe('BAD BOY');
  });
  test('User login `/v1/users/login` success', async () => {
    const req = {
      email: 'first.born@hospital.se',
      password: '12345678',
    };

    const res = await request(bootstrap).post('/v1/users/login').send(req);
    expect(res.status).toBe(StatusCodes.OK);
    expect(res.body.token).toBe('here.you.go');
  });
});
