import componentLoader from './component-loader.js';
import { DEFAULT_ADMIN } from './constants.js';

/**
 * Make sure to modify "authenticate" to be a proper authentication method
 */
const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return { email };
  }

  return null;
};

export default authenticate;
