import { db } from "~~/server/lib/db"

export default defineEventHandler(async () => {
  const users = await db.query.user.findMany()
  return users
})
