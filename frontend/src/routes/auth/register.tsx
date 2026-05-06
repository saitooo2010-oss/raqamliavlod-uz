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
import { registerFormOpts } from '@/lib/register.form-options'
import { ClientOnly, createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import regions from "@/sources/regions.json"
import districts from "@/sources/districts.json"
import api, { setTokens } from '@/lib/api'
import {SelectGroup, SelectItem, SelectLabel} from '@/components/ui/select'
import {useStore} from '@tanstack/react-form'
import {useEffect, useMemo, useState} from 'react'

export const Route = createFileRoute('/auth/register')({
  head: () => ({ meta: [{ title: "Ro'yhatdan o'tish - RaqamliAvlod" }] }),
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const [submitError, setSubmitError] = useState<string | null>(null)

  const form = useAppForm({
    ...registerFormOpts,
    onSubmit: async ({ value }) => {
      setSubmitError(null)
      try {
        const response = await api.post('accounts/register', value)
        if (response.status === 201) {
          setTokens(response.data.access, response.data.refresh)
          navigate({ to: '/' })
        } else {
          throw new Error('Ro\'yhatdan o\'tishda xatolik yuz berdi')
        }
      } catch (error: any) {
        if (error.response?.data) {
          // Handle API errors
          const errors = error.response.data
          if (typeof errors === 'object') {
            const errorMessages = Object.values(errors)
              .flat()
              .map((v) => (typeof v === 'string' ? v : JSON.stringify(v)))
              .join(', ')
            setSubmitError(errorMessages)
          } else {
            setSubmitError('Ro\'yhatdan o\'tishda xatolik yuz berdi')
          }
        } else {
          setSubmitError('Tarmoq xatoligi. Iltimos, qayta urinib ko\'ring.')
        }
      }
    },
  })

  const regionId = useStore(form.store, (state) => state.values.region)
  const isSubmitting = useStore(form.store, (state) => state.isSubmitting)

  const selectedDistricts = useMemo(() => {
    return districts.filter((value) => Number(value.region_id) === Number(regionId))
  }, [regionId])

  useEffect(() => {
    form.setFieldValue('district', '')
  }, [regionId])

  return (
    <>
      <div className="container max-w-xl min-h-full flex justify-center flex-col mx-auto py-8">
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
              Ro'yhatdan o'tish
            </CardTitle>
            <CardDescription hidden>
              Ro'yhatdan o'tish uchun ushbu formani to'liq to'ldiring
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
                <div className="flex w-full flex-col md:flex-row gap-4">
                  <form.AppField
                    name="first_name"
                    validators={{
                      onChange: ({ value }) => {
                        if (value.length < 1) {
                          return "Ism kiritish majburiy"
                        }
                      }
                    }}
                    children={(field) => (
                      <field.TextField label="Ism" placeholder="Ism kiriting" />
                    )}
                  />

                  <form.AppField
                    name="last_name"
                    validators={{
                      onChange: ({ value }) => {
                        if (value.length < 1) {
                          return "Familiya kiritish majburiy"
                        }
                      }
                    }}
                    children={(field) => (
                      <field.TextField
                        label="Familiya"
                        placeholder="Familiya kiriting"
                      />
                    )}
                  />
                </div>

                <form.AppField
                  name="username"
                  validators={{
                    onChange: ({ value }) => {
                      if (value) {
                      }
                    },
                    onChangeAsync: async () => {
                    },
                    onChangeAsyncDebounceMs: 400
                  }}
                  children={(field) => (
                    <field.TextField
                      label="Foydalanuvchi nomi"
                      placeholder="Foydalanuvchi nomi tanlang"
                    />
                  )}
                />

                <div className="flex w-full flex-col md:flex-row gap-4">
                  <form.AppField
                    name="region"
                    validators={{
                      onChange: ({value}) => {
                        if (regions.find((region) => Number(region.id) === Number(value))) return undefined
                        return "To'g'ri viloyat (shahar) tanlang"
                      }
                    }}
                    children={(field) => (
                      <field.SelectField
                        label="Viloyat"
                        placeholder="Viloyat tanlang"

                      >
                        <SelectGroup>
                          <SelectLabel>Viloyat (shahar)lar</SelectLabel>
                          {regions.map((value, index) => <SelectItem value={value.id.toString()} key={index}>{value.name_uz}</SelectItem>)}
                        </SelectGroup>
                      </field.SelectField>
                    )}
                  />
 
                  <form.AppField
                    name="district"
                    validators={{
                      onChange: ({value}) => {
                        if (regionId === '' || selectedDistricts.find((district) => Number(district.id) === Number(value))) return undefined
                        return "To'g'ri tuman (shahar) tanlang"
                      }
                    }}
                    children={(field) => (
                      <field.SelectField
                        label="Tuman"
                        placeholder="Tuman tanlang"
                      >
                        <SelectGroup>
                          <SelectLabel>Tuman (shahar)lar</SelectLabel>
                          {selectedDistricts.map((value, index) => <SelectItem value={value.id.toString()} key={index}>{value.name_uz}</SelectItem>)}
                        </SelectGroup>
                      </field.SelectField>
                    )}
                  />
                </div>

                <div className="flex w-full flex-col md:flex-row gap-4">
                  <form.AppField
                    name="phone"
                    children={(field) => (
                      <field.PhoneField label="Telefon raqam" />
                    )}
                  />

                  <form.AppField
                    name="telegram"
                    children={(field) => (
                      <field.TextField
                        label="Telegram"
                        placeholder="@Telegram"
                      />
                    )}
                  />
                </div>

                <form.AppField
                  name="school"
                  children={(field) => (
                    <field.TextField
                      label="Maktab"
                      placeholder="Maktab nomini kiriting"
                    />
                  )}
                />

                <div className="flex w-full flex-col md:flex-row gap-4">
                  <form.AppField
                    name="password"
                    children={(field) => (
                      <field.TextField label="Parol" placeholder="Parol kiriting" type="password" />
                    )}
                  />

                  <form.AppField
                    name="password_confirm"
                    children={(field) => (
                      <field.TextField
                        label="Parol (tasdiqlash)"
                        placeholder="Parolni qayta kiriting"
                        type="password"
                      />
                    )}
                  />
                </div>

                <div className="flex items-center justify-center">
                  <Button type="submit" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? 'Ro\'yhatdan o\'tilmoqda...' : 'Ro\'yhatdan o\'tish'}
                  </Button>
                </div>
              </ClientOnly>
            </form>
            <div className="mt-4 text-center">
              <Link to="/auth/login" className="text-primary hover:underline">
                Akkauntingiz bormi? Kirish
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
