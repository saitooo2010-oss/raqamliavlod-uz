import api from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import Loading from './Loading'
import RecommendedCourseCard from './RecommendedCourseCard'

export default function RecommendedCourses() {
  const fetchData = useCallback(async (): Promise<RecommendedCourse[]> => {
    const response = await api.get('/courses/recommended-courses')
    if (response.status !== 200) {
      throw response
    }
    return response.data
  }, [])

  const { data, isLoading, isError } = useQuery({
    queryKey: ['recommended', 'courses'],
    queryFn: fetchData,
  })

  return (
    <>
      <section id="recommended-courses">
        <div className="section-title mb-4">
          <h3 className="text-2xl font-semibold font-host-grotesk">
            Tavsiya etiladigan kurslar
          </h3>
        </div>

        {isLoading ? (
          <>
            <Loading />
          </>
        ) : isError ? (
          <></>
        ) : data && data.length ? (
          <>
            <div className="flex flex-col gap-2">
              {data.map((value) => (
                <RecommendedCourseCard course={value} />
              ))}
            </div>
          </>
        ) : (
          <>Malumotlar yuklanmagan</>
        )}
      </section>
    </>
  )
}
