import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStationDto {
  @ApiProperty({ description: 'The name of the station', example: 'Lviv' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
