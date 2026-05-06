import { createFileRoute } from '@tanstack/react-router'
import IMG from '../../../public/favicon.png'

export const Route = createFileRoute('/forum/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-5 py-12">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <img src={IMG} alt="Raqamli Avlod" className="w-14 h-14 object-contain" />
          </div>
          <span className="inline-block px-3.5 py-1.5 bg-gray-100 text-gray-700 text-[12.5px] font-semibold rounded-full mb-4 uppercase tracking-wide">
            Forum
          </span>
          <h1 className="text-[28px] sm:text-[36px] font-extrabold text-gray-900 mb-3 tracking-[-0.02em]">
            Hamjamiyat
          </h1>
          <p className="text-gray-500 text-base max-w-[600px] mx-auto">
            Bu yerda siz o'quvchilar va o'qituvchilar bilan fikr almashishingiz, savollar berishingiz va javob olishingiz mumkin.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
          <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <line x1="9" y1="10" x2="15" y2="10" />
            <line x1="12" y1="13" x2="12" y2="13" />
          </svg>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Forum tez orada ochiladi</h2>
          <p className="text-gray-500 leading-relaxed mb-4">
            Biz forum bo'limini tez orada ishga tushiramiz. Bu yerda siz:
          </p>
          <ul className="text-gray-500 space-y-2 max-w-md mx-auto text-left">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
              Kurslar haqida savol berishingiz mumkin
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
              Boshqa o'quvchilar bilan tajriba almashishingiz mumkin
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
              O'qituvchilardan maslahat olishingiz mumkin
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
              Yangiliklar va e'lonlar haqida ma'lumot olishingiz mumkin
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}