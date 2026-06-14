import path from 'node:path'
import { config } from 'dotenv'
import { defineConfig } from 'prisma/config'

config({ path: '.env.local' })

export default defineConfig({
  schema: path.join(__dirname, 'prisma', 'schema.prisma'),

  migrations: {
    seed: 'tsx ./prisma/seed.ts',
  },

  datasource: {
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL,
  },
})