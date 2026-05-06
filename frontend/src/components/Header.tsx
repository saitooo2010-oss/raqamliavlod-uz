import { Link, useLocation, useNavigate } from '@tanstack/react-router'
import { Button } from './ui/button'
import { BabyIcon, LogInIcon, MenuIcon, UserIcon, LogOutIcon } from 'lucide-react'
import { useCallback, useState, useEffect } from 'react'
import { uiStore } from '@/data/ui-store'
import { isLoggedIn, clearTokens } from '@/lib/api'

export default function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    setLoggedIn(isLoggedIn())
  }, [location.pathname])

  const toggleSidebar = useCallback(() => {
    uiStore.setState((state) => ({ ...state, isAsideOpen: !state.isAsideOpen }))
  }, [])

  const handleLogout = useCallback(() => {
    clearTokens()
    setLoggedIn(false)
    navigate({ to: '/' })
  }, [navigate])

  if (location.pathname.includes('auth')) return null

  return (
    <>
      <header className="w-full bg-white h-18 flex items-center border-b">
        <div className="w-full flex items-center justify-between px-4">
          <div className="flex items-center justify-center gap-0.5">
            <Button variant="ghost" size="icon-lg" onClick={toggleSidebar}>
              <MenuIcon />
            </Button>

            <Link to="/">
              <img
                src="/assets/logo.webp"
                alt="Logo"
                className="h-10"
                decoding="async"
                fetchPriority="high"
              />
            </Link>
          </div>

          <div className="space-x-4">
            {loggedIn ? (
              <>
                <Button asChild size="lg" variant="outline">
                  <Link to="/profile">
                    <span className="icon">
                      <UserIcon />
                    </span>
                    <span className="text">Profil</span>
                  </Link>
                </Button>
                <Button size="lg" variant="ghost" onClick={handleLogout}>
                  <span className="icon">
                    <LogOutIcon />
                  </span>
                  <span className="text">Chiqish</span>
                </Button>
              </>
            ) : (
              <>
                <Button asChild size="lg">
                  <Link to="/auth/register">
                    <span className="icon">
                      <BabyIcon />
                    </span>
                    <span className="text">Ro'yhatdan o'tish</span>
                  </Link>
                </Button>
                <Button asChild size="lg">
                  <Link to="/auth/login">
                    <span className="icon">
                      <LogInIcon />
                    </span>
                    <span className="text">Kirish</span>
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  )
}
