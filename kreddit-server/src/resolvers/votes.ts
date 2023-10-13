import {
  Arg,
  Ctx,
  Mutation,
  Resolver,
  Root,
} from 'type-graphql';
import { MyContext } from '../types';
import { Vote } from '../entities/Vote';
import { Post } from '../entities/Post';



@Resolver(Vote)
export class VoteResolver {
  @Mutation(() => Boolean)
  async voteForPost(
    @Root() vote : Vote,
    @Arg('postId') postId: string,
    @Arg('value') value: number,
    @Ctx() { req } : MyContext) {
      const isUpVote = value !== -1;
      const VoteModifier = isUpVote ? 1 : -1;
      let voteValue;
      if (vote.vote + 1 <= 1 || vote.vote  - 1 >= -1 ) {
        voteValue = vote.vote +  VoteModifier
      }
      const { userId } = req.session;
      await Vote.insert({
        userId,
        postId,
        vote: voteValue
      })

      await Post.update(
        {
          id: postId
      })

      return true
  }
}
