export default function NewCourseCard({ course }: { course: NewCourse }) {
  return (
    <>
      <div>
        <div className="relative aspect-16/12 bg-blue-400 rounded-3xl overflow-hidden">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-all duration-200 ease-in"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
          />
        </div>
      </div>
    </>
  )
}
