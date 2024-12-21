export const SERVER_URL =
  import.meta.env.VITE_PROD === 'true'
    ? import.meta.env.VITE_API_SERVER_URL_PROD
    : import.meta.env.VITE_API_SERVER_URL_DEV;
