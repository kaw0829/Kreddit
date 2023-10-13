// import { Connection, EntityManager, IDatabaseDriver } from '@mikro-orm/core';
import { Request, Response } from 'express';
import 'express-session';
import { Session, SessionData } from 'express-session';
import { ForgotPasswordToken } from './resolvers/users';
// adds the following properties to the Request object using declaration merging
declare module 'express-session' {
  interface SessionData {
    // user: string;
    userId: string;
    token: ForgotPasswordToken;
  }
}

export type MyContext = {
  // em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
  req: Request & {
    session: Session & Partial<SessionData> & { userId?: string } & { token?: ForgotPasswordToken };
  };
  res: Response;
};
