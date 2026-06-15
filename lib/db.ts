import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL!
  if (!connectionString) throw new Error('DATABASE_URL environment variable is not set.')
  // max:2 prevents connection exhaustion on Supabase free tier (20-connection limit)
  const adapter = new PrismaPg({ connectionString, max: 2 })
  return new PrismaClient({ adapter })
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const db = globalForPrisma.prisma ?? createPrismaClient()

// Cache the client in dev to avoid hot-reload connection churn
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
