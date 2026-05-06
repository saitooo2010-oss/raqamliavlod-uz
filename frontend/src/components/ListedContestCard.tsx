import { LogInIcon, PlusIcon, UsersIcon } from 'lucide-react'
import { Button } from './ui/button'
import { useMutation } from '@tanstack/react-query'
import TinyLoading from './TinyLoading'
import api from '@/lib/api'
import addDialog from '@/lib/dialog'
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Link } from '@tanstack/react-router'

function JoinContestButton({
  contest,
  refetchCallback,
}: {
  contest: ListedContest
  refetchCallback: () => void
}) {
  const { mutate, isPending, variables } = useMutation({
    mutationKey: ['cotest', 'join', contest.guid],
    mutationFn: async () => {
      const response = await api.post('https://www.google.com')
      if (response.status !== 201) throw response
      return response
    },
  })

  return (
    <>
      {contest.is_joined ? (
        <Button
          size="lg"
          className="relative px-4"
          disabled={isPending}
          asChild
        >
          <Link to="/contest/$slug" params={{ slug: contest.slug }}>
            {isPending && <TinyLoading />}
            <span className="icon">
              <LogInIcon />
            </span>
            <span className="text">Kirish</span>
          </Link>
        </Button>
      ) : (
        <Button
          size="lg"
          className="relative px-4"
          disabled={isPending}
          onClick={() => {
            mutate(variables, {
              onError: () => {
                addDialog({
                  id: 'noid',
                  component: (
                    <>
                      <DialogHeader>
                        <DialogTitle>Xatolik yuz berdi</DialogTitle>
                        <DialogDescription>
                          Ushbu xatolik internet aloqasiga aloqador bo'lishi
                          mumkin, yoki bizning API serverlar ishdan chiqgan
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button>Yopish</Button>
                        </DialogClose>
                      </DialogFooter>
                    </>
                  ),
                })
              },
              onSuccess: refetchCallback,
            })
          }}
        >
          {isPending && <TinyLoading />}
          <span className="icon">
            <PlusIcon />
          </span>
          <span className="text">Qo'shilish</span>
        </Button>
      )}
    </>
  )
}

export default function ListedContestCard({
  contest,
}: {
  contest: ListedContest
}) {
  return (
    <>
      <div className="flex items-start gap-4 bg-white p-4 rounded-lg">
        <div className="relative min-w-fit h-36 aspect-16/10 bg-blue-400 rounded-lg overflow-hidden">
          <img
            src={contest.thumbnail}
            alt={contest.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-all duration-200 ease-in"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
          />
        </div>
        <div className="w-full">
          <h3 className="text-2xl font-semibold font-roboto">
            {contest.title}
          </h3>
          <p className="text-gray-600">{contest.short_description}</p>

          <div className="flex items-center justify-end gap-4 mt-4">
            <p className="flex items-center justify-center gap-2">
              <span className="icon">
                <UsersIcon size={16} />
              </span>
              <span className="text">{contest.subscribers}</span>
            </p>
            <div className="contest-action">
              <JoinContestButton contest={contest} refetchCallback={() => {}} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
