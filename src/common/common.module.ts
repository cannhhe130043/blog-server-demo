import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { baseEnvConfig } from './env'
import baseEnv from './envs/base.env'
import dbEnv from './envs/db.env'
import { OrmConfig } from './orm.config'
@Module({
  imports: [
    ConfigModule.forRoot({
      ...baseEnvConfig,
      isGlobal: true,
      load: [baseEnv, dbEnv],
    }),
    TypeOrmModule.forRootAsync({ useClass: OrmConfig }),
  ],
})
export class CommonModule {}
