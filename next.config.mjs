import { defineConfig } from 'next';

export default defineConfig({
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
});
