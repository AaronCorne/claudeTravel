import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check, Sparkles, MapPin, ArrowLeft } from 'lucide-react'
import { useOnboarding } from '../../context/OnboardingContext'
import { INTERESTS, TRAVEL_STYLES } from '../../data/interests'
import ChatBubble from '../ui/ChatBubble'
import TypewriterText from '../ui/TypewriterText'
import Button from '../ui/Button'
import Card from '../ui/Card'

export default function CompletionStep() {
  const { userData, prevStep, completeOnboarding } = useOnboarding()
  const [showSummary, setShowSummary] = useState(false)
  const [isCompleting, setIsCompleting] = useState(false)

  const travelStyle = TRAVEL_STYLES.find((s) => s.id === userData.travelStyle)
  const interests = userData.interests.map((id) =>
    INTERESTS.find((i) => i.id === id)
  ).filter(Boolean)

  const handleComplete = async () => {
    setIsCompleting(true)
    // Simulate a brief loading state
    await new Promise((resolve) => setTimeout(resolve, 1000))
    completeOnboarding()
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 space-y-6">
        {/* Success animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="flex justify-center mb-4"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center shadow-lg shadow-green-500/30">
            <Check className="w-10 h-10 text-white" strokeWidth={3} />
          </div>
        </motion.div>

        {/* Bot message */}
        <ChatBubble isBot>
          <TypewriterText
            text={`Perfect, ${userData.name}! I've got everything I need to be your personalized guide. Here's a summary of your preferences:`}
            speed={20}
            onComplete={() => setShowSummary(true)}
            className="text-gray-700"
          />
        </ChatBubble>

        {/* Summary card */}
        {showSummary && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="space-y-6">
              {/* Name & Travel Style */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                  <p className="text-sm text-gray-500">Traveler</p>
                  <p className="font-semibold text-gray-900">{userData.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Style</p>
                  <p className="font-semibold text-gray-900">
                    {travelStyle?.emoji} {travelStyle?.label}
                  </p>
                </div>
              </div>

              {/* Interests */}
              <div>
                <p className="text-sm text-gray-500 mb-3">Your Interests</p>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest, index) => {
                    const Icon = interest.icon
                    return (
                      <motion.span
                        key={interest.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full text-sm font-medium"
                      >
                        <Icon size={14} />
                        {interest.label}
                      </motion.span>
                    )
                  })}
                </div>
              </div>

              {/* Preferences summary */}
              {Object.keys(userData.interestPreferences).length > 0 && (
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500 mb-2">Preferences</p>
                  <ul className="space-y-1">
                    {Object.entries(userData.interestPreferences).map(
                      ([interestId, prefIds]) => {
                        const interest = INTERESTS.find((i) => i.id === interestId)
                        const prefsArray = Array.isArray(prefIds) ? prefIds : [prefIds]
                        return (
                          <li
                            key={interestId}
                            className="text-sm text-gray-600 flex items-start gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-400 mt-1.5 flex-shrink-0" />
                            <span>
                              <span className="font-medium">{interest?.label}:</span>{' '}
                              <span className="capitalize">
                                {prefsArray.map((p) => p.replace(/-/g, ' ')).join(', ')}
                              </span>
                            </span>
                          </li>
                        )
                      }
                    )}
                  </ul>
                </div>
              )}
            </Card>

            {/* Exciting message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500/10 to-accent-500/10 rounded-full">
                <Sparkles className="w-5 h-5 text-accent-500" />
                <span className="text-sm font-medium text-gray-700">
                  Your personalized guide is ready!
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      {showSummary && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-between items-center pt-6 mt-auto"
        >
          <Button variant="ghost" onClick={prevStep} disabled={isCompleting}>
            <ArrowLeft size={18} />
            Back
          </Button>
          <Button
            size="lg"
            onClick={handleComplete}
            loading={isCompleting}
            className="bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600"
          >
            <MapPin size={18} />
            Start Exploring
          </Button>
        </motion.div>
      )}
    </div>
  )
}
