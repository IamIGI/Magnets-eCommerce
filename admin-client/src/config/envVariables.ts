export const SERVER_URL = `${
  import.meta.env.VITE_PROD === 'true'
    ? import.meta.env.VITE_API_SERVER_URL
    : 'http://localhost'
}:${import.meta.env.VITE_PORT}`;
