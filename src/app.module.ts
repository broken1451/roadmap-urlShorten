import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ShortUrlModule } from './short-url/short-url.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB),
    ShortUrlModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
