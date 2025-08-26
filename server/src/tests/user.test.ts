import request from 'supertest';
import app from '../app';

describe('User API', () => {
  it('should create a user with valid input', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ name: 'Test User', email: 'test@example.com', password: 'password123' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.name).toBe('Test User');
  });

  it('should fail with invalid email', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ name: 'Test User', email: 'not-an-email', password: 'password123' });
    expect(res.statusCode).toBe(400);
  });
});
