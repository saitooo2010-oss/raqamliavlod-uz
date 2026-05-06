export interface BaseNewsModel {
  id: number | string
}

export interface BasicNews {
  title: string
  slug: string
  date: string
  short_description: string
  thumbnail?: string
  category?: string
  reading_time?: number
  views?: number
}

export interface News extends BaseNewsModel, BasicNews {}

export interface NewsDetail extends News {
  content: string
}