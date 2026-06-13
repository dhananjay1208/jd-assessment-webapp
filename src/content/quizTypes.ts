// Data model for the 25-question Block 1 and 2 assessment.

export type Block = 1 | 2
export type Difficulty = 'intermediate' | 'difficult'

export interface Option {
  /** Option text. */
  text: string
  /** Exactly one option per question is correct (a dev check enforces this). */
  correct: boolean
  /** Short note shown in the end-of-quiz review. */
  explanation: string
}

export interface Question {
  /** Stable id, used as the key in the store. Never reordered. */
  id: string
  block: Block
  /** Short topic label, shown only in the facilitator blueprint. */
  topic: string
  difficulty: Difficulty
  /** The question stem. */
  prompt: string
  /** 3 to 4 options. */
  options: Option[]
  /** Citation label from sources.ts, for proof-point questions. */
  source?: string
}

/** Points are one per question, so the score reads as X out of 25. */
export const POINTS_PER_QUESTION = 1

/** Pass mark for the result band. */
export const PASS_PCT = 60
