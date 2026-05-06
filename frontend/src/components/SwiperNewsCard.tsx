import { justDate } from '@/lib/utils'
import { CalendarDaysIcon } from 'lucide-react'

export default function SwiperNewsCard({ news }: { news: BreakingNews }) {
  return (
    <>
      <a
        href={news.source}
        rel="noopener noreferrer"
        target="_blank"
        className="group"
      >
        <div className="relative aspect-16/12 bg-blue-400 rounded-3xl overflow-hidden">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}${news.thumbnail}`}
            alt={news.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-all duration-200 ease-in"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
          />

          <div className="content absolute bottom-0 left-0 w-full h-auto bg-black/35 group-hover:backdrop-blur-3xl p-4 z-10 transition-all duration-200 ease-in">
            <h1 className="text-xl font-semibold font-poppins text-white">
              {news.title}
            </h1>
            <p className="text-muted text-sm font-host-grotesk flex items-center justify-start gap-2">
              <span className="icon">
                <CalendarDaysIcon size={16} />
              </span>
              <span className="date">{justDate(news.created_at)}</span>
            </p>
          </div>
        </div>
      </a>
    </>
  )
}
