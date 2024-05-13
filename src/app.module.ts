import { Module } from '@nestjs/common';
import { SongModule } from './song/song.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SongSchema } from './song/entities/song.entity';
import { SongService } from './song/song.service';
import { SongController } from './song/song.controller';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
@Module({
  
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    MongooseModule.forRoot(uri, {dbName: 'songdb'}),
    MongooseModule.forFeature([{ name: 'Song', schema: SongSchema }]),
  ],
  controllers: [SongController],
  providers: [SongService],
})
export class AppModule {}
