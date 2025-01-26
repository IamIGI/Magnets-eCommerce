function getEnv(key: string, defaultValue?: string): string {
  const value = process.env[key] || defaultValue;
  if (!value) throw new Error(`Environment variable ${key} is not defined`);

  return value;
}

export const DB_URL =
  getEnv('PROD') === 'true'
    ? getEnv('DATABASE_URI_PROD')
    : getEnv('DATABASE_URI_DEV');

export const PROD = getEnv('PROD', 'false');
export const PORT = getEnv('PORT', '4000');
export const APP_ORIGIN = getEnv('APP_ORIGIN');
export const JWT_SECRET = getEnv('JWT_SECRET');
export const JWT_REFRESH_SECRET = getEnv('JWT_REFRESH_SECRET');
export const EMAIL_SENDER = getEnv('EMAIL_SENDER');
export const RESEND_API_KEY = getEnv('RESEND_API_KEY');
