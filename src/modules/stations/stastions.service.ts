import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';
import { Station } from './entities/station.entity';

@Injectable()
export class StationsService {
  constructor(
    @InjectRepository(Station)
    private readonly stationRepository: Repository<Station>,
  ) {}

  async findAll(): Promise<Station[]> {
    return this.stationRepository.find();
  }

  async create(body: CreateStationDto): Promise<Station> {
    const station = this.stationRepository.create(body);
    return this.stationRepository.save(station);
  }

  async findOneByName(name: string): Promise<Station> {
    return this.stationRepository.findOne({
      where: { name: ILike(`%${name}%`) },
    });
  }

  async update(id: string, body: UpdateStationDto): Promise<Station> {
    await this.stationRepository.update(id, body);
    return this.stationRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.stationRepository.delete(id);
  }
}
