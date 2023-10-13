import 'reflect-metadata';

import { COOKIE_NAME, __prod__ } from './constants';

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { PostResolver } from './resolvers/posts';
import { UserResolver } from './resolvers/users';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import cors from 'cors';
import { AppDataSource } from './utils/data-source';
import { VoteResolver } from './resolvers/votes';

const main = async () => {
  // sendEmail('kaw0829@gmail.com', '<h1>Hello</h1>');

  const connection = await AppDataSource.initialize();

  // connection.runMigrations({
  //   transaction: 'all',
  // });
  // connection.dropDatabase();
  // const orm = await MikroORM.init(mikroOrmConfig);
  // delete users from db
  // await orm.em.nativeDelete(User, {});
  // await orm.getMigrator().up();
  // const post = orm.em.create(Post, {
  //   title: 'Hello',
  //   updatedAt: new Date(),
  //   createdAt: new Date(),
  //   id: uuidv4(),
  // });
  // await orm.em.persistAndFlush(post);

  // const posts = await orm.em.find(Post, {});
  // console.log(posts);

  //  comment out to allow studio to work
  const app = express();
  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );
  // uncomment below two app.use to allow studio to work
  // app.use(
  //   cors()
  // )
  //   app.use(function (_req, res, next) {
  //     //   //first and last line for access to studio
  //     res.header('Access-Control-Allow-Origin', '*');
  //     res.header('access-control-allow-methods', 'POST');
  //     //   // res.header('http://localhost:3000', 'credenitials: true');
  //     //   // res.header('Access-Control-Allow-Origin', 'https://studio.apollographql.com');
  //     //   // res.header('Access-Control-Allow-Credentials', 'true');
  //     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  //     next();
  //   }),

  app.set('trust proxy', true);
  // app.use((_req, res) => {
  //   res.setHeader('Access-Control-Allow-Origin', '*');
  // });
  app.use(
    session({
      name: COOKIE_NAME,
      // hide this with enviroment variable later
      secret: 'saflkmsnfmasofknm',
      // update url to use process.env
      store: MongoStore.create({
        mongoUrl:
          'mongodb+srv://Ken:Arthur@cluster0.q02cn.mongodb.net/FULLSTACK-TS-SESSION?retryWrites=true&w=majority',
      }),
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
        sameSite: 'lax', //csrf
        secure: false, //cookie only works in https if true:
      },
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver, UserResolver, VoteResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  // must await apolloServer.applyMiddleware({app});
  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(4000, () => {
    console.log('server running on http://localhost:4000/graphql');
  });
};

main().catch((err) => {
  console.error(err);
});
