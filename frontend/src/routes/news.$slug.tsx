import { createFileRoute, Link } from '@tanstack/react-router'
import { NEWS } from '@/data/news'
import IMG from '../../public/favicon.png'

export const Route = createFileRoute('/news/$slug')({
  component: NewsDetailPage,
})

function NewsDetailPage() {
  const { slug } = Route.useParams()
  const news = NEWS.find((item) => item.slug === slug)
  const relatedNews = NEWS.filter((item) => item.slug !== slug).slice(0, 3)

  if (!news) {
    return (
      <div className="min-h-screen bg-white p-10 text-center">
        <h1 className="text-2xl font-bold mb-4">Yangilik topilmadi</h1>
        <Link to="/" className="text-gray-600 hover:text-gray-900 transition">← Bosh sahifaga qaytish</Link>
      </div>
    )
  }

  const copyLink = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigator.clipboard.writeText(window.location.href)
    const btn = e.currentTarget
    const orig = btn.innerHTML
    btn.innerHTML = '✓ Nusxa olindi'
    setTimeout(() => {
      btn.innerHTML = orig
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-white font-['Manrope',system-ui,sans-serif]">
      <div className="progress-bar fixed top-0 left-0 h-1 bg-[#1E293B] w-0 z-50 transition-all duration-100"></div>

      <div className="max-w-[1200px] mx-auto px-5 py-4 text-[13.5px] text-gray-400">
        <Link to="/" className="text-gray-500 hover:text-[#1E293B] transition-colors">Bosh sahifa</Link>
        <span className="mx-2 text-gray-300">/</span>
        <Link to="/" className="text-gray-500 hover:text-[#1E293B] transition-colors">Yangiliklar</Link>
        <span className="mx-2 text-gray-300">/</span>
        <span className="text-gray-600">{news.title.slice(0, 40)}...</span>
      </div>

      <article className="max-w-[800px] mx-auto px-5 pb-10">
        <Link to="/" className="inline-flex items-center gap-1.5 text-gray-600 text-sm font-semibold mb-5 hover:gap-2.5 hover:text-[#1E293B] transition-all duration-300">
          ← Yangiliklar ro'yxatiga
        </Link>

        <span className="inline-block px-3.5 py-1.5 bg-gray-100 text-gray-600 text-[12.5px] font-bold rounded-full mb-4 uppercase tracking-wide">
          {news.category || "Tadbir"}
        </span>

        <h1 className="text-[26px] sm:text-[38px] font-extrabold text-[#1E293B] leading-tight tracking-[-0.02em] mb-4">
          {news.title}
        </h1>

        <div className="flex items-center gap-3.5 flex-wrap text-gray-500 text-[13.5px] pb-6 border-b border-gray-200 mb-7">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-100">
              <img src={IMG} alt="RA" className="w-full h-full object-contain" />
            </div>
            <span className="text-gray-700 font-bold">Raqamli Avlod</span>
          </div>
          <span className="text-gray-300">·</span>
          <span>📅 {news.date}</span>
          <span className="text-gray-300">·</span>
          <span>⏱ {news.reading_time || 4} daqiqa o'qish</span>
          <span className="text-gray-300">·</span>
          <span>👁 {(news.views || 0).toLocaleString()}</span>
        </div>

        <div className="w-full aspect-[16/9] rounded-xl overflow-hidden mb-8 bg-gray-100 relative shadow-md">
          {news.thumbnail ? (
            <img src={news.thumbnail} alt={news.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <img src={IMG} alt="Raqamli Avlod" className="w-20 h-20 object-contain opacity-30" />
            </div>
          )}
        </div>

        <div 
          className="text-[17px] leading-relaxed text-gray-700 space-y-5 [&_h2]:text-[25px] [&_h2]:font-extrabold [&_h2]:text-[#1E293B] [&_h2]:tracking-[-0.01em] [&_h2]:mt-8 [&_h2]:mb-3 [&_ul]:pl-5 [&_ul]:space-y-1 [&_ul]:list-disc [&_blockquote]:border-l-4 [&_blockquote]:border-red-500 [&_blockquote]:py-3.5 [&_blockquote]:px-5 [&_blockquote]:my-8 [&_blockquote]:text-red-700 [&_blockquote]:italic [&_blockquote]:font-medium [&_blockquote]:bg-red-50 [&_blockquote]:rounded-r-xl [&_p]:mb-4"
          dangerouslySetInnerHTML={{ __html: news.content || `<p>${news.short_description}</p>` }}
        />

        <div className="flex items-center gap-2.5 flex-wrap py-6 mt-8 border-t border-b border-gray-200">
          <span className="text-gray-600 text-sm font-bold mr-1">Ulashish:</span>
          
          <button onClick={copyLink} className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-gray-300 rounded-lg text-gray-600 text-[13px] font-semibold bg-white hover:border-red-500 hover:text-red-600 hover:bg-red-50 hover:-translate-y-0.5 transition-all duration-300">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
            Havola
          </button>
          
          <a href="https://t.me/share/url?url=https://raqamliavlod.uz/news/1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-gray-300 rounded-lg text-gray-600 text-[13px] font-semibold bg-white hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 hover:-translate-y-0.5 transition-all duration-300">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
            </svg>
            Telegram
          </a>
          
          <a href="https://twitter.com/intent/tweet?url=https://raqamliavlod.uz/news/1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-gray-300 rounded-lg text-gray-600 text-[13px] font-semibold bg-white hover:border-yellow-500 hover:text-yellow-600 hover:bg-yellow-50 hover:-translate-y-0.5 transition-all duration-300">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            X
          </a>
          
          <a href="https://www.facebook.com/sharer/sharer.php?u=https://raqamliavlod.uz/news/1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-gray-300 rounded-lg text-gray-600 text-[13px] font-semibold bg-white hover:border-green-500 hover:text-green-600 hover:bg-green-50 hover:-translate-y-0.5 transition-all duration-300">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Facebook
          </a>
        </div>
      </article>

      <section className="bg-gray-50 py-[60px]">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="flex items-center gap-2.5 mb-7">
            <h2 className="text-[22px] sm:text-[28px] font-extrabold text-gray-900 tracking-[-0.01em] flex items-center gap-2.5">
              <span className="w-1 h-6 bg-[#1E293B] rounded-full"></span>
              O'xshash yangiliklar
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedNews.map((item) => (
              <Link key={item.id} to={`/news/${item.slug}`} className="group bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-[#1E293B]">
                <div className="aspect-[16/10] overflow-hidden relative bg-gray-100">
                  {item.thumbnail ? (
                    <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <img src={IMG} alt="RA" className="w-10 h-10 object-contain opacity-30" />
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-[15.5px] text-gray-900 mb-2 font-bold leading-snug line-clamp-2 group-hover:text-[#1E293B] transition-colors duration-300">{item.title}</h3>
                  <span className="text-xs text-gray-400 flex items-center gap-1.5">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    {item.date}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}