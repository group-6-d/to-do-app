import { StatusCodes } from 'http-status-codes';
import { login, register } from './users';

jest.mock('argon2', () => ({
  ...jest.requireActual('argon2'),
  verify: jest.fn().mockImplementation((digest, password) => {
    if (password === '12345678') {
      return false;
    }
    return true;
  }),
}));

jest.mock('jsonwebtoken', () => ({
  ...jest.requireActual('jsonwebtoken'),

  sign: jest.fn().mockReturnValue('mocked.jwt.token'),
}));

jest.mock('../db/user', () => ({
  ...jest.requireActual('../db/user'),
  register: jest.fn().mockReturnValue({
    firstName: 'First ',
    lastName: 'Born',
    email: 'first.born@hospital.se',
    password: '12345678',
  }),
  getUser: jest.fn().mockImplementation(({ email, password }) => {
    if (email === 'return_empty_user') {
      return {};
    }
    if (email === 'return_no_password_user') {
      return { result: {} };
    }
    return {
      result: {
        firstName: 'First ',
        lastName: 'Born',
        email: 'first.born@hospital.se',
        password: '12345678',
      },
    };
  }),
}));

describe('Test service/users', () => {
  test('register()', async () => {
    const user = {
      firstName: 'First ',
      lastName: 'Born',
      email: 'first.born@hospital.se',
      password: '12345678',
    };
    const res = await register(user);

    expect(res).toEqual(user);
  });

  test('login() no such user', async () => {
    const email = 'return_empty_user';
    const req = { email, password: '12345678' };
    const res = await login(req);

    expect(res.code).toBe(StatusCodes.BAD_REQUEST);
    expect(res.error).toBe(`User ${email} doesn't exit.`);
  });

  test('login() has no encrypted password', async () => {
    const email = 'return_no_password_user';
    const req = { email, password: '12345678' };
    const res = await login(req);

    expect(res.code).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.error).toBe(`General error`);
  });

  test('login() password not correct', async () => {
    const email = 'first.born@hospital.se';
    const req = { email, password: '12345678' };
    const res = await login(req);

    expect(res.code).toBe(StatusCodes.BAD_REQUEST);
    expect(res.error).toBe(`Password wrong`);
  });

  test('login() success', async () => {
    const email = 'first.born@hospital.se';
    const req = { email, password: '12345679' };
    const res = await login(req);

    expect(res.code).toBe(StatusCodes.OK);
    expect(res.token).toBe('mocked.jwt.token');
  });
});
