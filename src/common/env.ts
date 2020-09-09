type KeyOptions<T> = {
  optional?: boolean
  encrypted?: boolean
  defaultValue?: T
}

export function loadEnv<T>(key: string, options: KeyOptions<T> = {}): T {
  const value = process.env[key]
  if (!value && options.defaultValue) {
    return options.defaultValue
  }
  if (!options.optional && !value) {
    throw new Error(`Missing ENV key: ${key}`)
  }
  return options.encrypted
    ? JSON.parse(Buffer.from(String(value), 'base64').toString())
    : value
}

export const baseEnvConfig = {
  envFilePath:
    process.env.NODE_ENV === 'test' ? ['test.env'] : ['local.env', '.env'],
  ignoreEnvFile: process.env.NODE_ENV === 'production',
}
