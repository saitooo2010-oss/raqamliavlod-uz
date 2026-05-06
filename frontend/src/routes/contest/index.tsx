import { createFileRoute } from '@tanstack/react-router'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ListedContests from '@/components/ListedContests'

type PageTabOptions = 'top' | 'contests' | 'tasks' | 'rating'

function isTab(value: any): value is PageTabOptions {
  return ['top', 'contests', 'tasks', 'rating'].includes(value)
}

type PageSearch = {
  tab: PageTabOptions
}

export const Route = createFileRoute('/contest/')({
  component: RouteComponent,
  validateSearch: (search): PageSearch => {
    return {
      tab: isTab(search.tab) ? search.tab : 'top',
    }
  },
})

function RouteComponent() {
  const { tab } = Route.useSearch()
  const navigate = Route.useNavigate()

  return (
    <>
      <section id="contest">
        <div className="section-title mb-4">
          <h3 className="text-2xl font-semibold font-host-grotesk">
            DG Kontest
          </h3>
        </div>

        <Tabs
          defaultValue={(tab as PageTabOptions) || 'top'}
          onValueChange={(value) =>
            navigate({
              to: '/contest',
              search: { tab: value as PageTabOptions },
            })
          }
        >
          <TabsList className="mb-4">
            <TabsTrigger value="top" className="text-md p-4">
              <span className="icon">🔥</span>
              <span className="text">Top</span>
            </TabsTrigger>
            <TabsTrigger value="contests" className="text-md p-4">
              <span className="icon">🏆</span>
              <span className="text">Musobaqalar</span>
            </TabsTrigger>
            <TabsTrigger value="tasks" className="text-md p-4">
              <span className="icon">🎮</span>
              <span className="text">Masalalar</span>
            </TabsTrigger>
            <TabsTrigger value="rating" className="text-md p-4">
              <span className="icon">⭐</span>
              <span className="text">Reyting</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="top">
            <ListedContests />
          </TabsContent>
          <TabsContent value="contests">Contest</TabsContent>
          <TabsContent value="tasks">Tasks</TabsContent>
          <TabsContent value="rating">Rating</TabsContent>
        </Tabs>
      </section>
    </>
  )
}
