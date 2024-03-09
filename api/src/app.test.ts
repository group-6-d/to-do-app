import request from 'supertest';
import app from './app';

describe('Test app.ts', () => {
  test('GET /', async () => {
    const res = await request(app).get('/');
    const expected = { hello: 'Express + TypeScript Server' };

    expect(res.status).toEqual(200);
    expect(res.body).toEqual(expected);
  });
});
