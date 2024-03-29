
import { withUrqlClient } from 'next-urql';
import Head from 'next/head';
import { NavBar } from '../components/NavBar';
import { PostContainer } from '../components/PostContainer';

import { createUrqlClient } from '../utils/createUrqlClient';



const Index = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <NavBar />
      <PostContainer/>
    </div>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
