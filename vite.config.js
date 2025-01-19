import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'; // Make sure path is imported
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Change the port to 3000
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})

