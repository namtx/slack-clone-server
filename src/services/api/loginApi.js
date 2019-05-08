import { instance } from './axios';

export const LOGIN_MUTATION = `
  mutation loginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok,
      token,
      refreshToken,
      errors {
        path,
        message
      }
    }
  }
`;

export default async loginFormValues => (
  instance.post('/', {
    query: LOGIN_MUTATION,
    variables: loginFormValues,
  })
);
