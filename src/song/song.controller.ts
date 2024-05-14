/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Put } from '@nestjs/common';
import { SongService } from './song.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';

@Controller('song')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Post()
  async createSong(@Res() response, @Body() createSongDto: CreateSongDto) {
    try {
      const newSong = await this.songService.addSong(createSongDto);
      return response.status(201).json({
        message: 'Song has been created successfully',
        newSong,
      });
    } catch (err) {
      return response.status(400).json({
        statusCode: 400,
        message: 'Error: Song not created!',
        error: 'Bad Request',
      });
    }
  }

  @Get('seed')
  async poblateDatabase(@Res() response) {
    try {
      const songsToAdd = [
        { name: 'Cancion 1', artist: 'Artista 1', duration: 100, genre: 'Pop' },
        { name: 'Cancion 2', artist: 'Artista 2', duration: 200, genre: 'Rock' },
        { name: 'Cancion 3', artist: 'Artista 3', duration: 300, genre: 'R&B' },
        { name: 'Cancion 4', artist: 'Artista 4', duration: 5, genre: 'Hip Hop' },
        { name: 'Cancion 5', artist: 'Artista 5', duration: 30, genre: 'Dance' },
        { name: 'Cancion 6', artist: 'Artista 6', duration: 300, genre: 'Electronica' },
        { name: 'Cancion 7', artist: 'Artista 7', duration: 300, genre: 'Salsa' },
        { name: 'Cancion 8', artist: 'Artista 8', duration: 300, genre: 'Latino' },
        { name: 'Cancion 9', artist: 'Artista 9', duration: 300, genre: 'Mariachi' },
        { name: 'Cancion 10', artist: 'Artista 10', duration: 300, genre: 'Folk' }
      ];
  
      const newSongs = await Promise.all(songsToAdd.map(song => this.songService.addSong(song)));
  
      return response.status(201).json({
        message: 'Songs have been added to the database successfully',
        newSongs,
      });
    } catch (err) {
      return response.status(400).json({
        statusCode: 400,
        message: 'Error: Songs not added to the database!',
        error: 'Bad Request',
      });
    }
  }

  @Get()
  async getSongs(@Res() response) {
    try {
      const songData = await this.songService.getAllSongs();
      return response.status(200).json({
        message: 'All song data successfully obtained',
        songData,
      });
    } catch (err) {
      return response.status(400).json(err.response);
    }
  }

  @Get(':id')
  async getSong(@Res() response, @Param('id') id: string) {
    try {
      const song = await this.songService.getSong(id);
      console.log(song)
      return response.status(200).json({
        message: 'Song successfully obtained',
        song,
      });
    } catch (err) {
      return response.status(400).json(err.response)
  }
}
@Get('search/:name')
async getSongName(@Res() response, @Param('name') name: string) {
  try {
    console.log(name)
    const song = await this.songService.getSongName(name);
    console.log(song)
    return response.status(200).json(song);
  } catch (err) {
    return response.status(400).json(err.response);
  }
}

  @Patch(':id')
  async updateSong(@Res() response, @Param('id') id: string, @Body() updateSongDto: UpdateSongDto) {
    try {
      const updatedSong = await this.songService.updateSong(id, updateSongDto);
      return response.status(200).json({
        message: 'Song has been successfully updated',
        updatedSong,
      })
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Delete(':id')
  async removeSong(@Res() response, @Param('id') id: string) {
    try {
      const deletedSong = await this.songService.deleteSong(id);
      return response.status(200).json({
        message: 'Song has been deleted',
        deletedSong,
      })
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }
}
