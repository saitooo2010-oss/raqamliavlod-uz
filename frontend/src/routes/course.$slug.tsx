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
          <Link to="/" className="text-sm text-gray-500 hover:text-blue-700 transition-all duration-300 flex items-center gap-1 hover:gap-2">
            ← Bosh sahifaga qaytish
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <div className="aspect-video rounded-2xl overflow-hidden bg-black shadow-lg">
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
                    className="px-5 py-2.5 text-sm bg-white border-2 border-gray-200 rounded-xl text-gray-700 font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-blue-600 hover:text-blue-700"
                  >
                    ← Oldingi dars
                  </Link>
                )}
                {nextCourse && (
                  <Link
                    to="/course/$slug"
                    params={{ slug: nextCourse.slug }}
                    className="px-5 py-2.5 text-sm bg-blue-700 text-white rounded-xl font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:bg-blue-800 flex items-center gap-1"
                  >
                    Keyingi dars →
                  </Link>
                )}
              </div>
            </div>

            <div className="flex gap-6 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('description')}
                className={`pb-3 px-1 text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  activeTab === 'description'
                    ? 'text-blue-700 border-b-2 border-blue-700'
                    : 'text-gray-500 hover:text-blue-700 hover:border-b-2 hover:border-blue-300'
                }`}
              >
                Tavsif
              </button>
              <button
                onClick={() => setActiveTab('comments')}
                className={`pb-3 px-1 text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  activeTab === 'comments'
                    ? 'text-blue-700 border-b-2 border-blue-700'
                    : 'text-gray-500 hover:text-blue-700 hover:border-b-2 hover:border-blue-300'
                }`}
              >
                Izohlar ({comments.length})
              </button>
            </div>

            <div className="mt-6">
              {activeTab === 'description' && (
                <div>
                  <h1 className="text-2xl font-bold text-blue-700">{currentCourse.title}</h1>
                  <p className="mt-4 text-gray-600 leading-relaxed">{currentCourse.description}</p>
                </div>
              )}

              {activeTab === 'comments' && (
                <div>
                  <div className="mb-6 p-5 bg-white rounded-2xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-md">
                    <h3 className="font-bold text-blue-700 mb-3 text-lg">Izoh qoldirish</h3>
                    <input
                      type="text"
                      placeholder="Ismingiz"
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                      className="w-full mb-3 px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 transition-all duration-300"
                    />
                    <textarea
                      placeholder="Izohingiz..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      rows={3}
                      className="w-full mb-3 px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 transition-all duration-300 resize-none"
                    />
                    <button
                      onClick={handleAddComment}
                      className="px-6 py-2.5 bg-orange-500 text-white text-sm font-semibold rounded-xl hover:bg-orange-600 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 cursor-pointer"
                    >
                      Yuborish
                    </button>
                  </div>

                  <div className="space-y-4">
                    {comments.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">Hali hech qanday izoh yo'q. Birinchi bo'lib izoh qoldiring!</p>
                    ) : (
                      comments.map((comment) => (
                        <div key={comment.id} className="p-4 bg-white rounded-xl border border-gray-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-red-300">
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-bold text-red-600">{comment.name}</span>
                            <span className="text-xs text-gray-400">{comment.date}</span>
                          </div>
                          <p className="text-gray-600 text-sm leading-relaxed">{comment.text}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="w-full lg:w-80 shrink-0">
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md lg:sticky lg:top-6 transition-all duration-300 hover:shadow-xl">
              <div className="p-4 bg-blue-700 text-white font-bold text-sm tracking-wide">Darslar seriyasi</div>
              <div className="max-h-[450px] overflow-y-auto p-2 space-y-1">
                {seriesCourses.map((course, idx) => (
                  <Link
                    key={course.id}
                    to="/course/$slug"
                    params={{ slug: course.slug }}
                    className={`block p-3 rounded-xl text-sm transition-all duration-300 ${
                      course.slug === slug 
                        ? 'bg-green-600 text-white font-bold shadow-md' 
                        : 'text-gray-700 hover:bg-blue-50 hover:translate-x-1'
                    }`}
                  >
                    <span className="truncate block">
                      {idx + 1}. {course.title}
                    </span>
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