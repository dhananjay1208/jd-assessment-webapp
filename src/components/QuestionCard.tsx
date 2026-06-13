import type { Question } from '../content/quizTypes'
import { cn } from '../lib/cn'
import { Check, Close } from './icons'

/**
 * Renders one question and its options.
 *  - mode 'interactive': options are selectable, nothing is revealed.
 *  - mode 'review': read-only, the correct option and any wrong pick are shown.
 * Options are displayed in `displayOrder` (a permutation of original indices),
 * and answers are tracked by ORIGINAL option index so scoring is order-proof.
 */
export function QuestionCard({
  question,
  displayOrder,
  chosen,
  mode,
  index,
  total,
  onChoose,
}: {
  question: Question
  displayOrder: number[]
  chosen: number | null
  mode: 'interactive' | 'review'
  index: number
  total: number
  onChoose?: (originalIndex: number) => void
}) {
  const review = mode === 'review'
  const correct = question.options.find((o) => o.correct) ?? null
  const wrong = chosen != null && !question.options[chosen]?.correct
  const unanswered = chosen == null

  return (
    <div className="rounded-2xl bg-white p-5 ring-1 ring-line shadow-[var(--shadow-card)] sm:p-6">
      <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-jd-green">
        <span>
          Question {index} of {total}
        </span>
        {review && (
          <span
            className={cn(
              'ml-auto rounded-full px-2.5 py-0.5 text-[11px] font-bold normal-case tracking-normal',
              unanswered
                ? 'bg-line text-ink-soft'
                : wrong
                  ? 'bg-red-100 text-red-700'
                  : 'bg-jd-green-mist text-jd-green-dark',
            )}
          >
            {unanswered ? 'Not answered' : wrong ? 'Not quite' : 'Correct'}
          </span>
        )}
      </div>

      <p className="text-[17px] font-semibold leading-snug text-ink">
        {question.prompt}
      </p>

      <div className="mt-4 grid gap-2">
        {displayOrder.map((oi, p) => {
          const opt = question.options[oi]
          const picked = chosen === oi
          const isCorrect = opt.correct
          const showRight = review && isCorrect
          const showWrong = review && picked && !isCorrect
          return (
            <button
              key={oi}
              onClick={() => !review && onChoose?.(oi)}
              disabled={review}
              className={cn(
                'flex items-center gap-2.5 rounded-xl border-2 px-3.5 py-3 text-left text-sm font-semibold transition',
                !review &&
                  !picked &&
                  'border-line bg-white hover:border-jd-green hover:bg-jd-green-mist',
                !review &&
                  picked &&
                  'border-jd-green bg-jd-green-mist text-jd-green-deep',
                showRight && 'border-jd-green bg-jd-green-mist text-jd-green-deep',
                showWrong && 'border-red-400 bg-red-50 text-red-700',
                review && !showRight && !showWrong && 'border-line bg-white',
              )}
            >
              <span
                className={cn(
                  'grid h-6 w-6 shrink-0 place-items-center rounded-md text-xs font-extrabold',
                  showRight
                    ? 'bg-jd-green text-white'
                    : showWrong
                      ? 'bg-red-500 text-white'
                      : picked && !review
                        ? 'bg-jd-green text-white'
                        : 'bg-jd-green-mist text-jd-green-dark',
                )}
              >
                {showRight ? (
                  <Check size={14} />
                ) : showWrong ? (
                  <Close size={14} />
                ) : (
                  String.fromCharCode(65 + p)
                )}
              </span>
              {opt.text}
            </button>
          )
        })}
      </div>

      {review && correct && (
        <div className="mt-4 rounded-xl bg-jd-green-mist p-3.5 ring-1 ring-jd-green/30">
          <div className="mb-0.5 flex items-center gap-1.5 text-xs font-extrabold text-jd-green-deep">
            <span className="grid h-5 w-5 place-items-center rounded bg-jd-green text-white">
              <Check size={12} />
            </span>
            Correct answer: {correct.text}
          </div>
          <div className="text-sm leading-relaxed text-ink-soft">
            {correct.explanation}
          </div>
          {wrong && chosen != null && (
            <div className="mt-2 border-t border-jd-green/20 pt-2 text-sm leading-relaxed text-ink-soft">
              You chose {question.options[chosen].text}.{' '}
              {question.options[chosen].explanation}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
