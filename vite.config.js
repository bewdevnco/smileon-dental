import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        doctors: resolve(__dirname, 'doctors.html'),
        services: resolve(__dirname, 'services.html'),
        booking: resolve(__dirname, 'booking.html'),
        blogs: resolve(__dirname, 'blogs.html'),
      },
    },
  },
});
