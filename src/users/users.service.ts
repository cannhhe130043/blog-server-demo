import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { genSaltSync, hashSync } from 'bcrypt'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { UserEntity } from './entities/user.entity'
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private readonly repo: Repository<UserEntity>,
  ) {}

  getById = async (id: number): Promise<UserEntity> => {
    try {
      return await this.repo.findOneOrFail({ where: { id } })
    } catch {
      throw new NotFoundException('Cannot find user')
    }
  }

  findOne = (username: string): Promise<UserEntity> =>
    this.repo.findOne({
      where: {
        username,
      },
    })

  create = async (createUserDto: CreateUserDto): Promise<UserEntity> => {
    const existUsername = await this.findOne(createUserDto.username)
    if (existUsername) {
      throw new ConflictException('Username has already exist')
    }
    if (createUserDto.email) {
      const existEmail = await this.repo.findOne({
        where: {
          email: createUserDto.email,
        },
      })
      if (existEmail) {
        throw new ConflictException('Email has already exist')
      }
    }
    return this.repo.save(
      this.repo.create({
        ...createUserDto,
        password: await hashSync(createUserDto.password, genSaltSync(10)),
      }),
    )
  }
}
