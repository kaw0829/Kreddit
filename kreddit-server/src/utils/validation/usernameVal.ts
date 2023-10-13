import { FieldError } from '../../resolvers/users';

export const usernameVal = (username: string | undefined): undefined | FieldError => {
  if (!username) {
    return {
      field: 'username',
      message: 'username is required',
    }
  }
  if (username.length < 3) {
    return {
      field: 'username',
      message: 'username must be at least 3 characters long',
    };
  }
  if (username.includes(' ')) {
    return {
      field: 'username',
      message: 'username must not contain spaces',
    };
  }
};

