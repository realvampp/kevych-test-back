import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Station } from '../stations/entities/station.entity';
import { RouteStation } from './entities/route-station.entity';
import { Route } from './entities/route.entity';
import { RoutesController } from './routes.controller';
import { RoutesService } from './routes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Route, RouteStation, Station])],
  controllers: [RoutesController],
  providers: [RoutesService],
})
export class RoutesModule {}
