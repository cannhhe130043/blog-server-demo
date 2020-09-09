/* eslint-disable @typescript-eslint/no-var-requires */
import * as fs from ('fs')
import * as path from ('path')

const config = JSON.parse(Buffer.from(process.env.DB_CRED || 'e30=', 'base64').toString())

fs.writeFile(
  path.join(__dirname, './ormconfig.json'),
  JSON.stringify({
    ...config,
    type: 'postgres',
    cli: {
      migrationsDir: 'migrations',
    },
    migrations: [path.join(__dirname, './migrations/*.ts')],
  }),
  err => {
    if (err) {
      console.warn('Cannot generate orm config', err.message)
      return
    }
    console.info('OrmConfig generated')
  },
)
