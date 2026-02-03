import { motion } from 'framer-motion'
import { Bot, User } from 'lucide-react'

export default function ChatBubble({
  message,
  isBot = true,
  children,
  animate = true,
}) {
  const Wrapper = animate ? motion.div : 'div'
  const animationProps = animate
    ? {
        initial: { opacity: 0, y: 20, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: { duration: 0.4, ease: 'easeOut' },
      }
    : {}

  return (
    <Wrapper
      {...animationProps}
      className={`flex gap-3 ${isBot ? '' : 'flex-row-reverse'}`}
    >
      {/* Avatar */}
      <div
        className={`
          flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
          ${isBot
            ? 'bg-gradient-to-br from-primary-500 to-accent-500 text-white'
            : 'bg-gray-200 text-gray-600'
          }
        `}
      >
        {isBot ? <Bot size={20} /> : <User size={20} />}
      </div>

      {/* Message bubble */}
      <div
        className={`
          max-w-[80%] px-4 py-3 rounded-2xl
          ${isBot
            ? 'bg-white shadow-md rounded-tl-sm'
            : 'bg-primary-500 text-white rounded-tr-sm'
          }
        `}
      >
        {children || (
          <p className={`text-base ${isBot ? 'text-gray-700' : 'text-white'}`}>
            {message}
          </p>
        )}
      </div>
    </Wrapper>
  )
}
