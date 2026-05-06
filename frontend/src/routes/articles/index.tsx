import { createFileRoute } from '@tanstack/react-router'
import IMG from '../../../public/favicon.png'

export const Route = createFileRoute('/articles/')({
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
            Maqolalar
          </span>
          <h1 className="text-[28px] sm:text-[36px] font-extrabold text-gray-900 mb-3 tracking-[-0.02em]">
            Foydali maqolalar
          </h1>
          <p className="text-gray-500 text-base max-w-[600px] mx-auto">
            Raqamli texnologiyalar, dasturlash va ta'lim sohasidagi eng so'nggi maqolalar va yangiliklar.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
          <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Maqolalar tez orada qo'shiladi</h2>
          <p className="text-gray-500 leading-relaxed mb-4">
            Biz maqolalar bo'limini tez orada boyitamiz. Bu yerda siz:
          </p>
          <ul className="text-gray-500 space-y-2 max-w-md mx-auto text-left">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
              Dasturlash tillari haqida maqolalar o'qishingiz mumkin
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
              Raqamli ta'lim yangiliklarini bilib olishingiz mumkin
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
              Mualliflarning tajribalarini o'rganishingiz mumkin
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
              Foydali maslahatlar va qo'llanmalar topishingiz mumkin
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}