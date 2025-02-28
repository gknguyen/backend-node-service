import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('HealthModule (e2e)', () => {
  let app: INestApplication;

  beforeAll(() => {
    app = (global as any).__APP;
  });

  describe('[GET] /api/health-check', () => {
    it('should_call_successfully', async () => {
      const res = await request(app.getHttpServer()).get('/api/health-check');
      expect(res.status).toEqual(200);
    });
  });
});
