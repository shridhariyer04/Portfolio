import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    minify: "esbuild", // Set to "terser" or false if issues persist
    sourcemap: true, // Helps debug issues in production
    rollupOptions: {
      output: {
        manualChunks: undefined, // Ensures proper chunk splitting
      },
    },
  },
  server: {
    open: true, // Auto-opens the browser when running dev
    strictPort: true, // Ensures Vite doesn't auto-switch ports
  },
  optimizeDeps: {
    esbuildOptions: {
      keepNames: true, // Prevents minifier from stripping function/class names
    },
  },
});


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
