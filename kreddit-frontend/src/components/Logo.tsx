import React from 'react';
import NextImage from 'next/image';
import { Flex, Heading } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';

export const Logo: React.FC = ({}) => {
  return (
    <Flex flexDir={'row'} alignItems={'center'} justifyContent={'center'}>
      <Image ml={2} alt='robot ' width={8} height={8} src='robo-sprite2.svg'>
      </Image>

      <Heading ml={0} fontFamily='quicksand' fontWeight='bold' fontSize='28' color='ivory'>
        Kreddit
      </Heading>
    </Flex>
  );
};
