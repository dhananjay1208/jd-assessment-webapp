import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useQuiz } from '../store/quiz'
import { FacilitatorPanel } from './FacilitatorPanel'
import { FEATURES } from '../config'

export function Shell() {
  const facilitator = useQuiz((s) => s.facilitator)

  // Facilitator mode: ?fac=1 in the URL, or Ctrl/Cmd+Shift+F.
  useEffect(() => {
    if (window.location.href.includes('fac=1')) {
      useQuiz.getState().setFacilitator(true)
    }
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'f') {
        e.preventDefault()
        const s = useQuiz.getState()
        s.setFacilitator(!s.facilitator)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <Outlet />
      </main>
      {FEATURES.facilitator && facilitator && <FacilitatorPanel />}
    </div>
  )
}
