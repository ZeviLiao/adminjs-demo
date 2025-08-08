import componentLoader from './component-loader.js';
import { DEFAULT_ADMIN } from './constants.js';

/**
 * Make sure to modify "authenticate" to be a proper authentication method
 */
const authenticate = async (email: string, password: string) => {
  const configuredAdminEmail = process.env.ADMIN_EMAIL ?? DEFAULT_ADMIN.email;
  const configuredAdminPassword = process.env.ADMIN_PASSWORD ?? DEFAULT_ADMIN.password;
  if (email === configuredAdminEmail && password === configuredAdminPassword) {
    return { email } as const;
  }
  return null;
};

export default authenticate;
