import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { CommonModule } from './common/common.module'
import { PostsModule } from './posts/posts.module'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, CommonModule, PostsModule, AuthModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
