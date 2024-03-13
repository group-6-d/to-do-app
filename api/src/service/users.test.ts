import { register } from './users';

jest.mock('../db/user', () => ({
  ...jest.requireActual('../db/user'),
  register: jest.fn().mockReturnValue({
    firstName: 'First ',
    lastName: 'Born',
    email: 'first.born@hospital.se',
    password: '12345678',
  }),
}));

describe('Test service/users', () => {
  test('register', async () => {
    const user = {
      firstName: 'First ',
      lastName: 'Born',
      email: 'first.born@hospital.se',
      password: '12345678',
    };
    const res = await register(user);
    expect(res).toEqual(user);
  });
});
