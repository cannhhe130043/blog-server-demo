import { NestFactory } from '@nestjs/core'
import * as bodyParser from 'body-parser'
import * as dotenv from 'dotenv'
import * as logger from 'morgan'
import { AppModule } from './app.module'
dotenv.config()
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.use(logger('dev'))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  const port = parseInt(process.env.PORT || '8080')
  await app.listen(port, () => console.log(`Server started on port ${port}`))
}
bootstrap()
