import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountEnity } from "src/entity/account.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthRepository } from "./auth.repository";

@Module({
  imports: [ TypeOrmModule.forFeature([AccountEnity])],
  controllers: [AuthController],
  providers: [AuthService, {
    useClass: AuthRepository,
    provide: 'IAuthRepository'
  }],
})

export class AuthModule {}
    