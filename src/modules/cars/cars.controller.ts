import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { ResponseType } from 'src/global/globalType';
import { Car } from 'src/models/Car.model';
import { CarDTO } from "src/dto/cars.dto";
import { CarService } from './cars.service';


@Controller('cars')
export class CarController {
  constructor(private carService: CarService) {}
  @Get()
  async list(@Res() res: Response): Promise<ResponseType<Car>> {
    try {
      return res.json(
        new ResponseData(
          await this.carService.findAll(),
          HttpStatus.SUCCESS,
          HttpMessage.SUCCESS,
        ),
      );
    } catch (error) {
      return res.json(
        new ResponseData(null, HttpStatus.SUCCESS, HttpMessage.ERROR),
      );
    }
  }

  @Get(':id')
  async detailCar(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<ResponseType<Car>> {
    try {
      return res.json(
        new ResponseData(
          await this.carService.findById(id),
          HttpStatus.SUCCESS,
          HttpMessage.SUCCESS,
        ),
      );
    } catch (error) {
      return res.json(
        new ResponseData(null, HttpStatus.SUCCESS, HttpMessage.ERROR),
      );
    }
  }

  @Post()
  async createCar(
    @Body(new ValidationPipe()) car: CarDTO,
    @Res() res: Response,
  ): Promise<ResponseType<Car>> {
    try {
      return res.json(
        new ResponseData(
          await this.carService.create(car),
          HttpStatus.SUCCESS,
          HttpMessage.SUCCESS,
        ),
      );
    } catch (error) {
      return res.json(
        new ResponseData(null, HttpStatus.SUCCESS, HttpMessage.ERROR),
      );
    }
  }

  @Put(':id')
  async updateCar(
    @Param('id') id: number,
    @Body(new ValidationPipe()) car: CarDTO,
    @Res() res: Response,
  ): Promise<ResponseType<Car>> {
    try {
      return res.json(
        new ResponseData(
          await this.carService.update(id, car),
          HttpStatus.SUCCESS,
          HttpMessage.SUCCESS,
        ),
      );
    } catch (error) {
      return res.json(
        new ResponseData(null, HttpStatus.SUCCESS, HttpMessage.ERROR),
      );
    }
  }

  @Delete(':id')
  async deleteCar(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<ResponseType<boolean>> {
    try {
      const isCheckDelete = await this.carService.delete(id);
      if (isCheckDelete) {
        return res.json(
          new ResponseData(
            isCheckDelete,
            HttpStatus.SUCCESS,
            HttpMessage.SUCCESS,
          ),
        );
      }
      else{
        return res.json(
          new ResponseData(
            isCheckDelete,
            HttpStatus.ERROR,
            HttpMessage.ERROR,
          ),
        );
      }
    } catch (error) {
      return res.json(
        new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR),
      );
    }
  }

  @Get('/relations/:id')
  async findRelationById(@Param('id') id: number, @Res() res: Response){
    try {
      return res.json(
        new ResponseData(
          await this.carService.findRelationById(id),
          HttpStatus.SUCCESS,
          HttpMessage.SUCCESS,
        ),
      );
    } catch (error) {
      return res.json(
        new ResponseData(null, HttpStatus.SUCCESS, HttpMessage.ERROR),
      );
    }
  }
}
