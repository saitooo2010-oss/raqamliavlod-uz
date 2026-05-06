import { createFileRoute } from '@tanstack/react-router'
import type { FormEvent } from 'react'
import IMG from '../../public/favicon.png'

export const Route = createFileRoute('/contact')({
  component: ContactPage,
})

function ContactPage() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const topic = formData.get('topic');
    const message = formData.get('message');

    if (!name || !email || !topic || !message) {
      alert("Iltimos, barcha majburiy maydonlarni to'ldiring.");
      return;
    }

    const btn = form.querySelector('.form-submit') as HTMLButtonElement;
    if (btn) {
      btn.textContent = "Yuborilmoqda...";
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = "✓ Yuborildi!";
        btn.style.background = '#059669';
        form.reset();
        setTimeout(() => {
          btn.textContent = "Yuborish →";
          btn.style.background = '';
          btn.disabled = false;
        }, 2500);
      }, 800);
    }
  };

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
            Biz bilan aloqa
          </h1>
          <p className="text-gray-600 text-base max-w-[600px] mx-auto">Savollaringiz, takliflaringiz yoki hamkorlik bo'yicha murojaatlaringizni yuboring — biz tezda javob beramiz.</p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-5 py-[60px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-[28px] items-start">
          <div className="bg-[#1a2332] rounded-[18px] p-[36px] text-white relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#2d3a4e] rounded-full blur-3xl opacity-50 -z-0"></div>
            <div className="relative z-10">
              <div className="flex justify-center mb-6">
                <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center p-2">
                  <img src={IMG} alt="Raqamli Avlod" className="w-full h-full object-contain" />
                </div>
              </div>
              <h2 className="text-[22px] font-extrabold tracking-[-0.01em] mb-2 text-center text-white">Aloqa ma'lumotlari</h2>
              <p className="text-[14.5px] mb-7 text-gray-300 text-center">Quyidagi kanallar orqali bizga osongina bog'lanishingiz mumkin.</p>
              <div className="flex flex-col gap-4">
                <div className="flex gap-3.5 items-start group">
                  <div className="w-[42px] h-[42px] rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-all">
                    <svg className="w-[18px] h-[18px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-400 uppercase tracking-[0.06em] font-semibold mb-1">Telefon</div>
                    <div className="text-[15px] font-semibold text-white"><a href="tel:+998712345678" className="hover:text-gray-300 transition">+998 (71) 234-56-78</a></div>
                  </div>
                </div>
                <div className="flex gap-3.5 items-start group">
                  <div className="w-[42px] h-[42px] rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-all">
                    <svg className="w-[18px] h-[18px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-400 uppercase tracking-[0.06em] font-semibold mb-1">Email</div>
                    <div className="text-[15px] font-semibold text-white"><a href="mailto:info@raqamliavlod.uz" className="hover:text-gray-300 transition">info@raqamliavlod.uz</a></div>
                  </div>
                </div>
                <div className="flex gap-3.5 items-start group">
                  <div className="w-[42px] h-[42px] rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-all">
                    <svg className="w-[18px] h-[18px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-400 uppercase tracking-[0.06em] font-semibold mb-1">Manzil</div>
                    <div className="text-[15px] font-semibold text-white">Toshkent shahri, O'zbekiston</div>
                  </div>
                </div>
                <div className="flex gap-3.5 items-start group">
                  <div className="w-[42px] h-[42px] rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-all">
                    <svg className="w-[18px] h-[18px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-400 uppercase tracking-[0.06em] font-semibold mb-1">Ish vaqti</div>
                    <div className="text-[15px] font-semibold text-white">Du - Ju: 09:00 — 18:00</div>
                  </div>
                </div>
              </div>
              <div className="mt-7 pt-6 border-t border-white/10">
                <p className="text-[13px] mb-3 text-gray-400 font-medium text-center">Ijtimoiy tarmoqlarda kuzating</p>
                <div className="flex gap-2.5 justify-center">
                  <a href="https://t.me/digitalgeneration_uz" className="w-10 h-10 rounded-full bg-white/10 grid place-items-center hover:bg-white/20 hover:-translate-y-0.5 transition-all text-white">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
                    </svg>
                  </a>
                  <a href="https://instagram.com/DGUzbekistan" className="w-10 h-10 rounded-full bg-white/10 grid place-items-center hover:bg-white/20 hover:-translate-y-0.5 transition-all text-white">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/10 grid place-items-center hover:bg-white/20 hover:-translate-y-0.5 transition-all text-white">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-[18px] p-[36px] shadow-sm">
            <h2 className="text-[22px] font-extrabold text-gray-900 tracking-[-0.01em] mb-2">Xabar yuboring</h2>
            <p className="text-gray-500 text-[14.5px] mb-6">Forma to'ldiring — biz 24 soat ichida javob beramiz.</p>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="mb-3.5">
                  <label className="block text-gray-900 text-[13px] font-bold mb-1.5">Ism <span className="text-red-500">*</span></label>
                  <input className="w-full py-3 px-3.5 border border-gray-200 rounded-xl text-[14.5px] text-gray-900 bg-gray-50 focus:outline-none focus:border-gray-400 focus:bg-white focus:ring-1 focus:ring-gray-400 transition-all" type="text" name="name" placeholder="Ismingiz" required />
                </div>
                <div className="mb-3.5">
                  <label className="block text-gray-900 text-[13px] font-bold mb-1.5">Telefon</label>
                  <input className="w-full py-3 px-3.5 border border-gray-200 rounded-xl text-[14.5px] text-gray-900 bg-gray-50 focus:outline-none focus:border-gray-400 focus:bg-white focus:ring-1 focus:ring-gray-400 transition-all" type="tel" name="phone" placeholder="+998 ..." />
                </div>
              </div>
              <div className="mb-3.5">
                <label className="block text-gray-900 text-[13px] font-bold mb-1.5">Email <span className="text-red-500">*</span></label>
                <input className="w-full py-3 px-3.5 border border-gray-200 rounded-xl text-[14.5px] text-gray-900 bg-gray-50 focus:outline-none focus:border-gray-400 focus:bg-white focus:ring-1 focus:ring-gray-400 transition-all" type="email" name="email" placeholder="email@example.com" required />
              </div>
              <div className="mb-3.5">
                <label className="block text-gray-900 text-[13px] font-bold mb-1.5">Mavzu <span className="text-red-500">*</span></label>
                <select className="w-full py-3 px-3.5 border border-gray-200 rounded-xl text-[14.5px] text-gray-900 bg-gray-50 focus:outline-none focus:border-gray-400 focus:bg-white focus:ring-1 focus:ring-gray-400 transition-all" name="topic" required>
                  <option value="">Mavzuni tanlang</option>
                  <option value="general">Umumiy savol</option>
                  <option value="courses">Kurslar bo'yicha</option>
                  <option value="partnership">Hamkorlik</option>
                  <option value="support">Texnik yordam</option>
                  <option value="other">Boshqa</option>
                </select>
              </div>
              <div className="mb-3.5">
                <label className="block text-gray-900 text-[13px] font-bold mb-1.5">Xabar <span className="text-red-500">*</span></label>
                <textarea className="w-full py-3 px-3.5 border border-gray-200 rounded-xl text-[14.5px] text-gray-900 bg-gray-50 focus:outline-none focus:border-gray-400 focus:bg-white focus:ring-1 focus:ring-gray-400 transition-all resize-y min-h-[110px]" name="message" placeholder="Xabaringizni yozing..." required></textarea>
              </div>
              <button type="submit" className="form-submit w-full py-3 bg-gray-900 text-white border-none rounded-xl font-bold text-[15px] cursor-pointer hover:bg-gray-800 transition-all mt-1.5">Yuborish →</button>
              <div className="text-[12.5px] text-gray-400 text-center mt-3">Tugmani bosish orqali maxfiylik siyosatiga rozilik berasiz.</div>
            </form>
          </div>
        </div>
      </div>

      <div className="bg-[#f8fafc] py-[60px]">
        <div className="max-w-[800px] mx-auto px-5">
          <div className="text-center mb-8">
            <h2 className="text-[22px] sm:text-[28px] font-extrabold text-gray-900 tracking-[-0.01em]">
              Tez-tez beriladigan savollar
              <div className="w-[60px] h-[2px] bg-gray-900 rounded-full mx-auto mt-3"></div>
            </h2>
          </div>
          <details className="bg-white border border-gray-200 rounded-xl mb-3 transition-all open:border-gray-300 open:shadow-md">
            <summary className="cursor-pointer py-[18px] px-[22px] font-bold text-[15px] text-gray-900 flex items-center justify-between gap-4 list-none after:content-[''] after:w-6 after:h-6 after:rounded-full after:bg-gray-100 after:grid after:place-items-center after:transition-all after:bg-[url('data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23374151\' stroke-width=\'2.5\'><polyline points=\'6 9 12 15 18 9\'/></svg>')] after:bg-no-repeat after:bg-center after:bg-[length:12px_12px] open:after:rotate-180">Kurslar pulli bo'ladimi?</summary>
            <div className="px-[22px] pb-5 text-gray-500 text-[14.5px] leading-relaxed">Yo'q, Raqamli Avlod platformasidagi barcha asosiy kurslar tekin. Faqat ro'yxatdan o'tib, o'rganishni boshlashingiz mumkin.</div>
          </details>
          <details className="bg-white border border-gray-200 rounded-xl mb-3 transition-all open:border-gray-300 open:shadow-md">
            <summary className="cursor-pointer py-[18px] px-[22px] font-bold text-[15px] text-gray-900 flex items-center justify-between gap-4 list-none after:content-[''] after:w-6 after:h-6 after:rounded-full after:bg-gray-100 after:grid after:place-items-center after:transition-all after:bg-[url('data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23374151\' stroke-width=\'2.5\'><polyline points=\'6 9 12 15 18 9\'/></svg>')] after:bg-no-repeat after:bg-center after:bg-[length:12px_12px] open:after:rotate-180">Tanlovlarda qanday ishtirok etish mumkin?</summary>
            <div className="px-[22px] pb-5 text-gray-500 text-[14.5px] leading-relaxed">Faol tanlov va kontestlar haqida ma'lumotni "DG Kontest" bo'limida va Telegram kanalimizda topishingiz mumkin. Har bir tanlov uchun alohida ariza topshiriladi.</div>
          </details>
          <details className="bg-white border border-gray-200 rounded-xl mb-3 transition-all open:border-gray-300 open:shadow-md">
            <summary className="cursor-pointer py-[18px] px-[22px] font-bold text-[15px] text-gray-900 flex items-center justify-between gap-4 list-none after:content-[''] after:w-6 after:h-6 after:rounded-full after:bg-gray-100 after:grid after:place-items-center after:transition-all after:bg-[url('data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23374151\' stroke-width=\'2.5\'><polyline points=\'6 9 12 15 18 9\'/></svg>')] after:bg-no-repeat after:bg-center after:bg-[length:12px_12px] open:after:rotate-180">Sertifikat olish mumkinmi?</summary>
            <div className="px-[22px] pb-5 text-gray-500 text-[14.5px] leading-relaxed">Ha, kursni muvaffaqiyatli yakunlagan o'quvchilar elektron sertifikat oladilar. Ayrim yirik tanlov g'oliblariga esa qo'shimcha mukofotlar beriladi.</div>
          </details>
          <details className="bg-white border border-gray-200 rounded-xl mb-3 transition-all open:border-gray-300 open:shadow-md">
            <summary className="cursor-pointer py-[18px] px-[22px] font-bold text-[15px] text-gray-900 flex items-center justify-between gap-4 list-none after:content-[''] after:w-6 after:h-6 after:rounded-full after:bg-gray-100 after:grid after:place-items-center after:transition-all after:bg-[url('data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23374151\' stroke-width=\'2.5\'><polyline points=\'6 9 12 15 18 9\'/></svg>')] after:bg-no-repeat after:bg-center after:bg-[length:12px_12px] open:after:rotate-180">Hamkorlik qilish uchun kim bilan bog'lanaman?</summary>
            <div className="px-[22px] pb-5 text-gray-500 text-[14.5px] leading-relaxed">Hamkorlik bo'yicha takliflarni info@raqamliavlod.uz pochtasiga yoki shu sahifadagi forma orqali "Hamkorlik" mavzusini tanlab yuborishingiz mumkin.</div>
          </details>
          <details className="bg-white border border-gray-200 rounded-xl mb-3 transition-all open:border-gray-300 open:shadow-md">
            <summary className="cursor-pointer py-[18px] px-[22px] font-bold text-[15px] text-gray-900 flex items-center justify-between gap-4 list-none after:content-[''] after:w-6 after:h-6 after:rounded-full after:bg-gray-100 after:grid after:place-items-center after:transition-all after:bg-[url('data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23374151\' stroke-width=\'2.5\'><polyline points=\'6 9 12 15 18 9\'/></svg>')] after:bg-no-repeat after:bg-center after:bg-[length:12px_12px] open:after:rotate-180">Texnik muammo yuzasidan kim yordam beradi?</summary>
            <div className="px-[22px] pb-5 text-gray-500 text-[14.5px] leading-relaxed">Texnik muammolar bo'yicha forma orqali "Texnik yordam" mavzusini tanlang yoki bevosita Telegram kanalimizning admini bilan bog'laning.</div>
          </details>
        </div>
      </div>
    </div>
  )
}