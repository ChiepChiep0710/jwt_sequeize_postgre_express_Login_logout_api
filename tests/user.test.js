const request = require('supertest');
const app = require('../server');
const email = 'hieu@gmail.com';
const password = '12345';

describe('Post Endpoints', () => {
	var user = {};
	/* it('should create a new post', async () => {
    const res = await request(app).post('/users').send({
      email: email,
      password: password,
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('user');
  });*/

	it('should login success ', async () => {
		const res = await request(app).post('/users/login').send({
			email: email,
			password: password,
		});
		expect(res.statusCode).toEqual(201);
		expect(res.body).toHaveProperty('token');
		user = res.body.user;
	});
	it('should get info of user', async () => {
		const res = await request(app)
			.get('/users/me')
			.set('Authorization', 'Bearer ' + user.token);
		expect(res.statusCode).toEqual(200);
		expect(res.body).toEqual(user);
	});
	it('should logout', async () => {
		const res = await request(app)
			.post('/users/me/logout')
			.set('Authorization', 'Bearer ' + user.token);
		expect(res.statusCode).toEqual(200);
	});
	it('should not get user', async () => {
		const res = await request(app)
			.get('/users/me')
			.set('Authorization', 'Bearer ' + user.token);
		expect(res.statusCode).toEqual(401);
	});
});
