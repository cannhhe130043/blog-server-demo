import { generateKeyPairSync } from 'crypto'
import { existsSync, writeFileSync } from 'fs'

const genKey = async () => {
  const { privateKey, publicKey } = await generateKeyPairSync('rsa', {
    modulusLength: 8192,
    publicKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
  })
  if (!existsSync('./keys/private.key') || !existsSync('./keys/public.key')) {
    await writeFileSync('./keys/private.key', privateKey)
    await writeFileSync('./keys/public.key', publicKey)
  }
}

genKey()
