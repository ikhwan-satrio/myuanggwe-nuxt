import { runEffect } from "~~/server/lib/composables"
import { NewsService } from "~~/server/lib/services/public/news"


export default defineEventHandler(async (event) => {
  try {
    return runEffect(NewsService, (svc) => svc.getNews(event))
  } catch (e: any) {
    throw createError({ statusCode: 500, message: e.message })
  }
})
