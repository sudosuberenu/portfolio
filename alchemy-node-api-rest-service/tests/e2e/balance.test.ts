import request from 'supertest';

const baseUrl = 'http://localhost:3000/';

describe('/api/v1/address', () => {
	it('when request does not include apikey then return a 401 status code', async () => {
		await request(baseUrl)
			.get('api/v1/address/0xfe0673ff56b0aaa243ecd56deb0d5c41650143fe/balance')
      .expect(401)
      .expect('Content-Type', 'application/json; charset=utf-8')
	});

  it('when request does include apikey then return a 200 status code with the balance', async () => {
		await request(baseUrl)
			.get('api/v1/address/0xfe0673ff56b0aaa243ecd56deb0d5c41650143fe/balance')
      .set('x-api-key', '1234')
      .expect(200)
      .then(response => {
        expect(response.text).toBe("{\"message\":\"success\",\"data\":{\"DAIbalance\":\"0\"}}");
      })
	});

  it('when request has bad address then return a 400 status code with error', async () => {
		await request(baseUrl)
			.get('api/v1/address/0xfe0673ff56b0aaa243ecd56deb0d5c416501/balance')
      .set('x-api-key', '1234')
      .expect(400)
      .then(response => {
        expect(response.text).toBe("{\"message\":\"Bad Parameters\"}");
      })
	});
})