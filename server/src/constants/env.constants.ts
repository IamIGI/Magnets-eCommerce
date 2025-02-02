function getEnv(key: string, defaultValue?: string): string {
  const value = process.env[key] || defaultValue;
  if (!value) throw new Error(`Environment variable ${key} is not defined`);

  return value;
}

const DB_URL =
  getEnv('PROD') === 'true'
    ? getEnv('DATABASE_URI_PROD')
    : getEnv('DATABASE_URI_DEV');

const PROD = getEnv('PROD', 'false');
const PORT = getEnv('PORT', '4000');
const APP_ORIGIN = getEnv('APP_ORIGIN'); // frontend
const JWT_SECRET = getEnv('JWT_SECRET');
const JWT_REFRESH_SECRET = getEnv('JWT_REFRESH_SECRET');
const EMAIL_SENDER = getEnv('EMAIL_SENDER');
const RESEND_API_KEY = getEnv('RESEND_API_KEY');

export default {
  DB_URL,
  PROD,
  PORT,
  APP_ORIGIN,
  JWT_SECRET,
  JWT_REFRESH_SECRET,
  EMAIL_SENDER,
  RESEND_API_KEY,
};
