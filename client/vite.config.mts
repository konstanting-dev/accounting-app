/* eslint-disable import/no-extraneous-dependencies */
import { resolve } from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { config as configDotEnv } from 'dotenv';
import checker from 'vite-plugin-checker';

const localDotEnv = configDotEnv({ path: '.env.local' }).parsed;
const dotEnv = configDotEnv({ path: '.env' }).parsed;

export default defineConfig({
  plugins: [react(), tsconfigPaths(), checker({ typescript: true })],
  publicDir: resolve(__dirname, 'src/assets'),
  define: {
    'process.env': { ...dotEnv, ...localDotEnv },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    // port: 3000,
    // open: true,
    host: true,
  },
  build: {
    outDir: 'build',
  },
});
