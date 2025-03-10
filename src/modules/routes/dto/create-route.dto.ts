import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateRouteStationDto } from './create-route-station.dto';

export class CreateRouteDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Route Lviv - Kyiv',
  })
  name: string;

  @IsArray()
  @ArrayMinSize(2)
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateRouteStationDto)
  @ApiProperty({
    type: CreateRouteStationDto,
    isArray: true,
    minItems: 2,
  })
  stations: CreateRouteStationDto[];
}
