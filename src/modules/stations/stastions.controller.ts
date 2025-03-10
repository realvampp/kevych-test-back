import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CheckQueryParamHasValuePipe } from 'src/shared/pipes/check-query-param-has-value.pipe';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';
import { Station } from './entities/station.entity';
import { StationsService } from './stastions.service';

@Controller('stations')
@ApiTags('Stations')
@ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
export class StationsController {
  constructor(private readonly stationsService: StationsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all stations' })
  @ApiResponse({ status: 200, description: 'List of all stations' })
  findAll(): Promise<Station[]> {
    return this.stationsService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new station' })
  @ApiResponse({ status: 201, description: 'New station created' })
  create(@Body() body: CreateStationDto): Promise<Station> {
    return this.stationsService.create(body);
  }

  @Get(':name')
  @ApiOperation({ summary: 'Get a station by name' })
  @ApiResponse({ status: 200, description: 'Station found' })
  findOne(
    @Param('name', CheckQueryParamHasValuePipe) name: string,
  ): Promise<Station> {
    return this.stationsService.findOneByName(name);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a station by id' })
  @ApiResponse({ status: 200, description: 'Station updated' })
  update(
    @Param('id', CheckQueryParamHasValuePipe) id: string,
    @Body() body: UpdateStationDto,
  ): Promise<Station> {
    return this.stationsService.update(id, body);
  }
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a station by id' })
  @ApiResponse({ status: 200, description: 'Station deleted' })
  delete(@Param('id', CheckQueryParamHasValuePipe) id: string): Promise<void> {
    return this.stationsService.delete(id);
  }
}
