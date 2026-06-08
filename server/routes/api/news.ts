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

export default defineEventHandler(async (event) => {
  try {
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
  } catch (e: any) {
    throw createError({ statusCode: 500, message: e.message })
  }
})
