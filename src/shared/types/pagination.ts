import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class PaginationDto {
  @Type(() => Number)
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  page: number;

  @Type(() => Number)
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ example: 10 })
  limit: number;
}
