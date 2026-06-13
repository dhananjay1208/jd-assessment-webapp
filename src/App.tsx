import { Routes, Route } from 'react-router-dom'
import { Shell } from './components/Shell'
import { StartScreen } from './screens/StartScreen'
import { QuizScreen } from './screens/QuizScreen'
import { ResultScreen } from './screens/ResultScreen'

export default function App() {
  return (
    <Routes>
      <Route element={<Shell />}>
        <Route path="/" element={<StartScreen />} />
        <Route path="/quiz" element={<QuizScreen />} />
        <Route path="/result" element={<ResultScreen />} />
        <Route path="*" element={<StartScreen />} />
      </Route>
    </Routes>
  )
}
