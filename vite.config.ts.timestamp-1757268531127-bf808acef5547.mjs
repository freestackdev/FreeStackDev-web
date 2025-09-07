// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.js";
import { sentryVitePlugin } from "file:///home/project/node_modules/@sentry/vite-plugin/dist/esm/index.mjs";
import { analyzer } from "file:///home/project/node_modules/vite-bundle-analyzer/dist/index.mjs";
var vite_config_default = defineConfig(({ mode }) => {
  const isProduction = mode === "production";
  const shouldAnalyze = process.env.ANALYZE === "true";
  const shouldGenerateSourcemaps = process.env.GENERATE_SOURCEMAP === "true";
  const plugins = [react()];
  if (shouldAnalyze) {
    plugins.push(analyzer());
  }
  if (isProduction && shouldGenerateSourcemaps && process.env.SENTRY_AUTH_TOKEN) {
    plugins.push(
      sentryVitePlugin({
        org: process.env.SENTRY_ORG,
        project: process.env.SENTRY_PROJECT,
        authToken: process.env.SENTRY_AUTH_TOKEN,
        sourcemaps: {
          assets: "./dist/**",
          ignore: ["node_modules"],
          uploadLegacySourcemaps: false
        },
        release: {
          name: process.env.SENTRY_RELEASE || `${Date.now()}`
        }
      })
    );
  }
  return {
    plugins,
    define: {
      __DEV__: !isProduction,
      "process.env.NODE_ENV": JSON.stringify(mode)
    },
    build: {
      // Production optimizations
      minify: isProduction ? "terser" : false,
      sourcemap: shouldGenerateSourcemaps ? "hidden" : false,
      rollupOptions: {
        output: {
          // Cache-friendly hashed filenames
          entryFileNames: "assets/[name]-[hash].js",
          chunkFileNames: "assets/[name]-[hash].js",
          assetFileNames: "assets/[name]-[hash].[ext]",
          // Code splitting for better caching
          manualChunks: {
            vendor: ["react", "react-dom"],
            animations: ["framer-motion"],
            ui: ["lucide-react"]
          }
        }
      },
      terserOptions: isProduction ? {
        compress: {
          // Remove console statements in production
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ["console.log", "console.debug", "console.info", "console.warn"]
        },
        mangle: {
          safari10: true
        },
        format: {
          comments: false
        }
      } : {},
      // Chunk size warnings
      chunkSizeWarningLimit: 1e3,
      // Asset optimization
      assetsInlineLimit: 4096
    },
    // Development server configuration
    server: {
      https: false,
      // Set to true for local HTTPS development if needed
      host: true,
      port: 5173
    },
    // Preview server configuration
    preview: {
      https: false,
      // Set to true for local HTTPS preview if needed
      host: true,
      port: 4173
    },
    // Dependency optimization
    optimizeDeps: {
      exclude: ["lucide-react"],
      include: ["react", "react-dom", "framer-motion"]
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgeyBzZW50cnlWaXRlUGx1Z2luIH0gZnJvbSAnQHNlbnRyeS92aXRlLXBsdWdpbic7XG5pbXBvcnQgeyBhbmFseXplciB9IGZyb20gJ3ZpdGUtYnVuZGxlLWFuYWx5emVyJztcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+IHtcbiAgY29uc3QgaXNQcm9kdWN0aW9uID0gbW9kZSA9PT0gJ3Byb2R1Y3Rpb24nO1xuICBjb25zdCBzaG91bGRBbmFseXplID0gcHJvY2Vzcy5lbnYuQU5BTFlaRSA9PT0gJ3RydWUnO1xuICBjb25zdCBzaG91bGRHZW5lcmF0ZVNvdXJjZW1hcHMgPSBwcm9jZXNzLmVudi5HRU5FUkFURV9TT1VSQ0VNQVAgPT09ICd0cnVlJztcbiAgXG4gIGNvbnN0IHBsdWdpbnMgPSBbcmVhY3QoKV07XG4gIFxuICAvLyBBZGQgYnVuZGxlIGFuYWx5emVyIGluIGRldmVsb3BtZW50IG9yIHdoZW4gZXhwbGljaXRseSByZXF1ZXN0ZWRcbiAgaWYgKHNob3VsZEFuYWx5emUpIHtcbiAgICBwbHVnaW5zLnB1c2goYW5hbHl6ZXIoKSk7XG4gIH1cbiAgXG4gIC8vIEFkZCBTZW50cnkgcGx1Z2luIGZvciBzb3VyY2UgbWFwIHVwbG9hZCBpbiBwcm9kdWN0aW9uICh3aGVuIGNvbmZpZ3VyZWQpXG4gIGlmIChpc1Byb2R1Y3Rpb24gJiYgc2hvdWxkR2VuZXJhdGVTb3VyY2VtYXBzICYmIHByb2Nlc3MuZW52LlNFTlRSWV9BVVRIX1RPS0VOKSB7XG4gICAgcGx1Z2lucy5wdXNoKFxuICAgICAgc2VudHJ5Vml0ZVBsdWdpbih7XG4gICAgICAgIG9yZzogcHJvY2Vzcy5lbnYuU0VOVFJZX09SRyxcbiAgICAgICAgcHJvamVjdDogcHJvY2Vzcy5lbnYuU0VOVFJZX1BST0pFQ1QsXG4gICAgICAgIGF1dGhUb2tlbjogcHJvY2Vzcy5lbnYuU0VOVFJZX0FVVEhfVE9LRU4sXG4gICAgICAgIHNvdXJjZW1hcHM6IHtcbiAgICAgICAgICBhc3NldHM6ICcuL2Rpc3QvKionLFxuICAgICAgICAgIGlnbm9yZTogWydub2RlX21vZHVsZXMnXSxcbiAgICAgICAgICB1cGxvYWRMZWdhY3lTb3VyY2VtYXBzOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgICAgcmVsZWFzZToge1xuICAgICAgICAgIG5hbWU6IHByb2Nlc3MuZW52LlNFTlRSWV9SRUxFQVNFIHx8IGAke0RhdGUubm93KCl9YCxcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcGx1Z2lucyxcbiAgICBkZWZpbmU6IHtcbiAgICAgIF9fREVWX186ICFpc1Byb2R1Y3Rpb24sXG4gICAgICAncHJvY2Vzcy5lbnYuTk9ERV9FTlYnOiBKU09OLnN0cmluZ2lmeShtb2RlKSxcbiAgICB9LFxuICAgIGJ1aWxkOiB7XG4gICAgICAvLyBQcm9kdWN0aW9uIG9wdGltaXphdGlvbnNcbiAgICAgIG1pbmlmeTogaXNQcm9kdWN0aW9uID8gJ3RlcnNlcicgOiBmYWxzZSxcbiAgICAgIHNvdXJjZW1hcDogc2hvdWxkR2VuZXJhdGVTb3VyY2VtYXBzID8gJ2hpZGRlbicgOiBmYWxzZSxcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgLy8gQ2FjaGUtZnJpZW5kbHkgaGFzaGVkIGZpbGVuYW1lc1xuICAgICAgICAgIGVudHJ5RmlsZU5hbWVzOiAnYXNzZXRzL1tuYW1lXS1baGFzaF0uanMnLFxuICAgICAgICAgIGNodW5rRmlsZU5hbWVzOiAnYXNzZXRzL1tuYW1lXS1baGFzaF0uanMnLFxuICAgICAgICAgIGFzc2V0RmlsZU5hbWVzOiAnYXNzZXRzL1tuYW1lXS1baGFzaF0uW2V4dF0nLFxuICAgICAgICAgIC8vIENvZGUgc3BsaXR0aW5nIGZvciBiZXR0ZXIgY2FjaGluZ1xuICAgICAgICAgIG1hbnVhbENodW5rczoge1xuICAgICAgICAgICAgdmVuZG9yOiBbJ3JlYWN0JywgJ3JlYWN0LWRvbSddLFxuICAgICAgICAgICAgYW5pbWF0aW9uczogWydmcmFtZXItbW90aW9uJ10sXG4gICAgICAgICAgICB1aTogWydsdWNpZGUtcmVhY3QnXSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHRlcnNlck9wdGlvbnM6IGlzUHJvZHVjdGlvbiA/IHtcbiAgICAgICAgY29tcHJlc3M6IHtcbiAgICAgICAgICAvLyBSZW1vdmUgY29uc29sZSBzdGF0ZW1lbnRzIGluIHByb2R1Y3Rpb25cbiAgICAgICAgICBkcm9wX2NvbnNvbGU6IHRydWUsXG4gICAgICAgICAgZHJvcF9kZWJ1Z2dlcjogdHJ1ZSxcbiAgICAgICAgICBwdXJlX2Z1bmNzOiBbJ2NvbnNvbGUubG9nJywgJ2NvbnNvbGUuZGVidWcnLCAnY29uc29sZS5pbmZvJywgJ2NvbnNvbGUud2FybiddLFxuICAgICAgICB9LFxuICAgICAgICBtYW5nbGU6IHtcbiAgICAgICAgICBzYWZhcmkxMDogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgZm9ybWF0OiB7XG4gICAgICAgICAgY29tbWVudHM6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgfSA6IHt9LFxuICAgICAgLy8gQ2h1bmsgc2l6ZSB3YXJuaW5nc1xuICAgICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAxMDAwLFxuICAgICAgLy8gQXNzZXQgb3B0aW1pemF0aW9uXG4gICAgICBhc3NldHNJbmxpbmVMaW1pdDogNDA5NixcbiAgICB9LFxuICAgIC8vIERldmVsb3BtZW50IHNlcnZlciBjb25maWd1cmF0aW9uXG4gICAgc2VydmVyOiB7XG4gICAgICBodHRwczogZmFsc2UsIC8vIFNldCB0byB0cnVlIGZvciBsb2NhbCBIVFRQUyBkZXZlbG9wbWVudCBpZiBuZWVkZWRcbiAgICAgIGhvc3Q6IHRydWUsXG4gICAgICBwb3J0OiA1MTczLFxuICAgIH0sXG4gICAgLy8gUHJldmlldyBzZXJ2ZXIgY29uZmlndXJhdGlvblxuICAgIHByZXZpZXc6IHtcbiAgICAgIGh0dHBzOiBmYWxzZSwgLy8gU2V0IHRvIHRydWUgZm9yIGxvY2FsIEhUVFBTIHByZXZpZXcgaWYgbmVlZGVkXG4gICAgICBob3N0OiB0cnVlLFxuICAgICAgcG9ydDogNDE3MyxcbiAgICB9LFxuICAgIC8vIERlcGVuZGVuY3kgb3B0aW1pemF0aW9uXG4gICAgb3B0aW1pemVEZXBzOiB7XG4gICAgICBleGNsdWRlOiBbJ2x1Y2lkZS1yZWFjdCddLFxuICAgICAgaW5jbHVkZTogWydyZWFjdCcsICdyZWFjdC1kb20nLCAnZnJhbWVyLW1vdGlvbiddLFxuICAgIH0sXG4gIH07XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBeU4sU0FBUyxvQkFBb0I7QUFDdFAsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsd0JBQXdCO0FBQ2pDLFNBQVMsZ0JBQWdCO0FBR3pCLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBQ3hDLFFBQU0sZUFBZSxTQUFTO0FBQzlCLFFBQU0sZ0JBQWdCLFFBQVEsSUFBSSxZQUFZO0FBQzlDLFFBQU0sMkJBQTJCLFFBQVEsSUFBSSx1QkFBdUI7QUFFcEUsUUFBTSxVQUFVLENBQUMsTUFBTSxDQUFDO0FBR3hCLE1BQUksZUFBZTtBQUNqQixZQUFRLEtBQUssU0FBUyxDQUFDO0FBQUEsRUFDekI7QUFHQSxNQUFJLGdCQUFnQiw0QkFBNEIsUUFBUSxJQUFJLG1CQUFtQjtBQUM3RSxZQUFRO0FBQUEsTUFDTixpQkFBaUI7QUFBQSxRQUNmLEtBQUssUUFBUSxJQUFJO0FBQUEsUUFDakIsU0FBUyxRQUFRLElBQUk7QUFBQSxRQUNyQixXQUFXLFFBQVEsSUFBSTtBQUFBLFFBQ3ZCLFlBQVk7QUFBQSxVQUNWLFFBQVE7QUFBQSxVQUNSLFFBQVEsQ0FBQyxjQUFjO0FBQUEsVUFDdkIsd0JBQXdCO0FBQUEsUUFDMUI7QUFBQSxRQUNBLFNBQVM7QUFBQSxVQUNQLE1BQU0sUUFBUSxJQUFJLGtCQUFrQixHQUFHLEtBQUssSUFBSSxDQUFDO0FBQUEsUUFDbkQ7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNIO0FBQUEsRUFDRjtBQUVBLFNBQU87QUFBQSxJQUNMO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixTQUFTLENBQUM7QUFBQSxNQUNWLHdCQUF3QixLQUFLLFVBQVUsSUFBSTtBQUFBLElBQzdDO0FBQUEsSUFDQSxPQUFPO0FBQUE7QUFBQSxNQUVMLFFBQVEsZUFBZSxXQUFXO0FBQUEsTUFDbEMsV0FBVywyQkFBMkIsV0FBVztBQUFBLE1BQ2pELGVBQWU7QUFBQSxRQUNiLFFBQVE7QUFBQTtBQUFBLFVBRU4sZ0JBQWdCO0FBQUEsVUFDaEIsZ0JBQWdCO0FBQUEsVUFDaEIsZ0JBQWdCO0FBQUE7QUFBQSxVQUVoQixjQUFjO0FBQUEsWUFDWixRQUFRLENBQUMsU0FBUyxXQUFXO0FBQUEsWUFDN0IsWUFBWSxDQUFDLGVBQWU7QUFBQSxZQUM1QixJQUFJLENBQUMsY0FBYztBQUFBLFVBQ3JCO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLGVBQWUsZUFBZTtBQUFBLFFBQzVCLFVBQVU7QUFBQTtBQUFBLFVBRVIsY0FBYztBQUFBLFVBQ2QsZUFBZTtBQUFBLFVBQ2YsWUFBWSxDQUFDLGVBQWUsaUJBQWlCLGdCQUFnQixjQUFjO0FBQUEsUUFDN0U7QUFBQSxRQUNBLFFBQVE7QUFBQSxVQUNOLFVBQVU7QUFBQSxRQUNaO0FBQUEsUUFDQSxRQUFRO0FBQUEsVUFDTixVQUFVO0FBQUEsUUFDWjtBQUFBLE1BQ0YsSUFBSSxDQUFDO0FBQUE7QUFBQSxNQUVMLHVCQUF1QjtBQUFBO0FBQUEsTUFFdkIsbUJBQW1CO0FBQUEsSUFDckI7QUFBQTtBQUFBLElBRUEsUUFBUTtBQUFBLE1BQ04sT0FBTztBQUFBO0FBQUEsTUFDUCxNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsSUFDUjtBQUFBO0FBQUEsSUFFQSxTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUE7QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxJQUNSO0FBQUE7QUFBQSxJQUVBLGNBQWM7QUFBQSxNQUNaLFNBQVMsQ0FBQyxjQUFjO0FBQUEsTUFDeEIsU0FBUyxDQUFDLFNBQVMsYUFBYSxlQUFlO0FBQUEsSUFDakQ7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
