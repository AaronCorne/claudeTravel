import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowLeft, Check } from 'lucide-react'
import { useOnboarding } from '../../context/OnboardingContext'
import { TRAVEL_STYLES } from '../../data/interests'
import ChatBubble from '../ui/ChatBubble'
import TypewriterText from '../ui/TypewriterText'
import Button from '../ui/Button'
import Card from '../ui/Card'

export default function TravelStyleStep() {
  const { userData, setTravelStyle, nextStep, prevStep } = useOnboarding()
  const [showOptions, setShowOptions] = useState(false)
  const [selectedStyle, setSelectedStyle] = useState(userData.travelStyle)

  const handleSelect = (styleId) => {
    setSelectedStyle(styleId)
    setTravelStyle(styleId)
  }

  const handleContinue = () => {
    if (selectedStyle) {
      nextStep()
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 space-y-6">
        {/* Bot message */}
        <ChatBubble isBot>
          <TypewriterText
            text={`Nice to meet you, ${userData.name}! How do you usually travel? This helps me tailor recommendations for you.`}
            speed={20}
            onComplete={() => setShowOptions(true)}
            className="text-gray-700"
          />
        </ChatBubble>

        {/* Travel style options */}
        {showOptions && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 gap-3 sm:gap-4 mt-6"
          >
            {TRAVEL_STYLES.map((style, index) => (
              <motion.div
                key={style.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  hover
                  selected={selectedStyle === style.id}
                  onClick={() => handleSelect(style.id)}
                  className="relative p-4 sm:p-6"
                >
                  {selectedStyle === style.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center"
                    >
                      <Check size={14} className="text-white" />
                    </motion.div>
                  )}
                  <span className="text-3xl sm:text-4xl mb-2 block">
                    {style.emoji}
                  </span>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {style.label}
                  </h3>
                  <p className="text-sm text-gray-500">{style.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* User response */}
        {selectedStyle && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="pt-2"
          >
            <ChatBubble isBot={false}>
              <p className="text-white">
                I usually travel{' '}
                {TRAVEL_STYLES.find((s) => s.id === selectedStyle)?.label.toLowerCase()}
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
          <Button onClick={handleContinue} disabled={!selectedStyle}>
            Continue
            <ArrowRight size={18} />
          </Button>
        </motion.div>
      )}
    </div>
  )
}
