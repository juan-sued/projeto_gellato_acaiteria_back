import { faker } from '@faker-js/faker';
import httpStatus from 'http-status';
import supertest from 'supertest';
import { cleanDb } from '../helpers';

import app, { init } from '@/app';

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe('POST /users', () => {
  it('should respond with status 400 when body is not given', async () => {
    const response = await server.post('/users');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 400 when body is not valid', async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    const response = await server.post('/users').send(invalidBody);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when body is valid', () => {
    const generateValidBody = () => ({
      email: faker.internet.email(),
      password: faker.internet.password(6),
    });
  });
});
