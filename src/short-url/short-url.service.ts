import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateShortUrlDto } from './dto/create-short-url.dto';
import { UpdateShortUrlDto } from './dto/update-short-url.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ShortUrl } from './entities/short-url.entity';
import { Model } from 'mongoose';
import { ShortURLData } from './interfaces/short-url.interface';

@Injectable()
export class ShortUrlService {

  constructor(
    @InjectModel(ShortUrl.name) private readonly urlModel: Model<ShortUrl>,
  ) { }



  async create(createShortUrlDto: CreateShortUrlDto) {
    let { url, shortCode } = createShortUrlDto;
    const apiUrl = 'https://api.tinyurl.com/create';
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' // Puedes usarlo si decides registrarte
      },
      body: JSON.stringify({
        url: url,
        domain: 'tiny.one' // Puedes cambiar el dominio si prefieres otro
      })
    };
    const response = await fetch(apiUrl, requestOptions);
    const data: ShortURLData = await response.json();
    shortCode = data.data.tiny_url

    let urlExist: ShortUrl;

    if (shortCode) {
      urlExist = await this.urlModel.findOne({ shortCode });
      if (urlExist) {
        throw new BadRequestException(
          `ShortCode ${shortCode} already exists`,
        );
      }
    }

    const urlShortCreated = await this.urlModel.create(
      {
        url,
        shortCode
      }
    )

    return {
      urlShortCreated
    }
  }

  findAll() {
    return this.urlModel.find({});
  }

  async findOne(urlShort: string) {
    let url = `https://tiny.one/${urlShort}`
    const urlShortFounded = await this.urlModel.findOne({
      shortCode: url
    });
    if (!urlShortFounded) {
      throw new BadRequestException(
        `ShortCode ${urlShort} not found`,
      );
    }

    return urlShortFounded;
  }

  async getStatusURl(urlShort: string) {
    const urlFounded = await this.findOne(urlShort);

    urlFounded.accessCount = urlFounded.accessCount + 1;
    await this.urlModel.findByIdAndUpdate(
      urlFounded._id,
      urlFounded,
      {
        new: true,
      },
    )
    
    return urlFounded;

  }

  async update(urlShort: string, updateShortUrlDto: UpdateShortUrlDto) {

    const urlFound = await this.findOne(urlShort);
    const apiUrl = 'https://api.tinyurl.com/create';
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' // Puedes usarlo si decides registrarte
      },
      body: JSON.stringify({
        url: updateShortUrlDto.url,
        domain: 'tiny.one' // Puedes cambiar el dominio si prefieres otro
      })
    };

    const response = await fetch(apiUrl, requestOptions);
    const data: ShortURLData = await response.json();
    updateShortUrlDto.shortCode = data.data.tiny_url


    const updatedFields = {
      ...updateShortUrlDto,
      updated_at: Date.now(),
      url: updateShortUrlDto.url, // Si quieres mantener la URL existente, sino cambia este valor
    };

    // const urlUpdated = await this.urlModel.findOneAndUpdate(
    //   {
    //     _id: urlFound._id,
    //     shortCode: urlFound.shortCode,
    //   },
    //   updatedFields,
    //   {
    //     new: true,
    //   },
    // );  
    const urlUpdated = await this.urlModel.findByIdAndUpdate(
      urlFound._id,
      updatedFields,
      {
        new: true,
      },
    );  
    return urlUpdated;
  }

  async remove(shortUrl: string) {
    const urlFounded: any = await this.findOne(shortUrl);
    if (!urlFounded) {
      throw new BadRequestException(`ShortCode ${shortUrl} not found`);
    }
    
    // const urlDeleted = await this.urlModel.findByIdAndDelete(urlFounded._id, urlFounded);
    // const urlDeleted = await this.urlModel.deleteOne({
    //   shortCode: urlFounded.shortCode,
    // });

    // const urlDeleted = await this.urlModel.findOneAndDelete({
    //   shortCode: urlFounded.shortCode,
    // });
    
    const urlDeleted = await this.urlModel.deleteOne({
        shortCode: urlFounded.shortCode
    });
    return { urlDeleted };

  }
}
