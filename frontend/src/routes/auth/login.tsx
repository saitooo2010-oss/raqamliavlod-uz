import Loading from '@/components/Loading'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useAppForm } from '@/hooks/form'
import { loginFormOpts } from '@/lib/login.form-options'
import { ClientOnly, createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import api from '@/lib/api'
import { setTokens } from '@/lib/api'
import { useStore } from '@tanstack/react-form'
import { useState } from 'react'

export const Route = createFileRoute('/auth/login')({
  head: () => ({ meta: [{ title: "Kirish - RaqamliAvlod" }] }),
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const [submitError, setSubmitError] = useState<string | null>(null)

  const form = useAppForm({
    ...loginFormOpts,
    onSubmit: async ({ value }) => {
      setSubmitError(null)
      try {
        const response = await api.post('accounts/login', value)
        if (response.status === 200) {
          setTokens(response.data.access, response.data.refresh)
          // Successful login, redirect to home
          navigate({ to: '/' })
        } else {
          throw new Error('Kirishda xatolik yuz berdi')
        }
      } catch (error: any) {
        if (error.response?.data) {
          const errors = error.response.data
          if (typeof errors === 'object') {
            const errorMessages = Object.values(errors)
              .flat()
              .map((v) => (typeof v === 'string' ? v : JSON.stringify(v)))
              .join(', ')
            setSubmitError(errorMessages)
          } else {
            setSubmitError('Kirishda xatolik yuz berdi')
          }
        } else {
          setSubmitError('Tarmoq xatoligi. Iltimos, qayta urinib ko\'ring.')
        }
      }
    },
  })

  const isSubmitting = useStore(form.store, (state) => state.isSubmitting)

  return (
    <>
      <div className="container max-w-md min-h-full flex justify-center flex-col mx-auto py-8">
        <Link to="/" className="block mx-auto mb-12">
          <img
            src="/assets/logo.webp"
            alt="RaqamliAvlod"
            className="h-18"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </Link>

        <Card className="w-full shadow-none">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Kirish
            </CardTitle>
            <CardDescription hidden>
              Akkauntingizga kirish uchun ma'lumotlarni kiriting
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submitError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700">
                {submitError}
              </div>
            )}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit()
              }}
            >
              <ClientOnly fallback={<Loading />}>
                <form.AppField
                  name="username"
                  validators={{
                    onChange: ({ value }) => {
                      if (value.length < 1) {
                        return "Foydalanuvchi nomi kiritish majburiy"
                      }
                    }
                  }}
                  children={(field) => (
                    <field.TextField
                      label="Foydalanuvchi nomi"
                      placeholder="Foydalanuvchi nomini kiriting"
                    />
                  )}
                />

                <form.AppField
                  name="password"
                  validators={{
                    onChange: ({ value }) => {
                      if (value.length < 1) {
                        return "Parol kiritish majburiy"
                      }
                    }
                  }}
                  children={(field) => (
                    <field.TextField
                      label="Parol"
                      placeholder="Parolni kiriting"
                      type="password"
                    />
                  )}
                />

                <div className="flex items-center justify-center">
                  <Button type="submit" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? 'Kirilmoqda...' : 'Kirish'}
                  </Button>
                </div>
              </ClientOnly>
            </form>
            <div className="mt-4 text-center">
              <Link to="/auth/register" className="text-primary hover:underline">
                Akkauntingiz yo'qmi? Ro'yhatdan o'tish
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
