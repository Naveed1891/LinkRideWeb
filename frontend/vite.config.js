import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})

//import { defineConfig } from 'vite'
//import dns from 'node:dns'

//dns.setDefaultResultOrder('verbatim')

//export default defineConfig({
  // omit
//})