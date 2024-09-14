import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShortUrlService } from './short-url.service';
import { CreateShortUrlDto } from './dto/create-short-url.dto';
import { UpdateShortUrlDto } from './dto/update-short-url.dto';

@Controller('short-url')
export class ShortUrlController {
  constructor(private readonly shortUrlService: ShortUrlService) {}

  @Post('/shorten')
  create(@Body() createShortUrlDto: CreateShortUrlDto) {
    return this.shortUrlService.create(createShortUrlDto);
  }

  @Get()
  findAll() {
    return this.shortUrlService.findAll();
  }

  @Get('/shorten/:urlShort')
  findOne(@Param('urlShort') urlShort: string) {
    return this.shortUrlService.findOne(urlShort);
  }

  @Patch('/shorten/:urlShort')
  update(@Param('urlShort') urlShort: string, @Body() updateShortUrlDto: UpdateShortUrlDto) {
    return this.shortUrlService.update(urlShort, updateShortUrlDto);
  }

  @Delete('shorten/:urlShort')
  remove(@Param('urlShort') urlShort: string) {
    return this.shortUrlService.remove(urlShort);
  }

  @Get('/status/shorten/:urlShort')
  getStatusURl(@Param('urlShort') urlShort: string) {
    return this.shortUrlService.getStatusURl(urlShort);
  }
}
