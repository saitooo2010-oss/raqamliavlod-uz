export interface BaseModel {
  id: number | string
}

export interface BasicCourse {
  title: string
  slug: string
  thumbnail: string
  short_description: string
}

export interface NewCourse extends BaseModel, BasicCourse {}

export interface CourseDetail extends NewCourse {
  video_url: string
  description: string
}