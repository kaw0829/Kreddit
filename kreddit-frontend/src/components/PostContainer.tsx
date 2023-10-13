import { Button } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { createRouteLoader } from 'next/dist/client/route-loader';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { usePostsQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { Post } from './Post';

export const PostContainer: React.FC = ({}) => {
  let observer = useRef<IntersectionObserver | null>(null);

  const [variables, setVariables] = useState({
    limit: 10,
    offset: 0,
  });

  const [{ fetching, data }] = usePostsQuery({
    variables: {
      limit: variables.limit,
      offset: variables.offset,
    },
  });

  // const [isfetching, setFetching] = useState(false);
  const [posts, setPosts] = useState<
    Array<{
      __typename?: 'Post';
      id: string;
      title: string;
      textSnippet: string;
      subforum: string;
      votes: number;
      createdAt: string;
      updatedAt: string;
      creator: {
        id: string;
        username: string;
        email: string;
      };
    }>
  >([]);

  useEffect(() => {
    if (data && !fetching) {
      // setFetching(fetching)
      setPosts(data.posts);
    }
  }, [data, fetching]);

  const handleMorePosts = () => {
    setVariables({
      ...variables,
      offset: variables.offset === null ? variables.limit : variables.offset + variables.limit,
    });
  };

  const lastElementRef = useCallback(
    (node) => {
      if(fetching) return
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setVariables({
            ...variables,
            offset:
              variables.offset === null ? variables.limit : variables.offset + variables.limit,
          });
        }
      });
      if (node) observer.current.observe(node);
    },
    [fetching, variables]
  );

  return (
    <div>
      {!posts
        ? null
        : posts.map((p, i) => {
            if (posts.length === i + 1) {
              return (
                <div  key={p.id}  ref={lastElementRef}>
                  <Post
                    key={p.id}
                    subforum={p.subforum}
                    title={p.title}
                    textSnippet={p.textSnippet}
                    votes={p.votes}
                    createdBy = {p.creator.username
                    }
                  />
                </div>
              );
            } else
              return (
                <Post
                  key={p.id}
                  subforum={p.subforum}
                  title={p.title}
                  textSnippet={p.textSnippet}
                  votes={p.votes}
                  createdBy = {p.creator.username
                  }
                />
              );
          })}
      <Button onClick={handleMorePosts}>Load More Posts</Button>
    </div>
  );
};
