import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class Song {
    @Prop()
    name: string;

    @Prop()
    artist: string;

    @Prop()
    duration: number;

    @Prop()
    genre: string;
}

export const SongSchema = SchemaFactory.createForClass(Song)
