const request = require('supertest');
const app = require('../server');

describe('Post Endpoints', () => {
/*  it('should create a new post', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        email: 'hieu123@gmail.com',
        password: '12345'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('user');
  });*/
  it('should login success ', async() =>{
    const res = await request(app)
      .post('/users/login')
      .send({
         email: 'hieu123@gmail.com',
         password: '12345'
      });
      expect(res.statusCode).toEqual(201)
      expect(res.body).toHaveProperty('token')
  })
})