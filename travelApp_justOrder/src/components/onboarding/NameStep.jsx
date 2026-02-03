import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { useOnboarding } from '../../context/OnboardingContext'
import ChatBubble from '../ui/ChatBubble'
import TypewriterText from '../ui/TypewriterText'
import Button from '../ui/Button'

export default function NameStep() {
  const { userData, setName, nextStep, prevStep } = useOnboarding()
  const [localName, setLocalName] = useState(userData.name)
  const [showInput, setShowInput] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus()
    }
  }, [showInput])

  const handleSubmit = (e) => {
    e?.preventDefault()
    const trimmedName = localName.trim()

    if (!trimmedName) {
      setError('Please enter your name')
      return
    }

    if (trimmedName.length < 2) {
      setError('Name must be at least 2 characters')
      return
    }

    setError('')
    setName(trimmedName)
    nextStep()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 space-y-6">
        {/* Bot message */}
        <ChatBubble isBot>
          <TypewriterText
            text="Hey there! I'm your personal travel guide. Before we begin, what should I call you?"
            speed={20}
            onComplete={() => setShowInput(true)}
            className="text-gray-700"
          />
        </ChatBubble>

        {/* Input area */}
        {showInput && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={localName}
                  onChange={(e) => {
                    setLocalName(e.target.value)
                    setError('')
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter your name..."
                  className={`
                    w-full px-5 py-4 text-lg rounded-2xl
                    bg-white border-2 transition-all duration-200
                    focus:outline-none focus:ring-0
                    ${error
                      ? 'border-red-400 focus:border-red-500'
                      : 'border-gray-200 focus:border-primary-500'
                    }
                  `}
                  maxLength={30}
                />
                {localName && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400"
                  >
                    {localName.length}/30
                  </motion.span>
                )}
              </div>

              {/* Error message */}
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm pl-2"
                >
                  {error}
                </motion.p>
              )}

              {/* User response preview */}
              {localName.trim() && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="pt-2"
                >
                  <ChatBubble isBot={false} animate={false}>
                    <p className="text-white">My name is {localName.trim()}</p>
                  </ChatBubble>
                </motion.div>
              )}
            </form>
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      {showInput && (
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
          <Button
            onClick={handleSubmit}
            disabled={!localName.trim()}
          >
            Continue
            <ArrowRight size={18} />
          </Button>
        </motion.div>
      )}
    </div>
  )
}
