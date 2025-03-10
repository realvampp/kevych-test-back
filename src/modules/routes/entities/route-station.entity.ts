import { Station } from 'src/modules/stations/entities/station.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Route } from './route.entity';

@Entity('routes_stations')
@Unique(['route', 'station'])
export class RouteStation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Route, (route) => route.stations, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'route_id' })
  route: Route;

  @ManyToOne(() => Station, (station) => station.routes, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'station_id' })
  station: Station;

  @Column({ name: 'arrival_time', type: 'time' })
  arrivalTime: string;

  @Column({ name: 'departure_time', type: 'time', nullable: true })
  departureTime: string | null;

  @Column()
  index: number;
}
