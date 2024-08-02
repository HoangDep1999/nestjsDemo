import { Inject, Injectable } from '@nestjs/common';
import { ICarRepository } from 'src/interfaces/ICarRepository';
import { Car } from 'src/models/car.model';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class CarService {
  constructor(
    @Inject('ICarRepository')
    private readonly carRepository: ICarRepository
  ) {}
  
  async findAll(): Promise<Car[]> {
    return await this.carRepository.findAll();
  }

  async findById(id: number): Promise<Car> {
    return await this.carRepository.findById(id);
  }

  async create(car: Car): Promise<Car> {
    return await this.carRepository.create(car);
  }

  async update(id: number, car: Car): Promise<Car> {
    await this.carRepository.update(id, car);
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    return await this.carRepository.delete(id);
  }

  async findRelationById(id: number) : Promise<Car>{
    return await this.carRepository.findRelationById(id);
  }
}
