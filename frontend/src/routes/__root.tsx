import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import Header from '../components/Header'

import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'
import Aside from '@/components/Aside'
import RenderContent from '@/components/RenderContent'
import DialogProvider from '@/components/DialogProvider'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'RaqamliAvlod',
      },
    ],
    links: [
      // --- Favicon ---
      {
        rel: 'icon',
        href: '/favicon.ico',
        type: 'image/x-icon',
      },

      // --- App CSS ---
      {
        rel: 'preload',
        href: appCss,
        as: 'style',
      },
      {
        rel: 'stylesheet',
        href: appCss,
      },

      // --- Google fonts preload (tez yuklash uchun majburiy) ---
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: '',
      },

      // Roboto
      {
        rel: 'preload',
        as: 'style',
        href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@100;200;300;400;500;600;700;800;900&display=swap',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@100;200;300;400;500;600;700;800;900&display=swap',
      },

      // Poppins
      {
        rel: 'preload',
        as: 'style',
        href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap',
      },

      // Host Grotesk
      {
        rel: 'preload',
        as: 'style',
        href: 'https://fonts.googleapis.com/css2?family=Host+Grotesk:wght@100;200;300;400;500;600;700;800;900&display=swap',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Host+Grotesk:wght@100;200;300;400;500;600;700;800;900&display=swap',
      },

      // --- Swiper CSS ---
      {
        rel: 'preload',
        as: 'style',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/11.0.5/swiper-bundle.css',
      },
      {
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/11.0.5/swiper-bundle.css',
      },

      // --- Preload important images ---
      {
        rel: 'preload',
        as: 'image',
        href: '/assets/logo.webp',
      },
    ],
  }),

  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <DialogProvider>
          <Header />

          <div className="main-content h-auto flex items-start justify-start bg-zinc-100">
            <Aside />

            <RenderContent>{children}</RenderContent>
          </div>

          <Scripts />
        </DialogProvider>
      </body>
    </html>
  )
}
