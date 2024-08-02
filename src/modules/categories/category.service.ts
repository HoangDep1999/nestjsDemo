import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryDTO } from 'src/dto/category.dto';
import { CategoriesEntity } from 'src/entity/categories.entity';
import { Category } from 'src/models/category.model';
import { DeleteResult, Repository } from 'typeorm';
import { ICategoryRepository } from '../../interfaces/ICategoryRepository';

@Injectable()
export class CategoryService {
  constructor(
   @Inject('ICategoryRepository') 
   private readonly categoryRepository: ICategoryRepository
  ) {}

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.findAll();
  }

  async findById(id: number): Promise<Category> {
    return await this.categoryRepository.findById(id);
  }

  async createCategory(category: Category): Promise<Category> {
    return await this.categoryRepository.create(category);
  }

  async updateCategory(id: number, category: Category): Promise<Category> {
    await this.categoryRepository.update(id, category);
    return this.findById(id);
  }

  async deleteCategory(id: number): Promise<boolean> {
    return await this.categoryRepository.delete(id);
  }
}
