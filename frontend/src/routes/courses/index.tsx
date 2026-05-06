import NewCourses from '@/components/NewCourses'
import RecommendedCourses from '@/components/RecommendedCourses'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/courses/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <NewCourses />
      <div className="mb-12"></div>
      <RecommendedCourses />
    </>
  )
}
