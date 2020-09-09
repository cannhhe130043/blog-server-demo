import { Inject } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'
import * as dotenv from 'dotenv'
import dbEnv from './envs/db.env'
dotenv.config()

export class OrmConfig implements TypeOrmOptionsFactory {
  constructor(
    @Inject(dbEnv.KEY) private readonly env: ConfigType<typeof dbEnv>,
  ) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const baseOptions: TypeOrmModuleOptions = {
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.NODE_ENV === 'test' ? 'test' : process.env.DB_NAME,
      synchronize: true,
      ssl: true,
      autoLoadEntities: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
      // logging: ['query'],
    }

    const testOptions =
      process.env.NODE_ENV === 'test' ? { database: 'test' } : {}

    const options = {
      ...baseOptions,
      ...testOptions,
      ...this.env,
    }
    // console.info({ options })
    return options as TypeOrmModuleOptions
  }
}
