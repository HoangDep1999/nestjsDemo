import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarsEntity } from 'src/entity/cars.entity';
import { BaseRepository } from 'src/interfaces/BaseRepository';
import { ICarRepository } from 'src/interfaces/ICarRepository';
import { Car } from 'src/models/Car.model';
import { Repository } from 'typeorm';

@Injectable()
export class CarRepository
  extends BaseRepository<CarsEntity, Repository<CarsEntity>>
  implements ICarRepository
{
  constructor(
    @InjectRepository(CarsEntity)
    protected readonly repository: Repository<CarsEntity>,
  ) {
    super(repository);
  }
    async findRelationById(id: number): Promise<Car> {
       return await this.repository.findOne({where:{id}, relations:['category']});
    }
}
