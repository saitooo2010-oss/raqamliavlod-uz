import AboutContest from '@/components/AboutContest'
import ContestTasks from '@/components/ContestTasks'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { LogOutIcon } from 'lucide-react'

type PageTabOptions = 'about' | 'tasks' | 'tries' | 'participants' | 'rating'

function isTab(value: any): value is PageTabOptions {
  return ['about', 'tasks', 'tries', 'participants', 'rating'].includes(value)
}

type PageSearch = {
  tab: PageTabOptions
}

export const Route = createFileRoute('/contest/$slug/')({
  component: RouteComponent,
  validateSearch: (search): PageSearch => {
    return {
      tab: isTab(search.tab) ? search.tab : 'about',
    }
  },
})

function RouteComponent() {
  const { slug } = Route.useParams()
  const { tab } = Route.useSearch()
  const navigate = Route.useNavigate()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['contest', slug, 'about'],
    queryFn: () => {},
  })

  return (
    <>
      <section id="contest">
        <div className="section-title mb-4 flex items-center justify-between">
          <h3 className="text-2xl font-semibold font-host-grotesk">
            DG Kontest
          </h3>

          <Button size="lg" className="relative px-4" variant="destructive">
            <span className="icon">
              <LogOutIcon />
            </span>
            <span className="text">Chiqish</span>
          </Button>
        </div>

        <Tabs
          defaultValue={(tab as PageTabOptions) || 'top'}
          onValueChange={(value) =>
            navigate({
              to: '/contest/$slug',
              search: { tab: value as PageTabOptions },
              params: { slug: slug },
            })
          }
        >
          <TabsList className="mb-4">
            <TabsTrigger value="about" className="text-md p-4">
              <span className="text">Olimpiada haqida</span>
            </TabsTrigger>
            <TabsTrigger value="tasks" className="text-md p-4">
              <span className="text">Masalalar</span>
            </TabsTrigger>
            <TabsTrigger value="tries" className="text-md p-4">
              <span className="text">Urinishlar</span>
            </TabsTrigger>
            <TabsTrigger value="participants" className="text-md p-4">
              <span className="text">Qatnashuvchilar</span>
            </TabsTrigger>
            <TabsTrigger value="rating" className="text-md p-4">
              <span className="text">Turnir jadvali</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="about">
            <AboutContest />
          </TabsContent>
          <TabsContent value="tasks">
            <ContestTasks />
          </TabsContent>
          <TabsContent value="tries">
            <AboutContest />
          </TabsContent>
          <TabsContent value="participants">
            <AboutContest />
          </TabsContent>
          <TabsContent value="rating">
            <AboutContest />
          </TabsContent>
        </Tabs>
      </section>
    </>
  )
}
