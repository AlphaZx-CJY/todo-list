import PropTypes from 'prop-types'
import { PRIORITY, PRIORITY_LABELS } from '../utils/constants'

const PrioritySelect = ({ value, onChange, size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1.5',
    md: 'text-sm px-3 py-2',
    lg: 'text-base px-4 py-2.5',
  }

  const getPriorityStyle = (priority, isSelected) => {
    if (!isSelected) {
      return 'bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-text-tertiary)]'
    }
    
    switch (priority) {
      case PRIORITY.HIGH:
        return 'bg-red-50 border-red-200 text-red-700'
      case PRIORITY.MEDIUM:
        return 'bg-amber-50 border-amber-200 text-amber-700'
      case PRIORITY.LOW:
        return 'bg-emerald-50 border-emerald-200 text-emerald-700'
      default:
        return 'bg-[var(--color-muted)] border-[var(--color-border)]'
    }
  }

  const getDotColor = (priority) => {
    switch (priority) {
      case PRIORITY.HIGH:
        return 'bg-red-500'
      case PRIORITY.MEDIUM:
        return 'bg-amber-500'
      case PRIORITY.LOW:
        return 'bg-emerald-500'
      default:
        return 'bg-[var(--color-text-tertiary)]'
    }
  }

  return (
    <div className="flex items-center gap-2">
      {Object.values(PRIORITY).map((priority) => (
        <button
          key={priority}
          type="button"
          onClick={() => onChange(priority)}
          className={`
            inline-flex items-center gap-2 rounded-lg border font-medium transition-all duration-200
            ${sizeClasses[size]}
            ${getPriorityStyle(priority, value === priority)}
          `}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${getDotColor(priority)}`} />
          <span className="capitalize">{PRIORITY_LABELS[priority]}</span>
        </button>
      ))}
    </div>
  )
}

PrioritySelect.propTypes = {
  value: PropTypes.oneOf(Object.values(PRIORITY)).isRequired,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
}

export default PrioritySelect
