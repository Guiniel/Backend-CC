import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { SongModule } from '../src/song/song.module';
import { SongService } from '../src/song/song.service';
import { INestApplication } from '@nestjs/common';

describe('Songs', () => {
  let app: INestApplication;
  let songService = { getAllSongs: () => [{name:"dd", artist: "ddd", genre: "bachata", duration: 15}] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [SongModule],
    })
      .overrideProvider(SongService)
      .useValue(songService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET songs`, () => {
    return request(app.getHttpServer())
      .get('/song')
      .expect(200)
      .expect({
        message: 'All song data successfully obtained',
        songData: songService.getAllSongs(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});