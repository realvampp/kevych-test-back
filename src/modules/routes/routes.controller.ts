import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CheckQueryParamHasValuePipe } from 'src/shared/pipes/check-query-param-has-value.pipe';
import { PaginationDto } from 'src/shared/types/pagination';
import { CreateRouteDto } from './dto/create-route.dto';
import { SearchRouteDto } from './dto/search-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { RoutesService } from './routes.service';

@Controller('routes')
@ApiTags('Routes')
@ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Post()
  create(@Body() createRouteDto: CreateRouteDto) {
    return this.routesService.create(createRouteDto);
  }

  @Post('search')
  findAll(
    @Body() searchRouteDto: SearchRouteDto,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.routesService.findAll(searchRouteDto, paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', CheckQueryParamHasValuePipe) id: string) {
    return this.routesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', CheckQueryParamHasValuePipe) id: string,
    @Body() updateRouteDto: UpdateRouteDto,
  ) {
    return this.routesService.update(id, updateRouteDto);
  }

  @Delete(':id')
  async remove(@Param('id', CheckQueryParamHasValuePipe) id: string) {
    await this.routesService.remove(id);
    return {
      message: 'Route deleted successfully',
    };
  }
}
