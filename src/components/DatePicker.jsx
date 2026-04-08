import PropTypes from 'prop-types'
import { toInputDate, formatDate, isOverdue } from '../utils/dateUtils'

const DatePicker = ({ value, onChange, showClear = true }) => {
  const inputValue = toInputDate(value)
  const overdue = value && isOverdue(value)

  const handleChange = (e) => {
    const dateStr = e.target.value
    if (dateStr) {
      onChange(new Date(dateStr).getTime())
    } else {
      onChange(null)
    }
  }

  const handleClear = () => {
    onChange(null)
  }

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <input
          type="date"
          value={inputValue}
          onChange={handleChange}
          className={`
            input w-auto font-mono text-sm
            [color-scheme:light]
            ${overdue ? '!border-red-300 !bg-red-50/50 !text-red-700' : ''}
          `}
        />
      </div>
      
      {value && (
        <span className={`text-sm font-mono ${overdue ? 'text-red-600 font-medium' : 'text-[var(--color-text-secondary)]'}`}>
          {overdue ? 'Overdue' : formatDate(value)}
        </span>
      )}
      
      {showClear && value && (
        <button
          type="button"
          onClick={handleClear}
          className="p-1.5 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] hover:bg-[var(--color-muted)] rounded-lg transition-all"
          title="Clear date"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}

DatePicker.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  onChange: PropTypes.func.isRequired,
  showClear: PropTypes.bool,
}

export default DatePicker
