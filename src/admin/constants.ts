export interface AdminCredentials {
  email: string;
  password: string;
}

const isProduction: boolean = process.env.NODE_ENV === 'production';

const adminEmail: string =
  (process.env.ADMIN_EMAIL as string | undefined) ?? (isProduction ? '' : 'admin@example.com');

const adminPassword: string =
  (process.env.ADMIN_PASSWORD as string | undefined) ?? (isProduction ? '' : 'password');

export const DEFAULT_ADMIN: AdminCredentials = {
  email: adminEmail,
  password: adminPassword,
};
