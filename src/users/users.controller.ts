import { Controller, Get, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from '../auth/auth.guard'
import { UsersService } from './users.service'

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  getById(@Request() req) {
    return this.service.getById(req.query.id)
  }

  @Get('/me')
  me(@Request() req) {
    return this.service.getById(req.user.id)
  }
}
