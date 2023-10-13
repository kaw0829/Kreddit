import React from 'react';
import { Formik, Form } from 'formik';
import { Box, Button, Flex, Link } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import NextLink from 'next/link';
interface loginProps {}

export const Login: React.FC<loginProps> = ({}) => {
  const router = useRouter();
  const [_, login] = useLoginMutation();
  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ username: '', email: '', password: '', usernameOrEmail: '' }}
        onSubmit={async (values, { setErrors }) => {
          values.usernameOrEmail.includes('@')
            ? (values.email = values.usernameOrEmail)
            : (values.username = values.usernameOrEmail);
          const values2 = {
            username: values.username,
            email: values.email,
            password: values.password,
          };
          // console.log(values2);
          const response = await login(values2);
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            // success
            if (typeof router.query.next === 'string') {
              router.push(router.query.next);
            } else {
              router.push('/');
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name='usernameOrEmail'
              placeholder='username or email'
              label='username or email'
              type='text'
            />
            <Box mt={4}>
              <InputField name='password' placeholder='password' label='password' type='password' />
            </Box>
            <Flex justifyContent={'space-between'}>
              <Button
                mt={4}
                _hover={{ bgColor: 'teal.500' }}
                bgColor='blue.300'
                type='submit'
                isLoading={isSubmitting}
                colorScheme='teal'
              >
                LOGIN
              </Button>
              <NextLink href='/forgotPassword' passHref>
                <Link fontSize={12} fontWeight={500}>
                  forgot password?
                </Link>
              </NextLink>
            </Flex>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
