const allowedOrigins: string[] = [
  'http://localhost:5173', //VITE, SVELTE - dev
  'http://localhost:5174', //VITE, SVELTE - dev (admin)
  'http://localhost:4173', //VITE, SVELTE - test prod
  'http://localhost:4174', //VITE, SVELTE - test prod (admin)
];

export default allowedOrigins;
