import { motion } from 'framer-motion'

export default function InterestChip({
  icon: Icon,
  label,
  selected = false,
  onClick,
  disabled = false,
}) {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        interest-chip flex items-center gap-2
        ${selected ? 'interest-chip-selected' : 'interest-chip-unselected'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      {Icon && <Icon size={20} />}
      <span className="font-medium">{label}</span>
      {selected && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="ml-1"
        >
          ✓
        </motion.span>
      )}
    </motion.button>
  )
}
