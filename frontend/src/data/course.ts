import type { NewCourse } from '@/types/course'

export const COURSES: (NewCourse & { gradient: string })[] = [
  {
    id: 1,
    slug: "desktop-dasturlash",
    title: "Desktop Dasturlash",
    thumbnail: "",
    short_description: "C# va WinForms asoslari",
    gradient: "from-[#4a90e2] to-[#c471ed]",
  },
  {
    id: 2,
    slug: "web-dasturlash",
    title: "Web Dasturlash",
    thumbnail: "",
    short_description: "HTML, CSS, JavaScript, React",
    gradient: "from-[#1eb5e7] to-[#4a90e2]",
  },
  {
    id: 3,
    slug: "mobil-dasturlash",
    title: "Mobil Dasturlash",
    thumbnail: "",
    short_description: "Flutter, Kotlin",
    gradient: "from-[#c471ed] to-[#ec4899]",
  },
  {
    id: 4,
    slug: "2d-grafika",
    title: "2D Grafik",
    thumbnail: "",
    short_description: "Adobe Photoshop, Illustrator",
    gradient: "from-[#1ba980] to-[#1eb5e7]",
  },
  {
    id: 5,
    slug: "telegram-bot",
    title: "Telegram bot",
    thumbnail: "",
    short_description: "Python, aiogram",
    gradient: "from-[#f59e0b] to-[#ef4444]",
  },
  {
    id: 6,
    slug: "front-end",
    title: "Front-End",
    thumbnail: "",
    short_description: "React, Tailwind, TypeScript",
    gradient: "from-[#4a90e2] to-[#1ba980]",
  },
]