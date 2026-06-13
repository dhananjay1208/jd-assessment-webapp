import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { QUESTIONS } from '../content/quiz'

/**
 * Per-device assessment state. Offline-first: everything persists to
 * localStorage on the participant's own device. No backend, no accounts.
 * The question order and the per-question option order are generated once at
 * start() and persisted, so a reload or back-navigation never reshuffles.
 */
interface QuizState {
  name: string
  department: string

  /** question ids in presentation order */
  order: string[]
  /** per question id, a permutation of its option indices for display */
  optionOrder: Record<string, number[]>
  /** per question id, the chosen ORIGINAL option index */
  answers: Record<string, number>

  started: boolean
  submitted: boolean
  startedAt: number
  submittedAt: number

  facilitator: boolean

  start: (name: string, department: string) => void
  choose: (qid: string, originalIndex: number) => void
  submit: () => void
  reset: () => void
  setFacilitator: (v: boolean) => void
}

const initial = {
  name: '',
  department: '',
  order: [] as string[],
  optionOrder: {} as Record<string, number[]>,
  answers: {} as Record<string, number>,
  started: false,
  submitted: false,
  startedAt: 0,
  submittedAt: 0,
  facilitator: false,
}

/** Fisher-Yates shuffle. Uses Math.random, which is fine at app runtime. */
function shuffle<T>(input: T[]): T[] {
  const a = input.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export const useQuiz = create<QuizState>()(
  persist(
    (set) => ({
      ...initial,

      start: (name, department) =>
        set(() => {
          const order = shuffle(QUESTIONS.map((q) => q.id))
          const optionOrder: Record<string, number[]> = {}
          for (const q of QUESTIONS) {
            optionOrder[q.id] = shuffle(q.options.map((_, i) => i))
          }
          return {
            name: name.trim(),
            department: department.trim(),
            order,
            optionOrder,
            answers: {},
            started: true,
            submitted: false,
            startedAt: Date.now(),
            submittedAt: 0,
          }
        }),

      choose: (qid, originalIndex) =>
        set((s) =>
          s.submitted
            ? s
            : { answers: { ...s.answers, [qid]: originalIndex } },
        ),

      submit: () => set({ submitted: true, submittedAt: Date.now() }),

      reset: () => set({ ...initial, facilitator: false }),

      setFacilitator: (v) => set({ facilitator: v }),
    }),
    {
      name: 'jd-assessment-v1',
      partialize: (s) => ({
        name: s.name,
        department: s.department,
        order: s.order,
        optionOrder: s.optionOrder,
        answers: s.answers,
        started: s.started,
        submitted: s.submitted,
        startedAt: s.startedAt,
        submittedAt: s.submittedAt,
        facilitator: s.facilitator,
      }),
    },
  ),
)

/** Number of correct answers, from the original option index in `answers`. */
export function selectScore(answers: Record<string, number>): number {
  let score = 0
  for (const q of QUESTIONS) {
    const chosen = answers[q.id]
    if (chosen != null && q.options[chosen]?.correct) score += 1
  }
  return score
}

/** How many questions have an answer recorded. */
export function selectAnsweredCount(answers: Record<string, number>): number {
  return QUESTIONS.filter((q) => answers[q.id] != null).length
}
