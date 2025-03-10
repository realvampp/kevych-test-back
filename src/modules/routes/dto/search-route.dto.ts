import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SearchRouteDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Lviv', required: false })
  fromStation?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Kyiv', required: false })
  toStation?: string;
}
