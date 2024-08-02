import { CategoryModule } from './modules/categories/category.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './modules/products/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CategoriesEntity } from './entity/categories.entity';
import { CarsEntity } from './entity/cars.entity';
import { AccountEnity } from './entity/account.entity';
import { CarModule } from './modules/cars/cars.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtContant } from './contant/contant';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/auth.guard';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'nestjs_demo_v1',
      entities: [CategoriesEntity, CarsEntity, AccountEnity],
      synchronize: true,
    }),
    JwtModule.register({
      global:true,
      secret:jwtContant.secret,
      signOptions:{ expiresIn: 90000}

    }),
    ProductModule,
    CategoryModule,
    CarModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }],
})
export class AppModule {
  constructor(private dataSource:DataSource) {}
}
