import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { LoginUserDto } from '../users/dto/login-user.dto'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('login')
  @HttpCode(200)
  login(@Body() loginUserDto: LoginUserDto): Promise<string> {
    return this.service.login(loginUserDto)
  }

  @Post('register')
  register(@Body() createUserDto: CreateUserDto): Promise<string> {
    return this.service.register(createUserDto)
  }
}
