import omit from 'lodash/fp/omit';
import { getUser, register } from './user';

const user = {
  firstName: 'First ',
  lastName: 'Born',
  email: 'first.born@hospital.se',
  password: '12345678',
};

jest.mock('../client/db', () => ({
  ...jest.requireActual('../client/db'),
  getDBPool: jest.fn().mockReturnValue({
    query: jest.fn().mockImplementation((sql) => {
      if (sql.includes('fire')) throw new Error('Call 112!!!');
      return { rows: [user] };
    }),
  }),
}));

describe('Test db/user', () => {
  test('register() error', async () => {
    const userWithFire = {
      ...user,
      password: 'fire',
    };
    const result = await register(userWithFire);
    expect(result).toEqual({});
  });

  test('register() successfully', async () => {
    const result = await register(user);
    expect(result).toEqual({ result: omit(['password'])(user) });
  });

  test('getUser() error', async () => {
    const email = 'fire@hosipital.se';
    const result = await getUser({ email });
    expect(result).toEqual({});
  });

  test('getUser() successfully', async () => {
    const email = 'first.born@hosipital.se';
    const result = await getUser({ email });
    expect(result).toEqual({ result: user });
  });
});
