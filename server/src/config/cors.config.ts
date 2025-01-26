const allowedOrigins: string[] = [
  'http://localhost:5173', //VITE, SVELTE - dev
  'http://localhost:5174', //VITE, SVELTE - dev (admin)
  'http://localhost:4173', //VITE, SVELTE - test prod
  'http://localhost:4174', //VITE, SVELTE - test prod (admin)
  'http://igitest.pl',
  'http://www.igitest.pl',
  'https://igitest.pl',
  'https://www.igitest.pl',
  'http://admin.igitest.pl',
  'https://admin.igitest.pl',
];

const corsOptions = {
  // @ts-ignore - to ignore typescript warnings
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      //remove '!origin' after development
      callback(null, true); //send true when origin url in the whitelist
    } else {
      callback(new Error(`Not allowed by CORS\n url: ${origin}`));
    }
  },
  optionsSuccessStatus: 200,
};

export default corsOptions;
