import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Compass, Sparkles } from 'lucide-react'
import { useOnboarding } from '../../context/OnboardingContext'
import Button from '../ui/Button'
import TypewriterText from '../ui/TypewriterText'

export default function WelcomeStep() {
  const { nextStep } = useOnboarding()
  const [showContent, setShowContent] = useState(false)

  const features = [
    { icon: MapPin, text: 'Discover points of interest around you' },
    { icon: Compass, text: 'Get personalized recommendations' },
    { icon: Sparkles, text: 'Learn through voice and text' },
  ]

  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
      {/* Logo / Icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', duration: 0.8 }}
        className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mb-8 shadow-2xl shadow-primary-500/30"
      >
        <Compass className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4"
      >
        Welcome to{' '}
        <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
          TravelGuide
        </span>
      </motion.h1>

      {/* Typewriter subtitle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-lg sm:text-xl text-gray-600 mb-8 max-w-md"
      >
        <TypewriterText
          text="Your personal AI tour guide that knows what you love."
          speed={25}
          onComplete={() => setShowContent(true)}
        />
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4 mb-10 w-full max-w-sm"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: showContent ? 1 : 0, x: showContent ? 0 : -20 }}
            transition={{ delay: index * 0.15 }}
            className="flex items-center gap-3 p-3 rounded-xl bg-white/60 backdrop-blur"
          >
            <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
              <feature.icon className="w-5 h-5 text-primary-600" />
            </div>
            <span className="text-gray-700 text-left">{feature.text}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
        transition={{ delay: 0.3 }}
      >
        <Button size="lg" onClick={nextStep}>
          Let's Get Started
        </Button>
      </motion.div>
    </div>
  )
}
