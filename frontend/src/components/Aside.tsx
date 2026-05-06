import { uiStore, useUiStore } from '@/data/ui-store'
import { Button } from './ui/button'
import { Link, useLocation } from '@tanstack/react-router'
import {
  HomeIcon,
  PlayCircleIcon,
  MessagesSquareIcon,
  BookMarkedIcon,
  LightbulbIcon,
  InfoIcon,
  PhoneCallIcon,
} from 'lucide-react'

export default function Aside() {
  const isOpen = useUiStore((state) => state.isAsideOpen)
  const location = useLocation()

  const navItems = [
    { to: '/', icon: HomeIcon, text: 'Bosh sahifa' },
    { to: '/courses', icon: PlayCircleIcon, text: 'Kurslar' },
    { to: '/forum', icon: MessagesSquareIcon, text: 'Forum' },
    { to: '/articles', icon: BookMarkedIcon, text: 'Maqolalar' },
    { to: '/contest', icon: LightbulbIcon, text: 'DG contest' },
    { to: '/about', icon: InfoIcon, text: 'Biz haqimizda' },
    { to: '/contact', icon: PhoneCallIcon, text: 'Aloqa' },
  ]

  if (location.pathname.includes('auth')) return null

  return (
    <>
      <aside
        className={`h-[calc(100vh-72px)] bg-white border-r transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'w-96' : 'w-20'
        }`}
      >
        <nav className="flex flex-col items-start justify-start p-4 gap-2">
          {navItems.map((item) => (
            <Button
              key={item.to}
              asChild
              className={`transition-all duration-300 ease-in-out ${
                isOpen
                  ? 'w-full justify-start px-4'
                  : 'w-10 justify-center px-0 gap-0'
              }`}
              variant="ghost"
              size="lg"
            >
              <Link to={item.to} activeProps={{ className: 'bg-accent' }}>
                <item.icon />
                <span
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen
                      ? 'visible ml-1 opacity-100 w-auto max-w-[200px]'
                      : 'invisible ml-0 opacity-0 w-0 max-w-0'
                  }`}
                  style={{
                    transitionProperty: 'opacity, margin, max-width, width',
                  }}
                >
                  {item.text}
                </span>
              </Link>
            </Button>
          ))}
        </nav>
      </aside>
    </>
  )
}
