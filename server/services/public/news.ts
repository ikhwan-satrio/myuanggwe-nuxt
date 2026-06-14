import { Effect } from "effect";
import { RedisService } from "../../lib/redis/context";
import { H3Event } from "h3"
import { XMLParser } from 'fast-xml-parser'


const RSS_URL = 'https://www.cnbcindonesia.com/rss'

interface Article {
  title: string
  link: string
  pubDate: string
  description: string
  image: string | null
}

function stripHtml(str: string) {
  return str.replace(/<[^>]*>/g, '').trim()
}

function extractImgSrc(html: string): string | null {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/)
  return match?.[1] ?? null
}

function cleanDescription(html: string): string {
  const noImg = html.replace(/<img[^>]*\/?>/g, '')
  return stripHtml(noImg).slice(0, 250)
}


export class NewsService extends Effect.Service<NewsService>()('NewsService', {
  dependencies: [RedisService.Live],
  effect: Effect.gen(function* () {
    const redis = yield* RedisService

    return {
      async getNews(event: H3Event) {
        return redis.withBackendCache('news', async () => {
          const res = await fetch(RSS_URL, {
            headers: event.headers
          })
          const xml = await res.text()

          const parser = new XMLParser({
            ignoreAttributes: false,
            attributeNamePrefix: '@_',
          })

          const doc = parser.parse(xml)
          const items = doc?.rss?.channel?.item ?? []
          const list: any[] = Array.isArray(items) ? items : [items]

          const articles: Article[] = list.map((item: any) => {
            const descriptionHtml = item.description ?? ''
            const contentEncoded = item['content:encoded'] ?? ''

            return {
              title: stripHtml(item.title ?? ''),
              link: item.link ?? '',
              pubDate: item.pubDate ?? '',
              description: cleanDescription(contentEncoded || descriptionHtml),
              image: item.enclosure?.['@_url'] ?? extractImgSrc(descriptionHtml) ?? null,
            }
          })

          return articles
        }, 3)
      }
    }
  })
}) { }
