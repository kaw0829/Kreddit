import { FieldError } from '../../resolvers/users';
import { UserLoginInput } from '../../resolvers/UserLoginInput';

export const pwVal = (password: string | undefined): undefined | FieldError => {
  if (!password) {
    return {
      field: 'password',
      message: 'password is required',
    }
  }
  if (password.length < 3) {
    return {
      field: 'password',
      message: 'Password must be at least 3 characters long',
    };
  }
  if (password.includes('@')) {
    return {
      field: 'password',
      message: 'Password must not contain @',
    };
  }
};

