import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import { useQuiz } from '../store/quiz'
import { QUESTIONS } from '../content/quiz'
import { FEATURES } from '../config'
import { Tractor, ArrowRight, Check, Compass } from '../components/icons'

const LINKS = [
  { label: 'Industry 4.0, the foundations', url: 'https://jdi4app1.netlify.app/' },
  { label: 'The ten technology pillars', url: 'https://i4techpillars.netlify.app/' },
  { label: 'Integration and the data journey', url: 'https://jdintegration.netlify.app/' },
]

export function StartScreen() {
  const navigate = useNavigate()
  const start = useQuiz((s) => s.start)
  const started = useQuiz((s) => s.started)
  const submitted = useQuiz((s) => s.submitted)
  const savedName = useQuiz((s) => s.name)

  const [name, setName] = useState('')
  const [dept, setDept] = useState('')

  // If this device already finished, send it to the result.
  useEffect(() => {
    if (submitted) navigate('/result', { replace: true })
  }, [submitted, navigate])

  const begin = () => {
    if (!name.trim()) return
    start(name, dept)
    navigate('/quiz')
  }

  const joinUrl = window.location.href

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-gradient-to-br from-jd-green-deep via-jd-green-dark to-jd-green text-white">
        <div className="mx-auto flex max-w-2xl items-start justify-between gap-4 px-4 py-7">
          <div className="min-w-0">
            <div className="text-xs font-bold uppercase tracking-[0.16em] text-jd-yellow">
              John Deere Pune · Leadership programme
            </div>
            <h1 className="h-display mt-1 text-2xl font-extrabold sm:text-3xl">
              Block 1 and 2 Knowledge Check
            </h1>
            <p className="mt-1.5 max-w-lg text-sm text-white/85">
              {QUESTIONS.length} questions on what we covered across both blocks.
              It takes about 15 minutes.
            </p>
          </div>
          {FEATURES.joinQR && (
            <div className="hidden shrink-0 rounded-xl bg-white p-2 text-center sm:block">
              <QRCodeSVG value={joinUrl} size={84} fgColor="#16320F" bgColor="#ffffff" />
              <div className="mt-1 text-[10px] font-bold text-jd-green-deep">
                Scan to join
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-md px-4 py-7">
        <div className="mb-4 rounded-2xl bg-jd-green-mist p-5 ring-1 ring-jd-green/20">
          <div className="mb-1 flex items-center gap-2">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-jd-green text-white">
              <Compass size={17} />
            </span>
            <span className="text-sm font-extrabold text-jd-green-deep">
              Revise the concepts first
            </span>
          </div>
          <p className="mb-3 text-sm text-ink-soft">
            Before the {QUESTIONS.length} questions, walk back through the training
            apps from the sessions. Each opens in a new tab.
          </p>
          <div className="space-y-2">
            {LINKS.map((l) => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl bg-white px-3.5 py-2.5 ring-1 ring-line transition hover:ring-jd-green"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-bold text-jd-green-dark">
                    {l.label}
                  </span>
                  <ArrowRight size={15} className="shrink-0 text-jd-green" />
                </div>
                <div className="mt-0.5 truncate text-[11px] text-ink-soft">
                  {l.url}
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-line">
          <div className="mb-5 flex items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-jd-green text-white">
              <Tractor size={22} />
            </span>
            <div className="text-sm font-semibold text-ink-soft">
              Enter your details, then begin. You have one attempt.
            </div>
          </div>

          <label className="mb-1 block text-sm font-bold text-ink">Your name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && begin()}
            placeholder="Full name"
            className="mb-3 w-full rounded-xl border-2 border-line px-4 py-3 text-base outline-none transition focus:border-jd-green"
          />
          <label className="mb-1 block text-sm font-bold text-ink">
            Department or function
          </label>
          <input
            value={dept}
            onChange={(e) => setDept(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && begin()}
            placeholder="e.g. Quality, Machining, Supply Chain"
            className="mb-5 w-full rounded-xl border-2 border-line px-4 py-3 text-base outline-none transition focus:border-jd-green"
          />

          <ul className="mb-5 space-y-1.5 text-sm text-ink-soft">
            {[
              'One question at a time. You can go back and change answers.',
              'No answers are shown until you submit.',
              'Your score and a full review appear at the end.',
            ].map((t) => (
              <li key={t} className="flex gap-2">
                <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded bg-jd-green-mist text-jd-green">
                  <Check size={11} />
                </span>
                {t}
              </li>
            ))}
          </ul>

          <button
            onClick={begin}
            disabled={!name.trim()}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-jd-green px-5 py-3 text-sm font-bold text-white transition hover:bg-jd-green-dark disabled:cursor-not-allowed disabled:opacity-40"
          >
            {started && savedName ? 'Restart the assessment' : 'Start the assessment'}
            <ArrowRight size={16} />
          </button>

          {started && !submitted && (
            <button
              onClick={() => navigate('/quiz')}
              className="mt-2 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-jd-green-dark ring-1 ring-line transition hover:bg-jd-green-mist"
            >
              Resume where you left off
            </button>
          )}

          <p className="mt-3 text-center text-xs text-ink-soft">
            Your answers save on this device only. No account, no password.
          </p>
        </div>
      </main>
    </div>
  )
}
