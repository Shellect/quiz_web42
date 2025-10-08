import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],

  // Корневая директория с исходными файлами
  root: path.resolve(__dirname, 'frontend'),

  // Настройки сервера разработки
  server: {
    port: 3000,
    open: true, // автоматически открывать браузер
    cors: true,
  },

  // Настройки сборки
  build: {
    outDir: path.resolve(__dirname, 'public/js'),
    emptyOutDir: true, // очищать выходную директорию перед сборкой
    sourcemap: true,
    minify: 'esbuild',
  },

  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: [
          'import',
          'mixed-decls',
          'color-functions',
          'global-builtin',
        ],
      }
    }
  }
})