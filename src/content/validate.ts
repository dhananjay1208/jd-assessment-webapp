import { QUESTIONS } from './quiz'
import { SOURCES } from './sources'

/**
 * Dev-only content invariants. Called from main.tsx behind import.meta.env.DEV,
 * so it never ships. Catches the authoring slips the type system cannot.
 */
export function validateQuiz(): void {
  const sourceLabels = new Set(SOURCES.map((s) => s.label))
  const ids = new Set<string>()
  const problems: string[] = []

  // No em or en dashes anywhere (firm house convention).
  const dashes = /[‒–—―−]|\s--\s/
  const checkText = (where: string, text: string) => {
    if (dashes.test(text)) problems.push(`${where}: contains an em/en dash`)
  }

  for (const q of QUESTIONS) {
    if (ids.has(q.id)) problems.push(`${q.id}: duplicate id`)
    ids.add(q.id)

    const correct = q.options.filter((o) => o.correct).length
    if (correct !== 1)
      problems.push(`${q.id}: has ${correct} correct options, expected 1`)
    if (q.options.length < 3 || q.options.length > 4)
      problems.push(`${q.id}: has ${q.options.length} options, expected 3 or 4`)

    checkText(`${q.id} prompt`, q.prompt)
    for (const o of q.options) {
      if (!o.explanation.trim())
        problems.push(`${q.id}: an option is missing its explanation`)
      checkText(`${q.id} option`, o.text)
      checkText(`${q.id} explanation`, o.explanation)
    }

    if (q.source && !sourceLabels.has(q.source))
      problems.push(`${q.id}: source not in sources.ts -> "${q.source}"`)
  }

  const block1 = QUESTIONS.filter((q) => q.block === 1).length
  const block2 = QUESTIONS.filter((q) => q.block === 2).length
  const difficult = QUESTIONS.filter((q) => q.difficulty === 'difficult').length

  if (problems.length) {
    console.warn(
      `[assessment] ${problems.length} content issue(s):\n${problems.join('\n')}`,
    )
  } else {
    console.info(
      `[assessment] ${QUESTIONS.length} questions validated, no issues. ` +
        `Block 1: ${block1}, Block 2: ${block2}, difficult: ${difficult}.`,
    )
  }
}
