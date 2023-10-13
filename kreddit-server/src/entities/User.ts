// import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, ObjectType } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Post } from './Post';
import { Vote } from './Vote';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field(() => String)
  @Column({ type: 'text', unique: true })
  username!: string;

  @Field(() => String)
  @Column({ type: 'text', unique: true })
  email!: string;

  @Column({ type: 'text' })
  password!: string;

  @OneToMany(() => Post, (post) => post.creator)
  posts?: Post[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: any;

  //the field decorater exposes the field as a field in the graphql schema
  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: any;

  @OneToMany(() => Vote, (vote) => vote.user )
  Vote!: Vote[]
}
