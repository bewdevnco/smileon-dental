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
        impact: resolve(__dirname, 'impact.html'),
        booking: resolve(__dirname, 'booking.html'),
        blogs: resolve(__dirname, 'blogs.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        blogRct: resolve(__dirname, 'blog-root-canal-treatment-bangalore.html'),
        blogCleaning: resolve(__dirname, 'blog-teeth-cleaning-cost-bangalore.html'),
        blogAligners: resolve(__dirname, 'blog-clear-aligners-vs-braces.html'),
        blogEmergency: resolve(__dirname, 'blog-dental-emergency-toothache-guide.html'),
        blogImplants: resolve(__dirname, 'blog-dental-implants-safety-cost.html'),
        blogRoutine: resolve(__dirname, 'blog-routine-dental-checkup-guide.html'),
      },
    },
  },
});
