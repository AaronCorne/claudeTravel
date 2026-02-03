import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowLeft, Check } from 'lucide-react'
import { useOnboarding } from '../../context/OnboardingContext'
import { INTERESTS, DEEP_DIVE_QUESTIONS } from '../../data/interests'
import ChatBubble from '../ui/ChatBubble'
import TypewriterText from '../ui/TypewriterText'
import Button from '../ui/Button'

export default function InterestDeepDive() {
  const { userData, toggleInterestPreference, nextStep, prevStep } = useOnboarding()
  const [currentInterestIndex, setCurrentInterestIndex] = useState(0)
  const [showOptions, setShowOptions] = useState(false)

  const selectedInterests = useMemo(() => {
    return userData.interests
      .map((id) => INTERESTS.find((i) => i.id === id))
      .filter(Boolean)
  }, [userData.interests])

  const currentInterest = selectedInterests[currentInterestIndex]
  const currentQuestion = currentInterest
    ? DEEP_DIVE_QUESTIONS[currentInterest.id]?.[0]
    : null

  const currentPreferences = currentInterest
    ? userData.interestPreferences[currentInterest.id] || []
    : []

  const isLastInterest = currentInterestIndex === selectedInterests.length - 1
  const progress = ((currentInterestIndex + 1) / selectedInterests.length) * 100

  const handleSelectOption = (optionId) => {
    if (currentInterest) {
      toggleInterestPreference(currentInterest.id, optionId)
    }
  }

  const isOptionSelected = (optionId) => {
    return currentPreferences.includes(optionId)
  }

  const handleContinue = () => {
    if (isLastInterest) {
      nextStep()
    } else {
      setShowOptions(false)
      setCurrentInterestIndex((prev) => prev + 1)
      // Small delay to allow animation reset
      setTimeout(() => setShowOptions(false), 50)
    }
  }

  const handleBack = () => {
    if (currentInterestIndex === 0) {
      prevStep()
    } else {
      setShowOptions(false)
      setCurrentInterestIndex((prev) => prev - 1)
    }
  }

  if (!currentInterest || !currentQuestion) {
    // Skip deep dive if no questions available
    nextStep()
    return null
  }

  const CurrentIcon = currentInterest.icon

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 space-y-6">
        {/* Mini progress for deep dive */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-accent-500 rounded-full"
            />
          </div>
          <span className="text-sm text-gray-500">
            {currentInterestIndex + 1}/{selectedInterests.length}
          </span>
        </div>

        {/* Interest indicator */}
        <motion.div
          key={currentInterest.id}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-gray-500"
        >
          <CurrentIcon size={16} />
          <span>About your interest in {currentInterest.label}</span>
        </motion.div>

        {/* Bot message */}
        <ChatBubble isBot key={`bubble-${currentInterest.id}`}>
          <TypewriterText
            text={currentQuestion.question}
            speed={20}
            onComplete={() => setShowOptions(true)}
            className="text-gray-700"
          />
        </ChatBubble>

        {/* Options */}
        {showOptions && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-4"
          >
            <p className="text-sm text-gray-500 mb-3">
              Select all that apply
            </p>
            <div className="grid grid-cols-2 gap-3">
            {currentQuestion.options.map((option, index) => (
              <motion.button
                key={option.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                onClick={() => handleSelectOption(option.id)}
                className={`
                  relative p-4 rounded-xl border-2 transition-all duration-200
                  text-left hover:scale-[1.02] active:scale-[0.98]
                  ${isOptionSelected(option.id)
                    ? 'border-primary-500 bg-primary-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-primary-300'
                  }
                `}
              >
                {isOptionSelected(option.id) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center"
                  >
                    <Check size={12} className="text-white" />
                  </motion.div>
                )}
                <span className="text-2xl mb-2 block">{option.emoji}</span>
                <span className="font-medium text-gray-900">{option.label}</span>
              </motion.button>
            ))}
            </div>
          </motion.div>
        )}

        {/* User response */}
        {currentPreferences.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="pt-2"
          >
            <ChatBubble isBot={false}>
              <p className="text-white">
                {currentPreferences
                  .map((prefId) => currentQuestion.options.find((o) => o.id === prefId)?.label)
                  .filter(Boolean)
                  .join(', ')}
              </p>
            </ChatBubble>
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      {showOptions && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-between items-center pt-6 mt-auto"
        >
          <Button variant="ghost" onClick={handleBack}>
            <ArrowLeft size={18} />
            Back
          </Button>
          <Button onClick={handleContinue} disabled={currentPreferences.length === 0}>
            {isLastInterest ? 'Finish' : 'Next'}
            <ArrowRight size={18} />
          </Button>
        </motion.div>
      )}
    </div>
  )
}
