const request = require('supertest');
const { app } = require('./index');

describe('POST /authenticate', () => {
  it('should respond with a 200 status code and return user data on successful authentication', async () => {
    const res = await request(app)
      .post('/authenticate')
      .send({ username: 'testuser' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    // add your assertion here to check if the response body matches what you expect
    expect(res.body).toEqual({ /* expected response body */ });
  });

  it('should respond with an error status code and message on unsuccessful authentication', async () => {
    const res = await request(app)
      .post('/authenticate')
      .send({ username: '' }) // invalid username
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);

    // add your assertion here to check if the response body matches what you expect
    expect(res.body).toEqual({ /* expected error response body */ });
  });
});
