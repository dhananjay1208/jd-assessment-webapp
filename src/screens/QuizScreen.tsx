import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuiz, selectAnsweredCount } from '../store/quiz'
import { QUESTIONS } from '../content/quiz'
import { QuestionCard } from '../components/QuestionCard'
import { cn } from '../lib/cn'
import { ChevronLeft, ChevronRight, Check } from '../components/icons'

const byId = (id: string) => QUESTIONS.find((q) => q.id === id)!

export function QuizScreen() {
  const navigate = useNavigate()
  const order = useQuiz((s) => s.order)
  const optionOrder = useQuiz((s) => s.optionOrder)
  const answers = useQuiz((s) => s.answers)
  const started = useQuiz((s) => s.started)
  const submitted = useQuiz((s) => s.submitted)
  const choose = useQuiz((s) => s.choose)
  const submit = useQuiz((s) => s.submit)

  const [idx, setIdx] = useState(0)
  const [confirm, setConfirm] = useState(false)

  useEffect(() => {
    if (!started) navigate('/', { replace: true })
    else if (submitted) navigate('/result', { replace: true })
  }, [started, submitted, navigate])

  if (!started || order.length === 0) return null

  const total = order.length
  const answered = selectAnsweredCount(answers)
  const qid = order[idx]
  const question = byId(qid)
  const isLast = idx === total - 1

  const doSubmit = () => {
    submit()
    navigate('/result')
  }

  return (
    <div className="min-h-screen bg-cream pb-10">
      <header className="sticky top-0 z-10 border-b border-line bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-2xl px-4 py-3">
          <div className="mb-1.5 flex items-center justify-between text-xs font-bold text-ink-soft">
            <span className="uppercase tracking-[0.14em] text-jd-green">
              Block 1 and 2 Knowledge Check
            </span>
            <span>
              {answered} of {total} answered
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-line">
            <div
              className="h-full rounded-full bg-jd-green transition-[width] duration-300"
              style={{ width: `${(answered / total) * 100}%` }}
            />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-5">
        <QuestionCard
          question={question}
          displayOrder={optionOrder[qid] ?? question.options.map((_, i) => i)}
          chosen={answers[qid] ?? null}
          mode="interactive"
          index={idx + 1}
          total={total}
          onChoose={(oi) => choose(qid, oi)}
        />

        <div className="mt-4 flex items-center justify-between gap-3">
          <button
            onClick={() => setIdx((i) => Math.max(0, i - 1))}
            disabled={idx === 0}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-xl bg-white px-4 py-3 text-sm font-bold text-jd-green-dark ring-1 ring-line transition hover:bg-jd-green-mist disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={16} /> Previous
          </button>
          {!isLast ? (
            <button
              onClick={() => setIdx((i) => Math.min(total - 1, i + 1))}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-xl bg-jd-green px-5 py-3 text-sm font-bold text-white transition hover:bg-jd-green-dark"
            >
              Next <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={() => (answered < total ? setConfirm(true) : doSubmit())}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-xl bg-jd-green px-5 py-3 text-sm font-bold text-white transition hover:bg-jd-green-dark"
            >
              <Check size={16} /> Submit
            </button>
          )}
        </div>

        {/* Question navigator */}
        <div className="mt-6">
          <div className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-ink-soft">
            Jump to a question
          </div>
          <div className="grid grid-cols-8 gap-1.5 sm:grid-cols-10">
            {order.map((id, i) => {
              const done = answers[id] != null
              const current = i === idx
              return (
                <button
                  key={id}
                  onClick={() => setIdx(i)}
                  className={cn(
                    'grid h-9 place-items-center rounded-lg text-xs font-bold transition',
                    current
                      ? 'bg-jd-green text-white ring-2 ring-jd-green-deep'
                      : done
                        ? 'bg-jd-green-mist text-jd-green-dark'
                        : 'bg-white text-ink-soft ring-1 ring-line hover:bg-jd-green-mist',
                  )}
                >
                  {i + 1}
                </button>
              )
            })}
          </div>
        </div>

        <button
          onClick={() => (answered < total ? setConfirm(true) : doSubmit())}
          className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-jd-green px-5 py-3 text-sm font-bold text-white transition hover:bg-jd-green-dark"
        >
          <Check size={16} /> Submit assessment
        </button>
      </main>

      {confirm && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-[var(--shadow-lift)]">
            <div className="text-base font-extrabold text-jd-green-deep">
              Submit with {total - answered} unanswered?
            </div>
            <p className="mt-1.5 text-sm text-ink-soft">
              Unanswered questions count as incorrect. You can go back and finish
              them first.
            </p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setConfirm(false)}
                className="inline-flex min-h-11 flex-1 items-center justify-center rounded-xl bg-white px-4 py-3 text-sm font-bold text-jd-green-dark ring-1 ring-line transition hover:bg-jd-green-mist"
              >
                Go back
              </button>
              <button
                onClick={doSubmit}
                className="inline-flex min-h-11 flex-1 items-center justify-center rounded-xl bg-jd-green px-4 py-3 text-sm font-bold text-white transition hover:bg-jd-green-dark"
              >
                Submit anyway
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
