import { Test } from '@nestjs/testing';
import { SongController } from '../src/song/song.controller';
import { getModelToken } from '@nestjs/mongoose'; // Si usas Mongoose
import { SongService } from '../src/song/song.service'
import { ISong } from 'src/song/interface/song.interface';

describe('SongController', () => {
  let songController: SongController;
  let songService: SongService;
  
  const songModelMock = {
    addSong: jest.fn(),
    updateSong: jest.fn(),
    getAllSongs: jest.fn(),
    getSong: jest.fn(),
    getSongName: jest.fn(),
    deleteSong: jest.fn(),
  };
  
  
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [SongController],
        providers: [SongService,
            {
                provide: getModelToken('Song'),
                useValue: songModelMock
            }
        ],
      }).compile();

    songService = moduleRef.get<SongService>(SongService);
    songController = moduleRef.get<SongController>(SongController);
  });

  describe('findAll', () => {
    it('should return an array of songs', async () => {
      const result: Partial<ISong>[] =[
        {name:"dd", artist: "ddd", genre: "bachata", duration: 15}
      ]
      jest.spyOn(songService, 'getAllSongs').mockResolvedValue(result as ISong[]);

      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      await songController.getSongs(response as any);
      

      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledWith({
        message: 'All song data successfully obtained',
        songData: result,
      });
    });
  });
});