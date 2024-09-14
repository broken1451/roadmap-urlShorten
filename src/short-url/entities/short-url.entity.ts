import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ShortUrl extends Document {

    @Prop({ required: [true], type: String })
    url: string;

    @Prop({required: [true], type: String })
    shortCode: string;


    @Prop({ required: false, type: Number, default: 0 })
    accessCount: number;

    @Prop({ type: Date, default: Date.now })
    created_at: Date;

    @Prop({ type: Date, default: Date.now })
    updated_at: Date;
}

export const ShortUrlSchema = SchemaFactory.createForClass(ShortUrl);