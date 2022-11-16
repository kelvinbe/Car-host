import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'https://localhost:443/verizon2/nkl-api'
  }
})