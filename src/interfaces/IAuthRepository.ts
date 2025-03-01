import { AuthPayloadDto, AuthPermission, AuthReponseDto } from "src/dto/auth.dto";

export interface IAuthRepository {
    signIn(body: AuthPayloadDto): Promise<AuthPermission | boolean>;
    signUp(body: AuthPayloadDto): Promise<AuthReponseDto>;
}