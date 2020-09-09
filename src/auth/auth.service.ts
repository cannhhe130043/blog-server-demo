import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compareSync } from 'bcrypt'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { LoginUserDto } from '../users/dto/login-user.dto'
import { UsersService } from '../users/users.service'

export type UserPayload = {
  userId: number
  username: string
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<string> {
    const user = await this.usersService.findOne(loginUserDto.username)
    if (!user || !(await compareSync(loginUserDto.password, user.password))) {
      throw new UnauthorizedException('Username or password is incorrect')
    }
    const payload: UserPayload = { userId: user.id, username: user.username }
    return this.jwtService.signAsync(payload)
  }

  async register(createUserDto: CreateUserDto): Promise<string> {
    const user = await this.usersService.create(createUserDto)
    const payload: UserPayload = { userId: user.id, username: user.username }
    return this.jwtService.signAsync(payload)
  }

  async verifyToken(token: string): Promise<UserPayload> {
    try {
      const parts = token.split(' ')
      const [scheme, credentials] = parts
      if (parts.length !== 2 || !/^Bearer$/i.test(scheme)) {
        throw new Error('Malformed token')
      }
      const payload: UserPayload = await this.jwtService.verifyAsync(
        credentials,
      )
      return payload
    } catch (e) {
      throw new UnauthorizedException('Token is invalid', e.message)
    }
  }
}
