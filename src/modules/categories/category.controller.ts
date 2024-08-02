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
import { Category } from 'src/models/category.model';
import { CategoryService } from './category.service';
import { CategoryDTO } from 'src/dto/category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @Get()
  async list(@Res() res: Response): Promise<ResponseType<Category>> {
    try {
      return res.json(
        new ResponseData(
          await this.categoryService.findAll(),
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
  async detailCategory(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<ResponseType<Category>> {
    try {
      return res.json(
        new ResponseData(
          await this.categoryService.findById(id),
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
  async createCategory(
    @Body(new ValidationPipe()) category: CategoryDTO,
    @Res() res: Response,
  ): Promise<ResponseType<Category>> {
    try {
      return res.json(
        new ResponseData(
          await this.categoryService.createCategory(category),
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
  async updateCategory(
    @Param('id') id: number,
    @Body(new ValidationPipe()) category: CategoryDTO,
    @Res() res: Response,
  ): Promise<ResponseType<Category>> {
    try {
      return res.json(
        new ResponseData(
          await this.categoryService.updateCategory(id, category),
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
  async deleteCategory(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<ResponseType<boolean>> {
    try {
      const isCheckDelete = await this.categoryService.deleteCategory(id);
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
}
