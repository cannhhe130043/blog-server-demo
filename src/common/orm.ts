import { ConfigModule } from '@nestjs/config'
import * as path from 'path'
import {
  Connection,
  ConnectionOptions,
  createConnection,
  SelectQueryBuilder,
} from 'typeorm'
import { PostEntity } from '../posts/entities/post.entity'
import { UserEntity } from '../users/entities/user.entity'
import { baseEnvConfig } from './env'
import dbEnv from './envs/db.env'
import { OrmConfig } from './orm.config'

ConfigModule.forRoot({ ...baseEnvConfig, load: [dbEnv] })
export const config: ConnectionOptions = {
  ...(new OrmConfig(dbEnv()).createTypeOrmOptions() as ConnectionOptions),
  cli: {
    migrationsDir: `migrations`,
  },
  migrations: [path.join(process.cwd(), 'migrations/*.ts')],
  entities: [UserEntity, PostEntity],
}

const mockData = async (connection: Connection) => {
  const em = connection.createEntityManager()
  em
}

export const setup = async () => {
  console.info('~~~~ Setup')
  if (!process.env.E2E) {
    return
  }
  let conn = await createConnection(config)
  const qr = conn.createQueryRunner()
  await qr.dropDatabase(String(config.database), true)
  await qr.createDatabase(String(config.database), true)
  await qr.release()
  await conn.close()

  conn = await createConnection(config)
  await conn.runMigrations()
  await mockData(conn)
  await conn.close()
}

export const teardown = async () => {
  const conn = await createConnection(config)
  await conn.dropDatabase()
  await conn.close()
  console.info('~~~~ Teardown')
}

export type SubQuery = (q: SelectQueryBuilder<any>) => SelectQueryBuilder<any>
