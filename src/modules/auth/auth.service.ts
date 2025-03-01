import { Inject, Injectable } from "@nestjs/common";
import { AuthPayloadDto, AuthPermission, AuthReponseDto } from "src/dto/auth.dto";
import { IAuthRepository } from "src/interfaces/IAuthRepository";
@Injectable()
export class AuthService{

    constructor(
        @Inject('IAuthRepository')
        protected readonly authRepository: IAuthRepository
    ){}

    async signIn(auth: AuthPayloadDto): Promise<AuthPermission| boolean> {
        const { username, password} = auth;
        if( !username || !password ) return false;

        const isAuth = await this.authRepository.signIn(auth);
        if(!isAuth) return false;
        return isAuth;
    }

    async signUp(auth: AuthPayloadDto): Promise<AuthReponseDto| boolean> {
        const { username, password} = auth;
        if( !username || !password ) return false;

        const userDTO : AuthReponseDto = new AuthReponseDto(await this.authRepository.signUp(auth));
        return userDTO;
    }
}