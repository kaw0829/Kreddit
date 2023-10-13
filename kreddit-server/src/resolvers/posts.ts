import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  ID,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import { Post } from '../entities/Post';
import { MyContext } from '../types';
import { forums } from '../entities/Post';
import { FieldError } from './users';
import { AppDataSource } from '../utils/data-source';
import { cursorTo } from 'readline';
import { User } from '../entities/User';

@ObjectType()
export class PostResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Post, { nullable: true })
  post?: Post;
}

@Resolver(Post)
export class PostResolver {
  @FieldResolver()
  textSnippet(@Root() post: Post): string {
    return post.body.split(' ').slice(0, 20).join(' ') as string;
  }

  // type grapql syntax for query return type function that returns string
  @Query(() => [Post])
  async posts(
    @Arg('limit', () => Int) limit: number,
    @Arg('offset', () => Int, { nullable: true }) offset: number | null
  ): Promise<Post[]> {
    // const realLimit = Math.min(limit, 50);
    const realLimit = limit;
    const realOffset = offset || 0;

    const qb = AppDataSource.getRepository(Post)
      .createQueryBuilder('post')
      .innerJoinAndSelect(
        "post.creator",
        "user",
        'user.id = post."creatorId"'
      )
      .orderBy('post.id', 'ASC')
      .take(realLimit)
      .skip(realOffset);
    const posts = await qb.getMany();
    console.log('post in query', posts);
    return posts;
  }

  @Query(() => Post, { nullable: true })
  async post(@Arg('id', () => ID) id: any): Promise<Post | null> {
    return Post.findOne(id);
  }

  @Mutation(() => PostResponse)
  async createPost(
    @Arg('title', () => String) title: string,
    @Arg('body', () => String) body: string,
    @Arg('subforum', () => String) subforum: forums,
    @Ctx() { req }: MyContext
  ): Promise<PostResponse> {
    if (req.session.userId) {
      const post = Post.create({
        title,
        body,
        subforum,
        creatorId: req.session.userId,
      });
      await post.save();
      return { post };
    }
    return {
      errors: [
        {
          field: 'title',
          message: 'You must be logged in to post',
        },
      ],
    };
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg('id', () => ID) id: any,
    @Arg('title', () => String, { nullable: true }) title: string
  ): Promise<Post | null> {
    const post = await Post.findOne(id);
    if (!post) {
      return null;
    }
    if (typeof title !== 'undefined') {
      await Post.update({ id }, { title });
    }
    return post;
  }
  @Mutation(() => Boolean)
  async deletePost(@Arg('id', () => ID) id: any): Promise<boolean> {
    const post = await Post.findOne(id);
    if (!post) {
      return false;
    }
    await Post.delete(id);
    return true;
  }
}
