import { Field, ObjectType } from 'type-graphql';
import { Entity, Column, BaseEntity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Post } from './Post';
import { User } from './User';

@ObjectType()
@Entity()
export class Vote extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn()
  userId!: string;

  @Field(() => User)
  @ManyToOne(() => User)
  user!: User;

  @Field(() => String)
  @PrimaryColumn()
  postId!: string;

  @Field(() => Post)
  @ManyToOne(() => Post)
  post!: Post;

  @Field(() => Number)
  @Column({ type: 'int', default: 0 })
  vote!: number;
}
