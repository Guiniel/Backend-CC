import { Module } from '@nestjs/common';
import { SongModule } from './song/song.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SongSchema } from './song/entities/song.entity';
import { SongService } from './song/song.service';
import { SongController } from './song/song.controller';

@Module({
  
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    MongooseModule.forRoot(process.env.MONGO_URL, {dbName: 'songdb'}),
    MongooseModule.forFeature([{ name: 'Song', schema: SongSchema }]),
  ],
  controllers: [SongController],
  providers: [SongService],
})
export class AppModule {}
