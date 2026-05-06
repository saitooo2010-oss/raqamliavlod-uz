import { PlusIcon, UsersIcon } from 'lucide-react'
import { Button } from './ui/button'

export default function RecommendedCourseCard({
  course,
}: {
  course: RecommendedCourse
}) {
  return (
    <>
      <div className="flex items-center gap-4 bg-white p-4 rounded-lg">
        <div className="relative min-w-fit h-36 aspect-16/12 bg-blue-400 rounded-lg overflow-hidden">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-all duration-200 ease-in"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
          />
        </div>
        <div className="w-full">
          <h3 className="text-2xl font-semibold font-roboto">{course.title}</h3>
          <p className="text-gray-600">{course.short_description}</p>
        </div>
        <div>
          <p className="mb-4 flex items-center justify-center gap-2">
            <span className="icon">
              <UsersIcon size={16} />
            </span>
            <span className="text">{course.subscribers}</span>
          </p>
          <Button size="lg" className="px-4">
            <span className="icon">
              <PlusIcon />
            </span>
            <span className="text">Qo'shilish</span>
          </Button>
        </div>
      </div>
    </>
  )
}
