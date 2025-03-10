import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsTime } from 'src/shared/decorators/is-time.validator';

export class CreateRouteStationDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  stationId: string;

  @IsString()
  @IsNotEmpty()
  @IsTime()
  @ApiProperty({
    example: '12:00:00',
    description: 'The time the train arrives at the station',
  })
  arrivalTime: string;

  @IsString()
  @IsOptional()
  @IsTime()
  @ApiProperty({
    example: '12:30:00',
    description: 'The time the train departs from the station',
  })
  departureTime: string | null;
}
