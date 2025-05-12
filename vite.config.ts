import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { componentTagger } from 'lovable-tagger';

export default defineConfig(({ mode }) => ({
  server: {
    host: '::',
    port: 8081,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  define: {
    global: 'globalThis',
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-router',
      'sonner',
      'react-hook-form',
      '@hookform/resolvers',
      'zod',
      'lucide-react',
      'date-fns',
      'class-variance-authority',
      'tailwind-merge',
      'clsx',
      '@aws-amplify/auth',
      'aws-amplify',
      '@aws-amplify/core',
      '@aws-amplify/ui-react',
    ],
    force: true,
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/, /@aws-amplify\/.*/, /aws-amplify/],
    },
  },
}));
