import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

console.log('FRONTEND_HOST:', process.env.VITE_FRONTEND_HOST);
console.log('FRONTEND_PORT:', process.env.VITE_FRONTEND_PORT);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    host: process.env.VITE_FRONTEND_HOST,
    port: parseInt(process.env.VITE_FRONTEND_PORT, 10),
  }
})
