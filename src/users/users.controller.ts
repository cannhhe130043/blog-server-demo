import { Controller, Get, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from '../auth/auth.guard'
import { UserEntity } from './entities/user.entity'
import { UsersService } from './users.service'

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  getById(@Request() req): Promise<UserEntity> {
    return this.service.getById(req.query.id)
  }

  @Get('/me')
  me(@Request() req): Promise<UserEntity> {
    return this.service.getById(req.user.userId)
  }
}
