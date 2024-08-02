import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthPayloadDto, AuthPermission } from 'src/dto/auth.dto';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { ResponseType } from 'src/global/globalType';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { Public } from 'src/contant/decorator';

@Controller('auth')
export class AuthController {
    constructor(protected readonly authService: AuthService){}


  @Public()
  @Post('/signIn')
  async signIn(
    @Body() auth: AuthPayloadDto,
    @Res() res: Response,
  ): Promise<ResponseType<AuthPermission | boolean>> {
    try {
      const isAuth = await this.authService.signIn(auth);
      if (!isAuth) {
        return res.json(
          new ResponseData(isAuth, HttpStatus.ERROR, HttpMessage.ERROR),
        );
      }
      return res.json(
        new ResponseData(isAuth, HttpStatus.SUCCESS, HttpMessage.SUCCESS),
      );
    } catch (error) {
      return res.json(
        new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR),
      );
    }
  }

  @Post('/signUp')
  async signUp(
    @Body() auth: AuthPayloadDto,
    @Res() res: Response,
  ): Promise<ResponseType<AuthPayloadDto | boolean>> {
    try {
      const isAuth = await this.authService.signUp(auth);
      if (!isAuth) {
        return res.json(
          new ResponseData(isAuth, HttpStatus.ERROR, HttpMessage.ERROR),
        );
      }
      return res.json(
        new ResponseData(isAuth, HttpStatus.SUCCESS, HttpMessage.SUCCESS),
      );
    } catch (error) {
      return res.json(
        new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR),
      );
    }
  }
}
