import request from 'supertest';

import createConnection from '@shared/infra/typeorm/index';

import app from '@shared/infra/http/server';

import { Connection, getConnection } from 'typeorm';

let connection: Connection;

describe('Create user', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.query('DROP TABLE IF EXISTS users');
    await connection.query('DROP TABLE IF EXISTS user_tokens');
    await connection.query('DROP TABLE IF EXISTS migrations');

    await connection.runMigrations();
  });

  beforeEach(async () => {
    await connection.query('DELETE FROM users');
  });

  afterAll(async () => {
    const mainConnection = getConnection();
    await connection.close();
    await mainConnection.close();
  });

  it('should be able to create an new user', async () => {
    const response = await request(app).post('/users').send({
      account_name: 'teste',
      name: 'teste',
      email: 'teste@teste.com',
      password: 'teste',
    });

    console.log(response.body);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('id');
  });
});
