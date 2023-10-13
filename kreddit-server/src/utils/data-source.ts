import { DataSource } from 'typeorm';

import { __prod__ } from '../constants';
import { Post } from '../entities/Post';
import path from 'path';
import { User } from '../entities/User';
import { Vote } from '../entities/Vote';

export const AppDataSource = new DataSource({
  type: 'postgres',
  // host: 'localhost',
  // port: 4000,
  username: 'postgres',
  password: 'Arthur',
  database: 'Kreddit',
  synchronize: true,
  logging: true,
  entities: [User, Post, Vote],
});

//  typing is type of parameters of mikroOrm.init returns array so [0]
// migrationsRun: true,
// // subscribers: [],
// migrations: [path.join(__dirname, '../migrations/*.js')],

// export default {
//   migrations: {
// path: path.join(__dirname, './migrations'), // path to the folder with migrations
//     pattern: /^[\w-]+\d+\.(js|ts)$/, // regex pattern for the migration files
//   },
//   allowGlobalContext: true,
//   password: 'Arthur',
//   user: 'postgres',
//   dbName: 'Kreddit',
//   entities: [Post, User],
//   type: 'postgresql',

//   debug: !__prod__,
// };
