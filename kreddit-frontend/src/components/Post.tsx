import React, { useCallback, useRef, useState } from 'react';
import { Heading, Text, Flex, Box, Button, BoxProps } from '@chakra-ui/react';
import { TriangleUpIcon, TriangleDownIcon } from '@chakra-ui/icons';
interface PostProps {
  subforum: string;
  title: string;
  textSnippet: string;
  votes: number;
  createdBy: string;
}
// {!data ? null : data.posts.map(p => <div key={p.id}>{p.title}</div>)}
export const Post: React.FC<PostProps> = ({ subforum, title, textSnippet, votes, createdBy }) => {
  //  const PostRef = useRef(null)

  const [upVote, setUpVote] = useState(votes);
  return (
    <Box mt={4}>
      <Flex align={'flex-end'}>
        <Heading fontWeight={'bold'} fontFamily={'quicksand'} ml={1}>
          {title}
        </Heading>

        <Heading color={'blue.500'} ml={1} size='sm'>{`#${subforum}`}</Heading>
      </Flex>

      <Text ml={6}>{textSnippet}</Text>
      <Text ml={6} fontSize={'x-small'}>
        Created By:{' '}
        <Text as='strong' color='blueviolet'>
          {createdBy}
        </Text>
      </Text>
      <Flex ml={6} align={'center'}>
        <Button
          variant='link'
          _hover={{ color: 'blue.300' }}
          _focus={{ boxShadow: 'outline' }}
          onClick={() => {
            console.log('up');
            setUpVote(upVote + 1);
          }}
          color={'ivory'}
          // fontFamily={'noto-sans'}
          fontSize='18px'
          fontWeight={600}
        >
          <TriangleUpIcon color={'teal.500'} />
        </Button>

        <Text ml={0}>{upVote}</Text>

        <Button
          variant='link'
          _hover={{ color: 'blue.300' }}
          _focus={{ boxShadow: 'outline' }}
          onClick={() => {
            console.log('down');
            setUpVote(upVote - 1);
          }}
          color={'ivory'}
          // fontFamily={'noto-sans'}
          fontSize='18px'
          fontWeight={600}
        >
          <TriangleDownIcon color={'red.300'} />
        </Button>
      </Flex>
    </Box>
  );
};
