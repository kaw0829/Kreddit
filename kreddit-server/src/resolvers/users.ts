import {
  Ctx,
  Mutation,
  Query,
  Resolver,
  InputType,
  Field,
  Arg,
  ObjectType,
  FieldResolver,
  Root,
} from 'type-graphql';
import { User } from '../entities/User';
import { MyContext } from '../types';
import * as bcrypt from 'bcrypt';
// argon2 instead of bcrypt for more security
import { v4 as uuidv4 } from 'uuid';
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from '../constants';
import { usernameVal } from '../utils/validation/usernameVal';
import { emailVal } from '../utils/validation/emailVal';
import { pwVal } from '../utils/validation/pwVal';
import { sendEmail } from '../utils/sendEmail';
import { UserLoginInput } from './UserLoginInput';

// ! post fix means it cant be null or undefined for typechecking purposes

@InputType()
export class ForgotPasswordToken {
  @Field(() => String)
  token!: string;

  @Field(() => String)
  userId!: string;
}

// error object to handle field errors
@ObjectType()
export class FieldError {
  @Field(() => String)
  field!: string;

  @Field(() => String)
  message!: string;
}
// response object
@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}
// TODO: add fieldresolver to protect email address from being displayed
@Resolver(User)
export class UserResolver {
  @FieldResolver(() => String)
  email(@Root() user: User, @Ctx() { req }: MyContext) {
    if (req.session.userId === user.id) {
      return user.email;
    } else {
      return '';
    }
  }

  // type grapql syntax for query return type function that returns string
  @Query(() => [User])
  users(): Promise<User[]> {
    return User.find();
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext): Promise<User | null> {
    // if no userId in session, return null
    if (!req.session.userId) {
      return null;
    }
    const user = await User.findOne({ where: { id: req.session.userId } });
    return user;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg('options', () => UserLoginInput) options: UserLoginInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    let errors = [];
    if (usernameVal(options.username)) {
      errors.push(usernameVal(options.username));
    }
    if (emailVal(options.email)) {
      errors.push(emailVal(options.email));
    }
    if (pwVal(options.password)) {
      errors.push(pwVal(options.password));
    }

    if (errors.length > 0) {
      console.log('errors', errors);
      return { errors: errors as FieldError[] };
    }

    const user = await User.findOne({ where: { username: options.username } });
    console.log('user', user);
    if (user) {
      return {
        errors: [
          {
            field: 'username',
            message: 'username already taken',
          },
        ],
      };
    }

    const hashedPassword = await bcrypt.hash(options.password, 12);

    try {
      let user3 = new User();
      user3.username = options.username as string;
      user3.password = hashedPassword as string;
      user3.email = options.email as string;

      let user4 = await User.create(user3).save();

      if (user4) {
        req.session.userId = user4.id;
        return { user: user4 };
      }
    } catch (err) {
      console.log(err);
      return {
        errors: [
          {
            field: 'username',
            message: 'unspecified error',
          },
        ],
      };
    }
    return { user: undefined };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('options', () => UserLoginInput) options: UserLoginInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    let user = null;
    if (options.username) {
      user = await User.findOne({ where: { username: options.username } });
    }
    if (options.email) {
      user = await User.findOne({ where: { email: options.email } });
    }
    if (!user) {
      return {
        errors: [
          {
            field: 'username',
            message: 'user does not exist',
          },
        ],
      };
    }

    const match = await bcrypt.compare(options.password, user.password);
    if (!match) {
      return {
        errors: [
          {
            field: 'password',
            message: 'incorrect password',
          },
        ],
      };
    }
    // req.session.user = user.username;
    req.session.userId = user.id;
    console.log('user in server', user);
    return {
      user: user,
    };
  }
  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }

        resolve(true);
      })
    );
  }

  @Mutation(() => UserResponse)
  async changePassword(
    @Ctx() { req }: MyContext,
    @Arg('token', () => String) token: string,
    @Arg('newPassword', () => String) newPassword: string
  ): Promise<UserResponse> {
    const errors = [];
    if (pwVal(newPassword)) {
      errors.push(pwVal(newPassword));
    }
    if (errors.length > 0) {
      console.log('errors', errors);
      return { errors: errors as FieldError[] };
    }
    const forgotToken = req.session.token;
    if (forgotToken && forgotToken.token === FORGET_PASSWORD_PREFIX + token) {
      const userId = forgotToken.userId;
      if (!userId) {
        return {
          errors: [
            {
              field: 'token',
              message: 'token is invalid',
            },
          ],
        };
      }
      const user = await User.findOne({ where: { id: userId } });
      if (!user) {
        return {
          errors: [
            {
              field: 'token',
              message: 'user does not exist',
            },
          ],
        };
      }
      user.password = await bcrypt.hash(newPassword, 12);
      await User.update({ id: user.id }, { password: user.password });
      req.session.userId = user.id;
      return { user };
    }
    return {
      errors: [
        {
          field: 'token',
          message: 'token is invalid',
        },
      ],
    };
  }

  @Mutation(() => Boolean)
  async forgotPassword(@Arg('email', () => String) email: string, @Ctx() { req }: MyContext) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return false;
    }
    const token = uuidv4();
    // await em.persistAndFlush(
    //   em.create(ForgotPasswordToken, {
    //     token: token,
    //     userId: user.id,
    //   })
    // );
    const forgotToken: ForgotPasswordToken = {
      token: FORGET_PASSWORD_PREFIX + token,
      userId: user.id,
    };
    req.session.token = forgotToken;

    await sendEmail(
      email,
      `<a href="http://localhost:3000/change-password/${token}">Reset Password</a>`
    );
    return true;
  }
}
