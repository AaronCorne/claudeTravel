import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { useOnboarding } from '../../context/OnboardingContext'
import { INTERESTS } from '../../data/interests'
import ChatBubble from '../ui/ChatBubble'
import TypewriterText from '../ui/TypewriterText'
import Button from '../ui/Button'
import InterestChip from '../ui/InterestChip'

export default function InterestsStep() {
  const { userData, toggleInterest, nextStep, prevStep } = useOnboarding()
  const [showOptions, setShowOptions] = useState(false)

  const selectedCount = userData.interests.length

  const handleContinue = () => {
    if (selectedCount > 0) {
      nextStep()
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 space-y-6">
        {/* Bot message */}
        <ChatBubble isBot>
          <TypewriterText
            text={`Great choice! Now, what gets you excited when exploring new places? Select all that interest you.`}
            speed={20}
            onComplete={() => setShowOptions(true)}
            className="text-gray-700"
          />
        </ChatBubble>

        {/* Interest chips */}
        {showOptions && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-6"
          >
            <div className="flex flex-wrap gap-3">
              {INTERESTS.map((interest, index) => (
                <motion.div
                  key={interest.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <InterestChip
                    icon={interest.icon}
                    label={interest.label}
                    selected={userData.interests.includes(interest.id)}
                    onClick={() => toggleInterest(interest.id)}
                  />
                </motion.div>
              ))}
            </div>

            {/* Selection counter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 flex items-center justify-between"
            >
              <p className="text-sm text-gray-500">
                {selectedCount === 0 ? (
                  'Select at least one interest'
                ) : (
                  <span>
                    <span className="font-semibold text-primary-600">
                      {selectedCount}
                    </span>{' '}
                    {selectedCount === 1 ? 'interest' : 'interests'} selected
                  </span>
                )}
              </p>
              {selectedCount > 0 && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-sm text-green-600 font-medium"
                >
                  ✓ Looking good!
                </motion.span>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* User response */}
        {selectedCount > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="pt-2"
          >
            <ChatBubble isBot={false}>
              <p className="text-white">
                I'm interested in{' '}
                {userData.interests
                  .map(
                    (id) => INTERESTS.find((i) => i.id === id)?.label.toLowerCase()
                  )
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
          <Button variant="ghost" onClick={prevStep}>
            <ArrowLeft size={18} />
            Back
          </Button>
          <Button onClick={handleContinue} disabled={selectedCount === 0}>
            Continue
            <ArrowRight size={18} />
          </Button>
        </motion.div>
      )}
    </div>
  )
}
