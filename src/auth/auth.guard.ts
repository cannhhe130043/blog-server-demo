import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Request } from 'express'
import { AuthService } from './auth.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly service: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest()
    const token = request.headers.authorization
    if (!token) {
      throw new UnauthorizedException()
    }
    const userPayload = await this.service.verifyToken(token)
    request.user = userPayload
    return !!userPayload
  }
}
