import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/health (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/health')
      .expect(200)
      .expect((res) => {
        expect(res.body.data.status).toBe('ok');
      });
  });

  describe('/api/accounts', () => {
    it('POST - deve criar uma conta', () => {
      return request(app.getHttpServer())
        .post('/api/accounts')
        .send({ holder: 'João Silva', number: '001234-5' })
        .expect(201);
    });

    it('GET - deve listar contas', () => {
      return request(app.getHttpServer()).get('/api/accounts').expect(200);
    });

    it('POST - deve retornar 400 com dados inválidos', () => {
      return request(app.getHttpServer())
        .post('/api/accounts')
        .send({ holder: '', number: '' })
        .expect(400);
    });
  });
});
