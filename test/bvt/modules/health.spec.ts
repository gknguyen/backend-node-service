import * as request from 'supertest';

describe('HealthModule (e2e)', () => {
  describe('[GET] /api/health-check', () => {
    it('should_call_successfully', async () => {
      const res = await request('http://localhost:4200').get('/api/health-check');
      expect(res.status).toEqual(200);
    });
  });
});
