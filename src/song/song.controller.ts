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
