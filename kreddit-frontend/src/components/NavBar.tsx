import { Box, Button, Flex, Link } from '@chakra-ui/react';
import React, { Children } from 'react';
import NextLink from 'next/link';
import { useMeQuery } from '../generated/graphql';
import { useLogoutMutation } from '../generated/graphql';
import { isServer } from '../utils/isServer';
import { Logo } from './Logo';
import { AddIcon } from '@chakra-ui/icons';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react';
import Router, { useRouter } from 'next/router';

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  // pause the query when the user is not logged in and the server is not running  isserver does so by checking if the window object exists
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });

  const handleCreatePostButton = () => {
    Router.push('/createPost');
  };

  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  let body = null;
  // console.log(data);
  if (fetching) {
    body = null;
  } else if (!data?.me) {
    body = (
      <Flex>
        <NextLink href='/login' passHref>
          <Link
            color={'ivory'}
            _hover={{ color: 'blue.200' }}
            _focus={{ boxShadow: 'outline' }}
            // fontFamily='quicksand'
            fontSize='18px'
            fontWeight={700}
            mr={4}
          >
            Login
          </Link>
        </NextLink>
        <NextLink href='/register' passHref>
          <Link
            color={'ivory'}
            _hover={{ color: 'blue.200' }}
            _focus={{ boxShadow: 'outline' }}
            // fontFamily={'noto-sans'}
            fontSize='18px'
            fontWeight={700}
            mr={2}
          >
            Register
          </Link>
        </NextLink>
      </Flex>
    );
  } else {
    body = (
      <Flex>
        <Popover placement='bottom' closeOnBlur={true} trigger='hover'>
          <PopoverTrigger>
            <Button height={'inherit'} variant='Link' onClick={handleCreatePostButton}>
              <AddIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverBody textAlign={'center'}>Create Post</PopoverBody>
          </PopoverContent>
        </Popover>
        <Button
          height={'inherit'}
          variant='Link'
          color={'blue.200'}
          _hover={{ color: 'blue.400' }}
          _focus={{ boxShadow: 'outline' }}
          fontSize='18px'
          fontWeight={700}
          mr={4}
        >
          {data.me.username}
        </Button>

        <Button
          height={'inherit'}
          variant='link'
          isLoading={logoutFetching}
          _hover={{ color: 'blue.300' }}
          _focus={{ boxShadow: 'outline' }}
          onClick={() => {
            logout();
          }}
          color={'ivory'}
          // fontFamily={'noto-sans'}
          fontSize='18px'
          fontWeight={700}
          mr={2}
        >
          Logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex position='sticky' top={0} w='100%' bg={'#ff8243'} height='10' zIndex={2}>
      <Logo />
      <Flex align={'center'} ml={'auto'}>
        {body}
      </Flex>
    </Flex>
  );
};
