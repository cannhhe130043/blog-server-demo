import { registerAs } from '@nestjs/config'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import { loadEnv } from '../env'

export default registerAs('db', () =>
  loadEnv<Pick<PostgresConnectionOptions, 'database' | 'username' | 'password' | 'host'>>('DB_CRED', {
    encrypted: true,
    defaultValue: {},
  }),
)
