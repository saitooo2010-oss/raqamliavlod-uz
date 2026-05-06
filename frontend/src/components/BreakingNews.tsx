import { useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import SwiperNewsCard from './SwiperNewsCard'
import api from '@/lib/api'
import Loading from './Loading'

export default function BreakingNews() {
  const fetchData = useCallback(async (): Promise<BreakingNews[]> => {
    const response = await api.get('/news/breaking-news')
    if (response.status !== 200) {
      throw response
    }
    return response.data
  }, [])

  const { data, isLoading, isError } = useQuery({
    queryKey: ['breaking', 'news'],
    queryFn: fetchData,
  })

  return (
    <>
      <section id="breaking-news">
        <div className="section-title mb-4">
          <h3 className="text-2xl font-semibold font-host-grotesk">
            Dolzarb yangiliklar
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
            <Swiper
              slidesPerView={3}
              spaceBetween={16}
              modules={[Navigation]}
              centeredSlides
              navigation
              loop
              breakpoints={{
                // Very small phones (0–479px)
                0: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },

                // Phones (480–639px)
                480: {
                  slidesPerView: 1.2,
                  spaceBetween: 12,
                },

                // Larger phones (640–767px)
                640: {
                  slidesPerView: 2,
                  spaceBetween: 15,
                },

                // Tablets (768–1023px)
                768: {
                  slidesPerView: 2.5,
                  spaceBetween: 18,
                },

                // Laptops (1024–1279px)
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },

                // Desktop (1280–1535px)
                1280: {
                  slidesPerView: 3,
                  spaceBetween: 25,
                },

                // Large Desktop (1536px+)
                1536: {
                  slidesPerView: 4,
                  spaceBetween: 30,
                },
              }}
            >
              {data.map((value) => (
                <SwiperSlide key={value.guid}>
                  <SwiperNewsCard news={value} />
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        ) : (
          <>Malumotlar yuklanmagan</>
        )}
      </section>
    </>
  )
}
