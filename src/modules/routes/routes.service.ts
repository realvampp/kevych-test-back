import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/shared/types/pagination';
import { DataSource, Repository } from 'typeorm';
import { CreateRouteDto } from './dto/create-route.dto';
import { SearchRouteDto } from './dto/search-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { RouteStation } from './entities/route-station.entity';
import { Route } from './entities/route.entity';

@Injectable()
export class RoutesService {
  constructor(
    @InjectRepository(Route)
    private routeRepository: Repository<Route>,
    @InjectRepository(RouteStation)
    private routeStationRepository: Repository<RouteStation>,
    private dataSource: DataSource,
  ) {}

  async create({ stations, name }: CreateRouteDto) {
    let route = await this.routeRepository.save({ name });

    const routeStations = this.routeStationRepository.create(
      stations.map((station, index) => ({
        ...station,
        station: { id: station.stationId },
        index,
        route: { id: route.id },
      })),
    );
    await this.routeStationRepository.save(routeStations).catch(() => {
      throw new BadRequestException('wrong station id');
    });

    route = await this.routeRepository.findOne({
      where: { id: route.id },
      relations: {
        stations: {
          station: true,
        },
      },
    });

    return route;
  }

  async findAll(
    { fromStation, toStation }: SearchRouteDto,
    { page, limit }: PaginationDto,
  ) {
    const [routes, total] = await this.routeRepository
      .createQueryBuilder('route')
      .innerJoin('route.stations', 'routeStationFrom')
      .innerJoin('route.stations', 'routeStationTo')
      .innerJoin('routeStationFrom.station', 'matchingStationFrom')
      .innerJoin('routeStationTo.station', 'matchingStationTo')
      .leftJoinAndSelect('route.stations', 'allRouteStations')
      .leftJoinAndSelect('allRouteStations.station', 'allStations')
      .where('matchingStationFrom.name ILIKE :fromStation', {
        fromStation: `%${fromStation || ''}%`,
      })
      .andWhere('matchingStationTo.name ILIKE :toStation', {
        toStation: `%${toStation || ''}%`,
      })
      .andWhere('routeStationFrom.index < routeStationTo.index')
      .orderBy('allRouteStations.index', 'ASC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return { routes, page, limit, totalPages: Math.ceil(total / limit), total };
  }

  findOne(id: string) {
    return this.routeRepository.findOne({
      where: { id },
      relations: {
        stations: {
          station: true,
        },
      },
    });
  }

  async update(id: string, updateRouteDto: UpdateRouteDto) {
    const route = await this.routeRepository.findOne({ where: { id: id } });

    if (!route) throw new NotFoundException(`Route with ID ${id} not found`);

    const updatedRoute = await this.dataSource.transaction(async (manager) => {
      if (updateRouteDto.name) {
        route.name = updateRouteDto.name;
        await manager.save(route);
      }

      await manager.delete(RouteStation, { route: { id: id } });

      const newRouteStations = updateRouteDto.stations.map(
        (stationData, index) =>
          manager.create(RouteStation, {
            route: { id: id },
            station: { id: stationData.stationId },
            arrivalTime: stationData.arrivalTime,
            departureTime: stationData.departureTime,
            index,
          }),
      );

      await manager.save(RouteStation, newRouteStations).catch(() => {
        throw new BadRequestException('wrong station id');
      });

      const updatedRoute = await manager.findOne(Route, {
        where: { id },
        relations: { stations: { station: true } },
      });

      return updatedRoute;
    });

    return updatedRoute;
  }

  remove(id: string) {
    return this.routeRepository.delete(id);
  }
}
