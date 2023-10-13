import { Box, Flex, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import router from 'next/router';
import React from 'react';
import { InputField } from '../../components/InputField';
import { Wrapper } from '../../components/Wrapper';
import { useChangePasswordMutation } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { toErrorMap } from '../../utils/toErrorMap';

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const [_, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = React.useState('');
  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ password: '', verifyPassword: '' }}
        onSubmit={async (values, { setErrors }) => {
          if (values.password !== values.verifyPassword) {
            setErrors({
              verifyPassword: 'Passwords must match',
            });
          } else {
            const response = await changePassword({
              newPassword: values.verifyPassword,
              token,
            });
            if (response.data?.changePassword.errors) {
              console.log('error3 ', +response.data.changePassword.errors);
              const errorMap = toErrorMap(response.data.changePassword.errors);
              if ('token' in errorMap) {
                console.log('errormap', +errorMap.token);
                setTokenError(errorMap.token);
              } else {
                console.log('errormap2', +errorMap.token);
                setErrors(errorMap);
              }
            } else if (response.data?.changePassword.user) {
              router.push('/');
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name='password'
              placeholder='password'
              label='new password'
              type='password'
            />
            <Box mt={4}>
              <InputField
                name='verifyPassword'
                placeholder='verify password'
                label='verify new password'
                type='password'
              />
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
                Change Password
              </Button>
              {tokenError && (
                <Box color='red.500' mt={4}>
                  {tokenError}
                </Box>
              )}
            </Flex>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default withUrqlClient(createUrqlClient)(ChangePassword);
