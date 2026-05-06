import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { COURSE_DETAIL } from '../data/courseDetail'
import { COMMENTS_DATA } from '../data/comment'
import type { Comment } from '../types/comment'

export const Route = createFileRoute('/course/$slug')({
  component: CourseComponent,
})

function CourseComponent() {
  const { slug } = Route.useParams()
  const currentCourse = COURSE_DETAIL.find((course) => course.slug === slug)
  const [activeTab, setActiveTab] = useState<'description' | 'comments'>('description')
  const [newComment, setNewComment] = useState('')
  const [commentName, setCommentName] = useState('')
  
  const baseKey = slug.replace(/-\d+$/, '')
  const [comments, setComments] = useState<Comment[]>(() => {
    return COMMENTS_DATA[baseKey] ? [...COMMENTS_DATA[baseKey]] : []
  })

  if (!currentCourse) {
    return <div className="p-10 text-center">Kurs topilmadi</div>
  }

  const seriesPrefix = slug.replace(/-\d+$/, '')
  const seriesCourses = COURSE_DETAIL.filter((course) =>
    course.slug.startsWith(seriesPrefix)
  ).sort((a, b) => {
    const numA = parseInt(a.slug.match(/-(\d+)$/)?.[1] || '0')
    const numB = parseInt(b.slug.match(/-(\d+)$/)?.[1] || '0')
    return numA - numB
  })

  const currentIndex = seriesCourses.findIndex((c) => c.slug === slug)
  const prevCourse = seriesCourses[currentIndex - 1]
  const nextCourse = seriesCourses[currentIndex + 1]

  const handleAddComment = () => {
    if (!commentName.trim() || !newComment.trim()) {
      alert("Iltimos, ismingiz va sharhingizni kiriting!")
      return
    }
    const newCommentObj: Comment = {
      id: Date.now(),
      name: commentName.trim(),
      text: newComment.trim(),
      date: new Date().toLocaleDateString('uz-UZ', { day: 'numeric', month: 'long', year: 'numeric' }),
    }
    setComments([newCommentObj, ...comments])
    setNewComment('')
    setCommentName('')
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <Link to="/" className="text-sm text-gray-500 hover:text-gray-900 transition">
            ← Bosh sahifaga qaytish
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <div className="aspect-video rounded-2xl overflow-hidden bg-black shadow-sm">
              <iframe
                className="w-full h-full"
                src={currentCourse.video_url}
                title={currentCourse.title}
                allowFullScreen
              />
            </div>

            <div className="flex flex-wrap justify-between items-center gap-3 mt-4 mb-4">
              <div className="flex gap-3">
                {prevCourse && (
                  <Link
                    to="/course/$slug"
                    params={{ slug: prevCourse.slug }}
                    className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                  >
                    ← Oldingi dars
                  </Link>
                )}
                {nextCourse && (
                  <Link
                    to="/course/$slug"
                    params={{ slug: nextCourse.slug }}
                    className="px-4 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
                  >
                    Keyingi dars →
                  </Link>
                )}
              </div>
            </div>

            <div className="flex gap-4 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('description')}
                className={`pb-3 px-2 text-sm font-semibold transition-colors cursor-pointer ${
                  activeTab === 'description'
                    ? 'text-gray-900 border-b-2 border-gray-900'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Tavsif
              </button>
              <button
                onClick={() => setActiveTab('comments')}
                className={`pb-3 px-2 text-sm font-semibold transition-colors cursor-pointer ${
                  activeTab === 'comments'
                    ? 'text-gray-900 border-b-2 border-gray-900'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Izohlar ({comments.length})
              </button>
            </div>

            <div className="mt-6">
              {activeTab === 'description' && (
                <div>
                  <h1 className="text-2xl font-bold">{currentCourse.title}</h1>
                  <p className="mt-4 text-gray-600 leading-relaxed">{currentCourse.description}</p>
                </div>
              )}

              {activeTab === 'comments' && (
                <div>
                  <div className="mb-6 p-4 bg-white rounded-xl border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-3">Izoh qoldirish</h3>
                    <input
                      type="text"
                      placeholder="Ismingiz"
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                      className="w-full mb-3 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition"
                    />
                    <textarea
                      placeholder="Izohingiz..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      rows={3}
                      className="w-full mb-3 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition resize-none"
                    />
                    <button
                      onClick={handleAddComment}
                      className="px-5 py-2 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition cursor-pointer"
                    >
                      Yuborish
                    </button>
                  </div>

                  <div className="space-y-4">
                    {comments.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">Hali hech qanday izoh yo'q. Birinchi bo'lib izoh qoldiring!</p>
                    ) : (
                      comments.map((comment) => (
                        <div key={comment.id} className="p-4 bg-white rounded-xl border border-gray-200">
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-semibold text-gray-900">{comment.name}</span>
                            <span className="text-xs text-gray-400">{comment.date}</span>
                          </div>
                          <p className="text-gray-600 text-sm">{comment.text}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="w-full lg:w-80 shrink-0">
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm lg:sticky lg:top-6">
              <div className="p-4 bg-gray-50 border-b border-gray-200 font-bold text-sm">Darslar seriyasi</div>
              <div className="max-h-[450px] overflow-y-auto p-2 space-y-1">
                {seriesCourses.map((course) => (
                  <Link
                    key={course.id}
                    to="/course/$slug"
                    params={{ slug: course.slug }}
                    className="block p-3 rounded-xl text-sm transition hover:bg-gray-100"
                    activeProps={{ className: "bg-gray-100 text-gray-900 font-bold" }}
                  >
                    <span className="truncate block">{course.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}