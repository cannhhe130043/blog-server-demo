import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { AuthGuard } from 'src/auth/auth.guard'
import { AwsService } from 'src/third-party/aws.service'

@UseGuards(AuthGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly awsService: AwsService) {}

  @Post('upload-image')
  @UseInterceptors(FileInterceptor('image'))
  uploadPostImage(@UploadedFile() image: Express.Multer.File): Promise<string> {
    return this.awsService.uploadImage(image)
  }
}
