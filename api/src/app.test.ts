import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import app from './app';

jest.mock('./service/users', () => ({
  ...jest.requireActual('./service/users'),
  register: jest.fn().mockImplementation((user) => {
    const { firstName } = user;
    if (firstName === 'fire') {
      return {};
    }
    return { result: user };
  }),
}));

describe('Test app.ts', () => {
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
        ? await request(app).post('/v1/users').send(body())
        : await request(app).post('/v1/users');
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
    const res = await request(app).post('/v1/users').send(req);
    expect(res.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
  });

  test('Create user `/v1/users` success', async () => {
    const req = {
      firstName: 'First',
      lastName: 'Born',
      email: 'first.born@hospital.se',
      password: '12345678',
    };
    const res = await request(app).post('/v1/users').send(req);
    expect(res.status).toEqual(StatusCodes.CREATED);
  });
});
