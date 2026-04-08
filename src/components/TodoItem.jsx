import PropTypes from 'prop-types'
import { PRIORITY_LABELS } from '../utils/constants'
import { formatDate, isOverdue } from '../utils/dateUtils'

const TodoItem = ({ timestamp, content, isFinish, priority, dueDate, tags, onChecked, onDelete, onEdit }) => {
  const overdue = !isFinish && isOverdue(dueDate)

  const getPriorityDot = () => {
    if (isFinish) return 'bg-[var(--color-text-tertiary)]'
    switch (priority) {
      case 'high': return 'bg-red-500'
      case 'medium': return 'bg-amber-500'
      case 'low': return 'bg-emerald-500'
      default: return 'bg-[var(--color-text-tertiary)]'
    }
  }

  return (
    <div className={`
      group flex items-start gap-4 p-4 rounded-xl border transition-all duration-200
      ${isFinish 
        ? 'bg-[var(--color-muted)]/50 border-[var(--color-border-subtle)] opacity-70' 
        : overdue
          ? 'bg-red-50/50 border-red-200'
          : 'bg-[var(--color-surface)] border-[var(--color-border)] hover:border-[var(--color-text-tertiary)] hover:shadow-md'
      }
    `}>
      {/* Checkbox */}
      <label className="checkbox-wrapper pt-0.5">
        <input
          type="checkbox"
          checked={isFinish}
          onChange={onChecked}
          className="checkbox-input"
        />
        <span className="checkbox-custom" />
      </label>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Header: Priority & Tags */}
        <div className="flex items-center gap-2 flex-wrap mb-2">
          <span className={`
            inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wide font-semibold
            ${isFinish ? 'text-[var(--color-text-tertiary)]' : 'text-[var(--color-text-secondary)]'}
          `}>
            <span className={`w-1.5 h-1.5 rounded-full ${getPriorityDot()}`} />
            {PRIORITY_LABELS[priority]}
          </span>
          
          {tags?.map((tag) => (
            <span 
              key={tag}
              className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--color-muted)] text-[var(--color-text-secondary)] border border-[var(--color-border-subtle)]"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Content Text */}
        <p 
          onClick={onEdit}
          className={`
            text-[0.9375rem] leading-relaxed cursor-pointer transition-colors
            ${isFinish 
              ? 'line-through text-[var(--color-text-tertiary)]' 
              : 'text-[var(--color-text-primary)] hover:text-[var(--color-accent)]'
            }
          `}
        >
          {content}
        </p>

        {/* Footer: Dates */}
        <div className="flex items-center gap-4 mt-2 text-xs">
          {dueDate && (
            <span className={`
              flex items-center gap-1.5 font-mono
              ${overdue ? 'text-red-600 font-medium' : 'text-[var(--color-text-tertiary)]'}
            `}>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {overdue ? 'Overdue: ' : ''}{formatDate(dueDate)}
            </span>
          )}
          <span className="text-[var(--color-text-tertiary)] font-mono">
            Created {formatDate(timestamp)}
          </span>
        </div>
      </div>

      {/* Delete Button */}
      <button
        onClick={onDelete}
        className="opacity-0 group-hover:opacity-100 p-2 text-[var(--color-text-tertiary)] hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
        title="Delete"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  )
}

TodoItem.propTypes = {
  timestamp: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  isFinish: PropTypes.bool.isRequired,
  priority: PropTypes.string,
  dueDate: PropTypes.number,
  tags: PropTypes.arrayOf(PropTypes.string),
  onChecked: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
}

TodoItem.defaultProps = {
  priority: 'medium',
  dueDate: null,
  tags: [],
}

export default TodoItem
