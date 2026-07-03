// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // 1. Importe o plugin oficial

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss() // 2. Adicione o plugin na árvore de compilação
  ],
})
