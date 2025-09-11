import Mock from 'mockjs'
import type { WaterfallItem } from '~/types/index.dto'

export function mockData(): Promise<WaterfallItem[]> {
  const responseTime = Mock.Random.integer(300, 1000)
  return new Promise((resolve) => {
    const items = Array.from({ length: 20 }).map(() => {
      const width = Mock.Random.integer(320, 480)
      const ratio = Mock.Random.float(1.2, 1.8, 1, 1)
      const height = Math.floor(width * ratio)

      const id = Mock.Random.integer(100000, 999999)

      const tagsPool = [
        'Portrait',
        'Mobile',
        'City',
        'Nature',
        'Night',
        'People',
        'Food',
        'Travel',
        'Tech',
        'Art',
        'Fashion',
        'Street',
        'Minimal',
        'Color',
        'B&W',
      ]
      const tagCount = Mock.Random.integer(8, 12)
      const tags = Mock.Random.shuffle(tagsPool).slice(0, tagCount)

      const title = Mock.Random.ctitle(4, 12)
      const description = Mock.Random.csentence(10, 24)

      const authorId = Mock.Random.integer(1, 10000)
      const author = {
        id: authorId,
        name: Mock.Random.cname(),
        bio: Mock.Random.csentence(6, 12),
        avatar: `https://i.pravatar.cc/96?u=${authorId}`,
        background: `https://picsum.photos/${Math.min(width * 2, 1200)}/${Math.min(height * 2, 1600)}?blur=2`,
      }

      const statistic = {
        bookmarks: Mock.Random.integer(0, 10000),
        likes: Mock.Random.integer(0, 20000),
        comments: Mock.Random.integer(0, 5000),
        views: Mock.Random.integer(500, 100000),
      }

      const url = Mock.Random.dataImage(`${width}x${height}`, title)

      return {
        id,
        title,
        ts: Date.now() - Mock.Random.integer(0, 60 * 24 * 60 * 60 * 1000),
        width,
        height,
        tags,
        statistic,
        url,
        author,
        // extra fields often useful in cards
        description,
      }
    })

    setTimeout(() => {
      resolve(items)
    }, responseTime)
  })
}
