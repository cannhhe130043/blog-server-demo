import { Injectable } from '@nestjs/common'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Injectable()
@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    unique: true,
    length: 50,
  })
  username: string

  @Column()
  password: string

  @Column({
    type: 'text',
    default: ''
  })
  firstName: string

  @Column({
    type: 'text',
    default: ''
  })
  lastName: string

  @Column({ nullable: true })
  image: string

  @Column({
    default: 'Welcome to my blog',
    type: 'text',
  })
  intro: string

  @Column({
    unique: true,
    nullable: true
  })
  email: string
}
