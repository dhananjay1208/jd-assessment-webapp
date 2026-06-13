import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { toPng } from 'html-to-image'
import { useQuiz, selectScore } from '../store/quiz'
import { QUESTIONS } from '../content/quiz'
import { PASS_PCT } from '../content/quizTypes'
import { percent, verdictLine } from '../lib/scoring'
import { QuestionCard } from '../components/QuestionCard'
import { ScoreBar } from '../components/ScoreBar'
import { ArrowUp, Trophy, Check } from '../components/icons'

const byId = (id: string) => QUESTIONS.find((q) => q.id === id)!

export function ResultScreen() {
  const navigate = useNavigate()
  const name = useQuiz((s) => s.name)
  const department = useQuiz((s) => s.department)
  const order = useQuiz((s) => s.order)
  const optionOrder = useQuiz((s) => s.optionOrder)
  const answers = useQuiz((s) => s.answers)
  const started = useQuiz((s) => s.started)
  const submitted = useQuiz((s) => s.submitted)
  const submittedAt = useQuiz((s) => s.submittedAt)

  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!submitted) navigate(started ? '/quiz' : '/', { replace: true })
  }, [submitted, started, navigate])

  if (!submitted) return null

  const total = QUESTIONS.length
  const score = selectScore(answers)
  const pct = percent(score, total)
  const pass = pct >= PASS_PCT
  const dateStr = new Date(submittedAt || Date.now()).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  const exportPng = async () => {
    if (!cardRef.current) return
    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 2,
        backgroundColor: '#16320F',
      })
      const a = document.createElement('a')
      a.download = `JD_Assessment_${(name || 'result').replace(/\s+/g, '_')}.png`
      a.href = dataUrl
      a.click()
    } catch (err) {
      console.error('Export failed', err)
    }
  }

  return (
    <div className="min-h-screen bg-cream pb-12">
      <main className="mx-auto max-w-2xl px-4 py-7">
        {/* The exportable result card */}
        <div
          ref={cardRef}
          className="overflow-hidden rounded-2xl bg-gradient-to-br from-jd-green-deep via-jd-green-dark to-jd-green p-6 text-white shadow-[var(--shadow-lift)] sm:p-7"
        >
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-jd-yellow">
            <Trophy size={15} /> John Deere Pune · Block 1 and 2 Knowledge Check
          </div>
          <div className="mt-4 flex items-end justify-between gap-4">
            <div className="min-w-0">
              <div className="truncate text-lg font-extrabold">
                {name || 'Participant'}
              </div>
              {department && (
                <div className="truncate text-sm text-white/80">{department}</div>
              )}
              <div className="mt-1 text-xs text-white/70">{dateStr}</div>
            </div>
            <div className="text-right">
              <div className="h-display text-4xl font-extrabold sm:text-5xl">
                {score}
                <span className="text-2xl text-white/70">/{total}</span>
              </div>
              <div className="text-sm font-bold text-jd-yellow">{pct} percent</div>
            </div>
          </div>

          <div className="mt-4">
            <div className="overflow-hidden rounded-full bg-white/20">
              <ScoreBar pct={pct} />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <span
              className={
                'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-extrabold ' +
                (pass
                  ? 'bg-jd-yellow text-jd-green-deep'
                  : 'bg-white/15 text-white')
              }
            >
              {pass ? <Check size={13} /> : null}
              {pass ? 'Pass' : 'Review needed'}
            </span>
            <span className="text-sm text-white/85">{verdictLine(pct)}</span>
          </div>
        </div>

        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <button
            onClick={exportPng}
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-jd-green px-5 py-3 text-sm font-bold text-white transition hover:bg-jd-green-dark"
          >
            <ArrowUp size={16} /> Export my result (image)
          </button>
        </div>
        <p className="mt-2 text-center text-xs text-ink-soft">
          Save the image and email it to your facilitator.
        </p>

        {/* Review */}
        <div className="mt-8">
          <h2 className="h-display mb-1 text-xl font-extrabold text-jd-green-deep">
            Review your answers
          </h2>
          <p className="mb-4 text-sm text-ink-soft">
            Every question, with the correct answer and a short explanation.
          </p>
          <div className="space-y-4">
            {order.map((id, i) => {
              const q = byId(id)
              return (
                <QuestionCard
                  key={id}
                  question={q}
                  displayOrder={optionOrder[id] ?? q.options.map((_, k) => k)}
                  chosen={answers[id] ?? null}
                  mode="review"
                  index={i + 1}
                  total={total}
                />
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
