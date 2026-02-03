import { motion } from 'framer-motion'

export default function Card({
  children,
  className = '',
  hover = false,
  selected = false,
  onClick,
  ...props
}) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -2 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      onClick={onClick}
      className={`
        glass-card rounded-2xl p-6
        ${onClick ? 'cursor-pointer' : ''}
        ${selected ? 'ring-2 ring-primary-500 bg-primary-50/80' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  )
}
