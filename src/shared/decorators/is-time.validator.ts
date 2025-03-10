import { applyDecorators } from '@nestjs/common';
import { Matches, ValidateIf } from 'class-validator';

export function IsTime() {
  return applyDecorators(
    ValidateIf((object, value) => value !== null),
    Matches(/^\d{2}:\d{2}:\d{2}$/, {
      message: 'Time must be in the format HH:MM:SS',
    }),
  );
}
