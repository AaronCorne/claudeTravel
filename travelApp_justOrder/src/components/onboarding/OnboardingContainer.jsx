import { AnimatePresence, motion } from 'framer-motion'
import { useOnboarding } from '../../context/OnboardingContext'
import ProgressBar from '../ui/ProgressBar'
import WelcomeStep from './WelcomeStep'
import NameStep from './NameStep'
import TravelStyleStep from './TravelStyleStep'
import InterestsStep from './InterestsStep'
import InterestDeepDive from './InterestDeepDive'
import CompletionStep from './CompletionStep'

const STEPS = [
  WelcomeStep,
  NameStep,
  TravelStyleStep,
  InterestsStep,
  InterestDeepDive,
  CompletionStep,
]

export default function OnboardingContainer() {
  const { currentStep, totalSteps } = useOnboarding()
  const CurrentStepComponent = STEPS[currentStep]

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200/50 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-200/50 rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-4 py-6 sm:py-12">
        {/* Progress bar - hidden on welcome step */}
        {currentStep > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          </motion.div>
        )}

        {/* Step content */}
        <div className="flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col"
            >
              <CurrentStepComponent />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
