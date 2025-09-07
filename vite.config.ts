import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { sentryVitePlugin } from '@sentry/vite-plugin';
import { analyzer } from 'vite-bundle-analyzer';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  const shouldAnalyze = process.env.ANALYZE === 'true';
  const shouldGenerateSourcemaps = process.env.GENERATE_SOURCEMAP === 'true';
  
  const plugins = [react()];
  
  // Add bundle analyzer in development or when explicitly requested
  if (shouldAnalyze) {
    plugins.push(analyzer());
  }
  
  // Add Sentry plugin for source map upload in production (when configured)
  if (isProduction && shouldGenerateSourcemaps && process.env.SENTRY_AUTH_TOKEN) {
    plugins.push(
      sentryVitePlugin({
        org: process.env.SENTRY_ORG,
        project: process.env.SENTRY_PROJECT,
        authToken: process.env.SENTRY_AUTH_TOKEN,
        sourcemaps: {
          assets: './dist/**',
          ignore: ['node_modules'],
          uploadLegacySourcemaps: false,
        },
        release: {
          name: process.env.SENTRY_RELEASE || `${Date.now()}`,
        },
      })
    );
  }

  return {
    plugins,
    define: {
      __DEV__: !isProduction,
      'process.env.NODE_ENV': JSON.stringify(mode),
    },
    build: {
      // Production optimizations
      minify: isProduction ? 'terser' : false,
      sourcemap: shouldGenerateSourcemaps ? 'hidden' : false,
      rollupOptions: {
        output: {
          // Cache-friendly hashed filenames
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]',
          // Code splitting for better caching
          manualChunks: {
            vendor: ['react', 'react-dom'],
            animations: ['framer-motion'],
            ui: ['lucide-react'],
          },
        },
      },
      terserOptions: isProduction ? {
        compress: {
          // Remove console statements in production
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.debug', 'console.info', 'console.warn'],
        },
        mangle: {
          safari10: true,
        },
        format: {
          comments: false,
        },
      } : {},
      // Chunk size warnings
      chunkSizeWarningLimit: 1000,
      // Asset optimization
      assetsInlineLimit: 4096,
    },
    // Development server configuration
    server: {
      https: false, // Set to true for local HTTPS development if needed
      host: true,
      port: 5173,
    },
    // Preview server configuration
    preview: {
      https: false, // Set to true for local HTTPS preview if needed
      host: true,
      port: 4173,
    },
    // Dependency optimization
    optimizeDeps: {
      exclude: ['lucide-react'],
      include: ['react', 'react-dom', 'framer-motion'],
    },
  };
});
