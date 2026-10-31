import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const serviceId =
    process.env.EMAILJS_SERVICE_ID ||
    process.env.VITE_EMAILJS_SERVICE_ID ||
    env.EMAILJS_SERVICE_ID ||
    env.VITE_EMAILJS_SERVICE_ID ||
    '';

  const templateId =
    process.env.EMAILJS_TEMPLATE_ID ||
    process.env.VITE_EMAILJS_TEMPLATE_ID ||
    env.EMAILJS_TEMPLATE_ID ||
    env.VITE_EMAILJS_TEMPLATE_ID ||
    '';

  const publicKey =
    process.env.EMAILJS_PUBLIC_KEY ||
    process.env.VITE_EMAILJS_PUBLIC_KEY ||
    env.EMAILJS_PUBLIC_KEY ||
    env.VITE_EMAILJS_PUBLIC_KEY ||
    '';

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    define: {
      'import.meta.env.VITE_EMAILJS_SERVICE_ID': JSON.stringify(serviceId),
      'import.meta.env.VITE_EMAILJS_TEMPLATE_ID': JSON.stringify(templateId),
      'import.meta.env.VITE_EMAILJS_PUBLIC_KEY': JSON.stringify(publicKey),
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
                return 'vendor-react';
              }
              if (id.includes('motion')) {
                return 'vendor-motion';
              }
              if (id.includes('@icons-pack') || id.includes('lucide-react')) {
                return 'vendor-icons';
              }
              return 'vendor';
            }
          },
        },
      },
    },
  };
});
