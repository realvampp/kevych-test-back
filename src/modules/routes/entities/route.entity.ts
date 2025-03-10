import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RouteStation } from './route-station.entity';

@Entity('routes')
export class Route {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => RouteStation, (routeStation) => routeStation.route, {})
  stations: RouteStation[];
}
