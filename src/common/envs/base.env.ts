import { registerAs } from '@nestjs/config'

type EnvType = {
  inDev: boolean
  inTest: boolean
}

export default registerAs(
  'base',
  (): EnvType => ({
    inDev: process.env.NODE_ENV !== 'production',
    inTest: process.env.NODE_ENV !== 'test',
  }),
)
