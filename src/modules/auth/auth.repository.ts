import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthPayloadDto, AuthPermission, AuthReponseDto } from 'src/dto/auth.dto';
import { AccountEnity } from 'src/entity/account.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { Role } from 'src/global/globalEnum';
import { IAuthRepository } from 'src/interfaces/IAuthRepository';

@Injectable()
export class AuthRepository implements IAuthRepository
{
  constructor(
    @InjectRepository(AccountEnity)
    protected readonly repository: Repository<AccountEnity>,
    private jwtService: JwtService,
  ){}
    
  
  async signIn(body: AuthPayloadDto): Promise<boolean | AuthPermission>{
        const { username, password} = body;
        const userAuth = await this.repository.findOne({where: {username}});
        if(!userAuth) return false;
        const isMatch = await bcrypt.compare(password, userAuth.password);
        if(!isMatch) return false;
        const payload = {...new AuthReponseDto(userAuth)};
        return new AuthPermission({
            id: userAuth.id,
            token: await this.jwtService.signAsync(payload),
            expiredTime: 900000
        })
    }

    async signUp(body: AuthPayloadDto): Promise<AuthReponseDto>{
        const { username, password } = body;
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);
        return this.repository.save({
            username,
            password: hash,
            permission: Role.Admin
        })
    }
}
