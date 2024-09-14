import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateShortUrlDto {


    @IsString()
    @IsNotEmpty()
    url: string;

    @IsOptional()
    shortCode: string;

    @IsOptional()
    accessCount: number;

    @IsOptional()
    created_at: Date;

    @IsOptional()
    @Type(() => Number)
    updated_at: number;
}
