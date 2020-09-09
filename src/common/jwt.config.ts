import { Injectable } from '@nestjs/common'
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt'
import { readFileSync } from 'fs'
import { resolve } from 'path'

@Injectable()
export class JwtConfig implements JwtOptionsFactory {
  createJwtOptions(): JwtModuleOptions {
    return {
      secret: readFileSync(resolve('./keys/private.key')),
      publicKey: readFileSync(resolve('./keys/public.key')),
      verifyOptions: {
        algorithms: ['RS256'],
      },
      signOptions: {
        expiresIn: '1d',
        algorithm: 'RS256',
      },
    }
  }
}
