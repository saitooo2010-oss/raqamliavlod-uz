import { useCallback } from 'react'
import ListedContestCard from './ListedContestCard'
import { useQuery } from '@tanstack/react-query'
import Loading from './Loading'
import api from '@/lib/api'

export default function ListedContests() {
  const fetchData = useCallback(async (): Promise<
    RestPaginatedPage<ListedContest>
  > => {
    const response = await api.get('/contest/contests?is_top=t')
    if (response.status !== 200) {
      throw response
    }
    return response.data
  }, [])

  const { data, isLoading, isError } = useQuery({
    queryKey: ['contests', 'list'],
    queryFn: fetchData,
  })

  return (
    <>
      <div className="flex flex-col gap-4">
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <div>Xatolik yuz berdi</div>
        ) : data && data.results.length > 0 ? (
          data.results.map((value, index) => (
            <ListedContestCard contest={value} key={index} />
          ))
        ) : (
          <div>Ma’lumotlar yuklanmagan</div>
        )}
      </div>
    </>
  )
}
