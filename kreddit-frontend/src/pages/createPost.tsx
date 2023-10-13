import { Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import { InputField } from '../components/InputField';
import { Layout } from '../components/Layout';
import { TextareaField } from '../components/TextareaField';
import { useCreatePostMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { toErrorMap } from '../utils/toErrorMap';
import { useIsAuth } from '../utils/useIsAuth';

interface createPostProps {}

export const CreatePost: React.FC<createPostProps> = ({}) => {
  useIsAuth();
  const router = useRouter();
  const [_, createPost] = useCreatePostMutation();
  return (
    <Layout variant='small'>
      <Formik
        initialValues={{ title: '', body: '', subforum: '' }}
        onSubmit={async (values, { setErrors }) => {
          // console.log(values);
          const response = await createPost(values);
          if (response.data?.createPost.errors) {
            setErrors(toErrorMap(response.data.createPost.errors));
          } else if (response.data?.createPost.post) {
            // success
            router.push('/');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name='title' placeholder='title' label='title' type='text' />

            <InputField name='subforum' placeholder='subforum' label='subforum' type='text' />
            <TextareaField
              name='body'
              placeholder='content'
              label='content'
              type='textarea'
              cols='33'
            />

            <Button
              mt={4}
              type='submit'
              _hover={{ bgColor: 'teal.500' }}
              bgColor='blue.300'
              isLoading={isSubmitting}
              colorScheme='teal'
            >
              Create Post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
