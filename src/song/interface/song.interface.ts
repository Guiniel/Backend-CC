import { Document } from 'mongoose'

export interface ISong extends Document {
    name: string;
    artist: string;
    duration: number;
    genre: string;
}