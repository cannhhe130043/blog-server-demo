import { Injectable } from '@nestjs/common'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { UserEntity } from '../../users/entities/user.entity'

@Injectable()
@Entity('posts')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'text',
  })
  title: string

  @Column({
    type: 'text',
  })
  content: string

  @Column({
    default: false,
  })
  isPrivate: boolean

  @Column({ nullable: true })
  image: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdTime: Date

  @ManyToOne(_ => UserEntity, { onDelete: 'CASCADE' })
  user: UserEntity
}
