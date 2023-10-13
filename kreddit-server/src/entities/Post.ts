import { cp } from 'fs';
import { Field, FieldResolver, ObjectType, Root } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { NIL } from 'uuid';
import { User } from './User';
import { Vote } from './Vote';

// TODO: retrieve creator of post object and add author name to post

export type forums =
  | 'general'
  | 'random'
  | 'memes'
  | 'funny'
  | 'programming'
  | 'news'
  | 'gaming'
  | 'music'
  | 'movies'
  | 'tv'
  | 'books'
  | 'science'
  | 'technology'
  | 'food'
  | 'sports'
  | 'other';

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field(() => String)
  @Column({ type: 'text' })
  title!: string;

  @Field(() => String)
  @Column({ type: 'text' })
  body!: string;

  @Field(() => String)
  @Column({ type: 'text' })
  subforum!: forums;

  @Field(() => Number)
  @Column({ type: 'int', default: 0 })
  votes!: number;

  @Field(() => Number)
  @Column()
  creatorId!: Number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt!: Date;

  //the field decorater exposes the field as a field in the graphql schema
  @Field(() => String)
  @UpdateDateColumn()
  updatedAt!: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.posts)
  creator!: User;

  @OneToMany(() => Vote, (vote) => vote.post)
  vote!: Vote[];
}
