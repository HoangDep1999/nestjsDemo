import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CarController } from "./cars.controller";
import { CarService } from "./cars.service";
import { CarsEntity } from "src/entity/cars.entity";
import { CarRepository } from "./cars.repository";

@Module({
  imports: [ TypeOrmModule.forFeature([CarsEntity])],
  controllers: [CarController],
  providers: [CarService, {
    useClass: CarRepository,
    provide: 'ICarRepository'
  }],
})

export class CarModule {}
    