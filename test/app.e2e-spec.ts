import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import * as dotenv from 'dotenv';
dotenv.config();

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ getAddressesBalance should return 201 when payload is not empty', () => {
    return request(app.getHttpServer())
      .post('/address/balance')
      .send({
        addresses: [
          '0xq1912fee45d61c87cc5ea59dae31190fffff23a2',
          '0x31c92d96ab8ce701e9b684078457121e7101b095',
        ],
      })
      .expect(201);
  });

  it('/ getAddressesBalance should not get error when addresses array is empty', () => {
    return request(app.getHttpServer())
      .post('/address/balance')
      .send({
        addresses: [],
      })
      .expect(201);
  });

  it('/ getAddressesBalance should return bad request when addresses array is no defined', () => {
    return request(app.getHttpServer())
      .post('/address/balance')
      .send({
        addressess: [],
      })
      .expect(400);
  });
});
