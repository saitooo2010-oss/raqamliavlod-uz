import React, { useMemo } from 'react'

import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'
import { useLocation } from '@tanstack/react-router'

export default function RenderContent({
  children,
}: {
  children: React.ReactNode
}) {
  const location = useLocation()
  const isFullPage = useMemo(() => {
    return location.pathname.includes('auth')
  }, [location])

  return (
    <>
      <div
        className={`render-content w-full h-${isFullPage ? 'screen' : '[calc(100vh-72px)]'} ${['/contact', '/about', '/', ""].includes(location.pathname) ? '' : 'p-4 lg:p-14'} overflow-x-hidden overflow-y-auto`}
      >
        {children}

        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
      </div>
    </>
  )
}
