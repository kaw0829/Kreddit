import { FieldError } from '../../resolvers/users';

export const emailVal = (email: string | undefined): undefined | FieldError => {
  if (!email) {
    return {
      field: 'email',
      message: 'email is required',
    };
  }
  if (email.length < 3) {
    return {
      field: 'email',
      message: 'email must be at least 3 characters long',
    };
  }
  if (!email.includes('@')) {
    return {
      field: 'email',
      message: 'email must contain @',
    };
  }
};
