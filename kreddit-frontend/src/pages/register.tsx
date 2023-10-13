import React from 'react';
import { Formik, Form } from 'formik';
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import { createUrqlClient } from '../utils/createUrqlClient';
import { withUrqlClient } from 'next-urql';

interface registerProps {}

// const REGISTER_MUTATION = `
// mutation Register($username: String!, $password: String!) {
//   register(options: {username: $username, password: $password}) {
//     errors {
//       field
//       message
//     }
//     user {
//       id
//       username
//     }
//   }
// }
// `;

export const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [_, register] = useRegisterMutation();
  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ username: '', email: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          // console.log(values);
          const response = await register(values);
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
            // success
            router.push('/');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name='username' placeholder='username' label='username' type='text' />
            <Box mt={4}>
              <InputField name='email' placeholder='email' label='email' type='email' />
            </Box>
            <InputField name='password' placeholder='password' label='password' type='password' />

            <Button
              mt={4}
              type='submit'
              _hover={{ bgColor: 'teal.500' }}
              bgColor='blue.300'
              isLoading={isSubmitting}
              colorScheme='teal'
            >
              register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
