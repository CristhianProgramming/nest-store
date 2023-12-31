import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly serviceAuth: AuthService) {}

  @Post('/singup')
  SingUp(@Body() payload: any) {
    return this.serviceAuth.singUp(payload);
  }

  @Post('/singin')
  SingIn(@Body() payload: any) {
    return this.serviceAuth.singIp(payload);
  }
}
