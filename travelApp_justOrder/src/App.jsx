import { useState, useEffect } from 'react'
import { OnboardingProvider, useOnboarding } from './context/OnboardingContext'
import OnboardingContainer from './components/onboarding/OnboardingContainer'
import MainApp from './components/MainApp'

function AppContent() {
  const { isComplete } = useOnboarding()
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false)

  useEffect(() => {
    // Check if user has already completed onboarding
    const completed = localStorage.getItem('travelGuide_onboardingComplete')
    if (completed === 'true') {
      setHasCompletedOnboarding(true)
    }
  }, [])

  useEffect(() => {
    if (isComplete) {
      setHasCompletedOnboarding(true)
    }
  }, [isComplete])

  if (hasCompletedOnboarding) {
    return <MainApp onResetOnboarding={() => setHasCompletedOnboarding(false)} />
  }

  return <OnboardingContainer />
}

export default function App() {
  return (
    <OnboardingProvider>
      <AppContent />
    </OnboardingProvider>
  )
}
