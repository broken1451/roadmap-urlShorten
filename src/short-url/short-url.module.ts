import { Module } from '@nestjs/common';
import { ShortUrlService } from './short-url.service';
import { ShortUrlController } from './short-url.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ShortUrl, ShortUrlSchema } from './entities/short-url.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [ShortUrlController],
  providers: [ShortUrlService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: ShortUrl.name, schema: ShortUrlSchema, collection: 'urls' }])
  ]
})
export class ShortUrlModule {}
