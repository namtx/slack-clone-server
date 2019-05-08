import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://localhost:4000/graphql',
  timeout: 10 * 1000,
});

export default {};
