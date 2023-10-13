import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';

import router from 'next/router';
import React, { useState } from 'react';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useForgotPasswordMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';

interface forgotPasswordProps {}

const ForgotPassword: React.FC<forgotPasswordProps> = ({}) => {
  let [displayMessage, setDisplayMessage] = useState(false);
  const [_, forgotPassword] = useForgotPasswordMutation();
  return (
    <Wrapper variant='regular'>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={async (values, { setErrors }) => {
          // console.log(values);
          forgotPassword({ email: values.email });
          setDisplayMessage(true);
          setTimeout(() => {
            setDisplayMessage(false);
            router.push('/');
          }, 5000);
        }}
      >
        {({ isSubmitting }) => (
          <Flex direction='column'>
            <Heading textAlign={'center'} size='xl'>
              Reset Password
            </Heading>
            <Form>
              <InputField name='email' placeholder='email' label='email' type='text' />
              <Button
                mt={4}
                _hover={{ bgColor: 'teal.500' }}
                bgColor='blue.300'
                type='submit'
                isLoading={isSubmitting}
                colorScheme='teal'
              >
                SUBMIT
              </Button>
            </Form>
            {displayMessage && (
              <Box mt='3'>Check your email for a link to reset your password.</Box>
            )}
          </Flex>
        )}
      </Formik>
    </Wrapper>
  );
};
export default withUrqlClient(createUrqlClient)(ForgotPassword);
