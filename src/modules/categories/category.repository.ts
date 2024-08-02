import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesEntity } from 'src/entity/categories.entity';
import { ICategoryRepository } from '../../interfaces/ICategoryRepository';
import { BaseRepository } from 'src/interfaces/BaseRepository';
import { Repository } from 'typeorm';
@Injectable()
export class CategoryRepository
  extends BaseRepository<CategoriesEntity, Repository<CategoriesEntity>>
  implements ICategoryRepository
{
  constructor(
    @InjectRepository(CategoriesEntity)
    protected readonly repository: Repository<CategoriesEntity>,
  ) {
    super(repository);
  }
}
