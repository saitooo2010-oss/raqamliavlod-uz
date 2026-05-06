interface BasicContest {
  thumbnail: string
  title: string
  slug: string
  short_description: string
}

interface ListedContest extends BaseModel, BasicContest {
  subscribers: number
  is_joined: boolean
}

interface Contest extends BaseModel, BasicContest {
  description: string
}
