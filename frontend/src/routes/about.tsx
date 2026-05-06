import { createFileRoute } from '@tanstack/react-router'
import IMG from '../../public/favicon.png'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function AboutPage() {
  return (
    <div className="min-h-screen bg-white font-['Manrope',system-ui,sans-serif]">
      <div className="text-center py-[60px] px-5 bg-[#f8fafc] border-b border-gray-200 relative overflow-hidden">
        <div className="absolute top-[-100px] left-[-80px] w-[240px] h-[240px] rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.03),transparent_70%)] pointer-events-none"></div>
        <div className="absolute bottom-[-100px] right-[-80px] w-[240px] h-[240px] rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.03),transparent_70%)] pointer-events-none"></div>
        <div className="relative z-10">
          <div className="flex justify-center mb-4">
            <img src={IMG} alt="Raqamli Avlod" className="w-16 h-16 object-contain" />
          </div>
          <h1 className="text-[28px] sm:text-[38px] font-extrabold text-gray-900 tracking-[-0.02em] mb-3">
            Biz haqimizda
          </h1>
          <p className="text-gray-600 text-base max-w-[600px] mx-auto">Raqamli Avlod IT O'zbekiston — yoshlarni IT sohasiga jalb qilish va raqamli savodxonlikni oshirishga qaratilgan ta'lim platformasi.</p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-5 py-[60px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[50px] items-center">
          <div>
            <h2 className="text-[22px] sm:text-[28px] font-extrabold text-gray-900 tracking-[-0.01em] mb-4">Bizning loyiha haqida</h2>
            <p className="text-gray-600 text-[15.5px] mb-3.5"><span className="text-gray-900 font-semibold">"Raqamli Avlod"</span> — 2019-yildan boshlab faoliyat olib borayotgan, O'zbekiston yoshlarini zamonaviy IT sohasiga tayyorlashga qaratilgan ta'lim platformasi.</p>
            <p className="text-gray-600 text-[15.5px] mb-3.5">Biz dasturlash, veb-texnologiyalar, mobil ilovalar yaratish, sun'iy intellekt va boshqa ko'plab yo'nalishlar bo'yicha <span className="text-gray-900 font-semibold">tekin onlayn kurslar</span> taklif etamiz.</p>
            <p className="text-gray-600 text-[15.5px]">Platformamizda 50 mingdan ortiq o'quvchi ta'lim olmoqda. Biz har yili "Raqamli avlod qizlari" hamda "DG Kontest" kabi yirik miqyosdagi tanlovlarni o'tkazib kelamiz va eng iqtidorli yoshlarni xalqaro ta'lim sayohatlariga jo'natamiz.</p>
          </div>
          <div className="flex justify-center">
            <img src={IMG} alt="Raqamli Avlod" className="w-48 h-48 object-contain" />
          </div>
        </div>
      </div>

      <div className="bg-[#f8fafc] py-[60px] relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-5 relative">
          <div className="text-center mb-8">
            <h2 className="text-[22px] sm:text-[28px] font-extrabold text-gray-900 tracking-[-0.01em] flex flex-col items-center">
              Raqamlarda
              <div className="w-[60px] h-[2px] bg-gray-900 rounded-full mt-3"></div>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[22px]">
            <div className="bg-white border border-gray-200 rounded-xl py-7 px-5 text-center relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-gray-300 group">
              <div className="w-[50px] h-[50px] rounded-xl bg-gray-100 flex items-center justify-center mx-auto mb-3.5 text-gray-700">
                <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="text-[36px] font-extrabold text-gray-900 leading-none">50K+</div>
              <div className="text-gray-500 text-sm mt-2 font-medium">O'quvchilar</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl py-7 px-5 text-center relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-gray-300 group">
              <div className="w-[50px] h-[50px] rounded-xl bg-gray-100 flex items-center justify-center mx-auto mb-3.5 text-gray-700">
                <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="text-[36px] font-extrabold text-gray-900 leading-none">120+</div>
              <div className="text-gray-500 text-sm mt-2 font-medium">Kurslar</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl py-7 px-5 text-center relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-gray-300 group">
              <div className="w-[50px] h-[50px] rounded-xl bg-gray-100 flex items-center justify-center mx-auto mb-3.5 text-gray-700">
                <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="text-[36px] font-extrabold text-gray-900 leading-none">14</div>
              <div className="text-gray-500 text-sm mt-2 font-medium">Viloyatlar</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl py-7 px-5 text-center relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-gray-300 group">
              <div className="w-[50px] h-[50px] rounded-xl bg-gray-100 flex items-center justify-center mx-auto mb-3.5 text-gray-700">
                <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="8" r="7" />
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                </svg>
              </div>
              <div className="text-[36px] font-extrabold text-gray-900 leading-none">6+</div>
              <div className="text-gray-500 text-sm mt-2 font-medium">Yillik tajriba</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-5 py-[60px]">
        <div className="text-center mb-8">
          <h2 className="text-[22px] sm:text-[28px] font-extrabold text-gray-900 tracking-[-0.01em] flex flex-col items-center">
            Bizning qadriyatlarimiz
            <div className="w-[60px] h-[2px] bg-gray-900 rounded-full mt-3"></div>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[22px]">
          <div className="bg-white border border-gray-200 rounded-xl p-[30px] relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-gray-300 group">
            <div className="w-[56px] h-[56px] rounded-xl bg-gray-100 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <h3 className="text-[19px] font-extrabold text-gray-900 tracking-[-0.01em] mb-2">Sifatli ta'lim</h3>
            <p className="text-gray-500 text-[14.5px]">Soha mutaxassislari tomonidan tayyorlangan amaliy kurslar va materiallar.</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-[30px] relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-gray-300 group">
            <div className="w-[56px] h-[56px] rounded-xl bg-gray-100 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3 className="text-[19px] font-extrabold text-gray-900 tracking-[-0.01em] mb-2">Ochiq jamoa</h3>
            <p className="text-gray-500 text-[14.5px]">Forum va kontestlar orqali bir-biriga yordam beradigan faol IT-jamoa.</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-[30px] relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-gray-300 group">
            <div className="w-[56px] h-[56px] rounded-xl bg-gray-100 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M13 2L3 14h8l-2 8 10-12h-8l2-8z" />
              </svg>
            </div>
            <h3 className="text-[19px] font-extrabold text-gray-900 tracking-[-0.01em] mb-2">Innovatsiya</h3>
            <p className="text-gray-500 text-[14.5px]">Eng so'nggi texnologiyalar va o'qitish usullari orqali samarali bilim berish.</p>
          </div>
        </div>
      </div>

      <div className="bg-[#f8fafc] py-[60px] relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="text-center mb-8">
            <h2 className="text-[22px] sm:text-[28px] font-extrabold text-gray-900 tracking-[-0.01em] flex flex-col items-center">
              Bizning yo'limiz
              <div className="w-[60px] h-[2px] bg-gray-900 rounded-full mt-3"></div>
            </h2>
          </div>
          <div className="max-w-[760px] mx-auto relative before:absolute before:left-[19px] before:top-3 before:bottom-3 before:w-[2px] before:bg-gray-300 before:rounded-full">
            <div className="relative pl-[56px] pb-8 last:pb-0">
              <div className="absolute left-[8px] top-1 w-[22px] h-[22px] bg-white border-[3px] border-gray-900 rounded-full"></div>
              <div className="text-gray-700 text-sm font-bold tracking-[0.04em]">2019</div>
              <h3 className="text-[18px] font-bold text-gray-900 tracking-[-0.01em] mt-1.5 mb-2">Loyihaning boshlanishi</h3>
              <p className="text-gray-500 text-[14.5px]">"Raqamli Avlod" tashabbusi yoshlar uchun IT-ta'lim platformasi sifatida ishga tushirildi.</p>
            </div>
            <div className="relative pl-[56px] pb-8 last:pb-0">
              <div className="absolute left-[8px] top-1 w-[22px] h-[22px] bg-white border-[3px] border-gray-700 rounded-full"></div>
              <div className="text-gray-700 text-sm font-bold tracking-[0.04em]">2021</div>
              <h3 className="text-[18px] font-bold text-gray-900 tracking-[-0.01em] mt-1.5 mb-2">Onlayn kurslar va forum</h3>
              <p className="text-gray-500 text-[14.5px]">Birinchi tekin onlayn kurslar va o'quvchilar uchun forum platformasi ochildi.</p>
            </div>
            <div className="relative pl-[56px] pb-8 last:pb-0">
              <div className="absolute left-[8px] top-1 w-[22px] h-[22px] bg-white border-[3px] border-gray-600 rounded-full"></div>
              <div className="text-gray-700 text-sm font-bold tracking-[0.04em]">2023</div>
              <h3 className="text-[18px] font-bold text-gray-900 tracking-[-0.01em] mt-1.5 mb-2">Respublika tanlovlari</h3>
              <p className="text-gray-500 text-[14.5px]">"Raqamli avlod qizlari" va DG Kontest kabi yirik miqyosdagi tanlovlar boshlandi.</p>
            </div>
            <div className="relative pl-[56px] pb-8 last:pb-0">
              <div className="absolute left-[8px] top-1 w-[22px] h-[22px] bg-white border-[3px] border-gray-500 rounded-full"></div>
              <div className="text-gray-700 text-sm font-bold tracking-[0.04em]">2024</div>
              <h3 className="text-[18px] font-bold text-gray-900 tracking-[-0.01em] mt-1.5 mb-2">Xalqaro hamkorlik</h3>
              <p className="text-gray-500 text-[14.5px]">BAA, Buyuk Britaniya va boshqa davlatlar bilan ta'lim sayohatlari va hamkorlik dasturlari.</p>
            </div>
            <div className="relative pl-[56px] pb-0">
              <div className="absolute left-[8px] top-1 w-[22px] h-[22px] bg-white border-[3px] border-gray-400 rounded-full"></div>
              <div className="text-gray-700 text-sm font-bold tracking-[0.04em]">2025</div>
              <h3 className="text-[18px] font-bold text-gray-900 tracking-[-0.01em] mt-1.5 mb-2">Yangi cho'qqilar</h3>
              <p className="text-gray-500 text-[14.5px]">50 mingdan ortiq o'quvchi va Guinness rekordini yangilagan IT-yoshlar bilan birga.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}