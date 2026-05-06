import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import api from '@/lib/api'
import { isLoggedIn } from '@/lib/api'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Loading from '@/components/Loading'

export const Route = createFileRoute('/profile')({
  head: () => ({ meta: [{ title: 'Profil - RaqamliAvlod' }] }),
  component: RouteComponent,
})

interface UserProfile {
  id: number
  first_name: string
  middle_name: string
  last_name: string
  username: string
  email: string
  phone: string
  region: number
  district: number
  telegram: string
  school: string
}

function RouteComponent() {
  const navigate = useNavigate()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState<Partial<UserProfile>>({})

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate({ to: '/auth/login' })
      return
    }
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const res = await api.get('accounts/profile')
      setProfile(res.data)
      setForm(res.data)
    } catch {
      setError("Profil ma'lumotlarini yuklashda xatolik")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(false)
    try {
      const res = await api.patch('accounts/profile', form)
      setProfile(res.data)
      setSuccess(true)
    } catch (err: any) {
      const data = err.response?.data
      if (data && typeof data === 'object') {
        const messages = Object.values(data)
          .flat()
          .map((v) => (typeof v === 'string' ? v : JSON.stringify(v)))
          .join(', ')
        setError(messages)
      } else {
        setError("Saqlashda xatolik yuz berdi")
      }
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="p-8"><Loading /></div>

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl">Mening profilim</CardTitle>
          {profile && (
            <p className="text-muted-foreground text-sm">@{profile.username}</p>
          )}
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md text-green-700">
              Profil muvaffaqiyatli saqlandi!
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="input-group">
                <Label htmlFor="first_name" className="mb-2">Ism</Label>
                <Input
                  id="first_name"
                  name="first_name"
                  value={form.first_name || ''}
                  onChange={handleChange}
                  placeholder="Ismingiz"
                  className="shadow-none"
                />
              </div>

              <div className="input-group">
                <Label htmlFor="middle_name" className="mb-2">Otasining ismi</Label>
                <Input
                  id="middle_name"
                  name="middle_name"
                  value={form.middle_name || ''}
                  onChange={handleChange}
                  placeholder="Otasining ismi"
                  className="shadow-none"
                />
              </div>

              <div className="input-group">
                <Label htmlFor="last_name" className="mb-2">Familiya</Label>
                <Input
                  id="last_name"
                  name="last_name"
                  value={form.last_name || ''}
                  onChange={handleChange}
                  placeholder="Familiyangiz"
                  className="shadow-none"
                />
              </div>

              <div className="input-group">
                <Label htmlFor="email" className="mb-2">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email || ''}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  className="shadow-none"
                />
              </div>

              <div className="input-group">
                <Label htmlFor="phone" className="mb-2">Telefon</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={form.phone || ''}
                  onChange={handleChange}
                  placeholder="+998901234567"
                  className="shadow-none"
                />
              </div>

              <div className="input-group">
                <Label htmlFor="telegram" className="mb-2">Telegram</Label>
                <Input
                  id="telegram"
                  name="telegram"
                  value={form.telegram || ''}
                  onChange={handleChange}
                  placeholder="@username"
                  className="shadow-none"
                />
              </div>

              <div className="input-group md:col-span-2">
                <Label htmlFor="school" className="mb-2">Maktab</Label>
                <Input
                  id="school"
                  name="school"
                  value={form.school || ''}
                  onChange={handleChange}
                  placeholder="Maktab nomini kiriting"
                  className="shadow-none"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button type="submit" size="lg" disabled={saving}>
                {saving ? 'Saqlanmoqda...' : 'Saqlash'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
