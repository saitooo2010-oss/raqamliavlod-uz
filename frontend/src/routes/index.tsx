import { createFileRoute, Link } from '@tanstack/react-router'
import { COURSES } from '@/data/course'
import { NEWS } from '@/data/news'
import IMG from '../../public/favicon.png'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="min-h-screen bg-white font-['Manrope',system-ui,sans-serif]">
      <div className="relative overflow-hidden py-[50px] pb-[30px]">
        <div className="absolute inset-0 pointer-events-none z-0">
          <svg className="absolute -top-[60px] -right-[60px] w-[320px] h-[320px] opacity-[0.03] text-gray-900 animate-spin-slow" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1">
            <circle cx="100" cy="100" r="90" />
            <circle cx="100" cy="100" r="70" />
            <circle cx="100" cy="100" r="50" />
            <path d="M100 10 L100 190 M10 100 L190 100 M30 30 L170 170 M170 30 L30 170" />
            <path d="M100 30 L130 70 L170 70 L140 100 L150 140 L100 120 L50 140 L60 100 L30 70 L70 70 Z" />
          </svg>
          <svg className="absolute -left-[80px] -bottom-[80px] w-[320px] h-[320px] opacity-[0.03] text-gray-900 animate-spin-slow-reverse" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1">
            <circle cx="100" cy="100" r="90" />
            <circle cx="100" cy="100" r="60" />
            <path d="M100 30 L130 70 L170 70 L140 100 L150 140 L100 120 L50 140 L60 100 L30 70 L70 70 Z" />
            <rect x="40" y="40" width="120" height="120" transform="rotate(45 100 100)" />
          </svg>
        </div>
        <div className="max-w-[1200px] mx-auto px-5 relative z-10 text-center">
          <div className="flex justify-center mb-4">
            <img src={IMG} alt="Raqamli Avlod" className="w-16 h-16 object-contain" />
          </div>
          <span className="inline-flex items-center gap-2 py-1.5 px-3.5 bg-[#1E293B] border border-[#334155] text-white text-[13px] font-semibold rounded-full mb-4">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
            </svg>
            O'zbekiston yoshlari uchun
          </span>
          <h1 className="text-[28px] sm:text-[42px] font-extrabold text-gray-900 leading-tight tracking-[-0.02em] mb-3">
            Raqamli kelajak <span className="text-[#1E293B]">bilim bilan</span> boshlanadi
          </h1>
          <p className="text-gray-500 text-base max-w-[600px] mx-auto mb-6">Tekin onlayn kurslar, faol forum va respublika miqyosidagi tanlovlar — bularning barchasi bir joyda.</p>
          <div className="flex justify-center gap-12 flex-wrap pt-4">
            <div className="text-center">
              <div className="text-[32px] font-black text-red-600">50K+</div>
              <div className="text-gray-500 text-[13px] font-medium mt-1">O'quvchilar</div>
            </div>
            <div className="text-center">
              <div className="text-[32px] font-black text-yellow-500">120+</div>
              <div className="text-gray-500 text-[13px] font-medium mt-1">Kurslar</div>
            </div>
            <div className="text-center">
              <div className="text-[32px] font-black text-blue-600">14</div>
              <div className="text-gray-500 text-[13px] font-medium mt-1">Viloyatlar</div>
            </div>
            <div className="text-center">
              <div className="text-[32px] font-black text-green-600">6+</div>
              <div className="text-gray-500 text-[13px] font-medium mt-1">Yillik tajriba</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-5 py-[60px]">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-7">
          <h2 className="text-[22px] sm:text-[28px] font-extrabold text-gray-900 tracking-[-0.01em] flex items-center gap-2.5">
            <span className="w-1 h-6 bg-[#1E293B] rounded-full"></span>
            Dolzarb yangiliklar
          </h2>
          <Link to="/news" className="text-[#1E293B] text-sm font-semibold flex items-center gap-1.5 hover:gap-2.5 transition-all">Barchasini ko'rish →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[22px]">
          {NEWS.map((item) => (
            <Link key={item.id} to={`/news/${item.slug}`} className="group bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-[#1E293B]">
              <div className="aspect-[16/10] overflow-hidden relative bg-gray-100">
                {item.thumbnail ? (
                  <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-[15.5px] text-gray-900 mb-3 font-bold leading-snug line-clamp-3 group-hover:text-[#1E293B] transition-colors">{item.title}</h3>
                <span className="text-[12.5px] text-gray-400 flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
        <Link to="/news" className="flex items-center justify-center gap-2 mt-8 py-3 px-7 bg-[#1E293B] rounded-xl text-white text-sm font-bold w-fit mx-auto transition-all duration-300 hover:bg-[#334155] hover:-translate-y-0.5 hover:shadow-md">Barcha yangiliklar →</Link>
      </div>

      <div className="bg-gray-50 py-[60px]">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-7">
            <h2 className="text-[22px] sm:text-[28px] font-extrabold text-gray-900 tracking-[-0.01em] flex items-center gap-2.5">
              <span className="w-1 h-6 bg-[#1E293B] rounded-full"></span>
              Yangi kurslar
            </h2>
            <Link to="/courses" className="text-[#1E293B] text-sm font-semibold flex items-center gap-1.5 hover:gap-2.5 transition-all">Barchasini ko'rish →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[22px]">
            {COURSES.map((course) => (
              <Link key={course.id} to={`/course/${course.slug}`} className="group bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-[#1E293B]">
                <div className="aspect-[16/9] overflow-hidden relative bg-gray-100">
                  {course.thumbnail ? (
                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <svg className="w-12 h-12 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="M9 8h6M9 12h6" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-lg text-gray-900 font-extrabold tracking-[-0.01em] mb-2 group-hover:text-[#1E293B] transition-colors">{course.title}</h3>
                  <span className="text-[#1E293B] text-[13.5px] font-bold flex items-center gap-1.5 group-hover:gap-2.5 transition-all">Davom ettirish →</span>
                </div>
              </Link>
            ))}
          </div>
          <Link to="/courses" className="flex items-center justify-center gap-2 mt-8 py-3 px-7 bg-[#1E293B] rounded-xl text-white text-sm font-bold w-fit mx-auto transition-all duration-300 hover:bg-[#334155] hover:-translate-y-0.5 hover:shadow-md">Barchasini ko'rish →</Link>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spin-slow-reverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        .animate-spin-slow { animation: spin-slow 60s linear infinite; }
        .animate-spin-slow-reverse { animation: spin-slow-reverse 60s linear infinite; }
        .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </div>
  )
}