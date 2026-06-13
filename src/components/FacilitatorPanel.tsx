import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { QUESTIONS } from '../content/quiz'
import { useQuiz } from '../store/quiz'
import { Presenter, Close, Refresh } from './icons'

/** Bottom-docked facilitator panel: blueprint, answer key and a reset. */
export function FacilitatorPanel() {
  const navigate = useNavigate()
  const setFacilitator = useQuiz((s) => s.setFacilitator)
  const reset = useQuiz((s) => s.reset)
  const [open, setOpen] = useState(false)

  const block1 = QUESTIONS.filter((q) => q.block === 1).length
  const block2 = QUESTIONS.filter((q) => q.block === 2).length
  const difficult = QUESTIONS.filter((q) => q.difficulty === 'difficult').length

  const letterOf = (qi: number) => {
    const q = QUESTIONS[qi]
    const idx = q.options.findIndex((o) => o.correct)
    return String.fromCharCode(65 + idx)
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-4 right-3 z-40 inline-flex items-center gap-2 rounded-full bg-jd-green-deep px-4 py-2.5 text-sm font-bold text-jd-yellow shadow-[var(--shadow-lift)] ring-2 ring-jd-yellow/60"
      >
        <Presenter size={18} />
        Facilitator
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-x-0 bottom-0 z-50 max-h-[78vh] overflow-y-auto rounded-t-2xl bg-jd-green-deep text-white shadow-[var(--shadow-lift)]"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'tween', duration: 0.26, ease: 'easeOut' }}
          >
            <div className="sticky top-0 flex items-center justify-between bg-jd-green-deep px-4 py-3">
              <div className="flex items-center gap-2">
                <Presenter size={18} className="text-jd-yellow" />
                <span className="text-sm font-extrabold">Facilitator</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close facilitator panel"
                className="grid h-8 w-8 place-items-center rounded-lg hover:bg-white/10"
              >
                <Close size={18} />
              </button>
            </div>

            <div className="space-y-4 px-4 pb-6">
              <div className="flex flex-wrap gap-2 text-xs font-bold text-jd-green-deep">
                <span className="rounded-lg bg-jd-yellow px-3 py-1.5">
                  {QUESTIONS.length} questions
                </span>
                <span className="rounded-lg bg-white/90 px-3 py-1.5">
                  Block 1: {block1}
                </span>
                <span className="rounded-lg bg-white/90 px-3 py-1.5">
                  Block 2: {block2}
                </span>
                <span className="rounded-lg bg-white/90 px-3 py-1.5">
                  Difficult: {difficult}
                </span>
                <span className="rounded-lg bg-white/90 px-3 py-1.5">
                  Pass: 60 percent
                </span>
              </div>

              <div>
                <div className="mb-1.5 text-xs font-bold uppercase tracking-[0.14em] text-jd-yellow">
                  Answer key (authoring order)
                </div>
                <ul className="grid gap-1 sm:grid-cols-2">
                  {QUESTIONS.map((q, i) => (
                    <li
                      key={q.id}
                      className="flex items-baseline gap-2 text-[13px] text-white/90"
                    >
                      <span className="font-extrabold text-jd-yellow">
                        {letterOf(i)}
                      </span>
                      <span className="text-white/70">
                        [{q.block}
                        {q.difficulty === 'difficult' ? ', hard' : ''}]
                      </span>
                      <span className="min-w-0 truncate">{q.topic}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-[11px] text-white/60">
                  Letters are for the unshuffled order above. Each device shuffles
                  the questions and options, so a participant's letters will differ.
                </p>
              </div>

              <button
                onClick={() => {
                  reset()
                  setOpen(false)
                  navigate('/')
                }}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 py-2.5 text-sm font-bold text-white transition hover:bg-white/20"
              >
                <Refresh size={15} /> Reset this device (clears name and answers)
              </button>

              <button
                onClick={() => {
                  setFacilitator(false)
                  setOpen(false)
                }}
                className="w-full rounded-xl py-2 text-xs font-bold text-white/70 transition hover:text-white"
              >
                Turn Facilitator Mode off
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
