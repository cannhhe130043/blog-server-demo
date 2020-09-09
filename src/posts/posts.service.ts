import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PostEntity } from './entities/post.entity'

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity) private readonly repo: Repository<PostEntity>,
  ) {}
}
