import { RouteStation } from 'src/modules/routes/entities/route-station.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stations')
export class Station {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @OneToMany(() => RouteStation, (routeStation) => routeStation.station)
  routes: RouteStation[];
}
