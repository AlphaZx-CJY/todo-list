import { memo } from 'react'
import PropTypes from 'prop-types'
import { PRIORITY_LABELS } from '../utils/constants'
import { formatDate, formatRelativeTime, isOverdue } from '../utils/dateUtils'

const TimelineItem = memo(({ todo, onToggle, onDelete, onEdit, isLast }) => {
  const { id, content, isFinish, priority, dueDate, tags, timestamp, completedAt } = todo
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

  const getTimelineDot = () => {
    if (isFinish) return 'bg-emerald-500 border-emerald-500'
    if (overdue) return 'bg-red-500 border-red-500'
    return 'bg-[var(--color-accent)] border-[var(--color-accent)]'
  }

  return (
    <div className="relative flex gap-4">
      {/* Timeline Line & Dot */}
      <div className="flex flex-col items-center">
        <div className={`
          w-3 h-3 rounded-full border-2 z-10 mt-2
          ${getTimelineDot()}
        `} />
        {!isLast && (
          <div className="w-px flex-1 bg-[var(--color-border)] mt-2" />
        )}
      </div>

      {/* Content Card */}
      <div className={`
        flex-1 p-4 rounded-xl border mb-3 transition-all duration-200 group
        ${isFinish 
          ? 'bg-[var(--color-muted)]/50 border-[var(--color-border-subtle)] opacity-70' 
          : overdue
            ? 'bg-red-50/50 border-red-200'
            : 'bg-[var(--color-surface)] border-[var(--color-border)] hover:border-[var(--color-text-tertiary)] hover:shadow-md'
        }
      `}>
        <div className="flex items-start gap-3">
          {/* Checkbox */}
          <label className="checkbox-wrapper pt-0.5">
            <input
              type="checkbox"
              checked={isFinish}
              onChange={() => onToggle(id)}
              className="checkbox-input"
            />
            <span className="checkbox-custom" />
          </label>

          <div className="flex-1 min-w-0">
            {/* Header */}
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
                  className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--color-muted)] text-[var(--color-text-secondary)]"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Content */}
            <p 
              onClick={() => onEdit(todo)}
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

            {/* Footer */}
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
                  {overdue ? 'Overdue: ' : 'Due: '}{formatDate(dueDate)}
                </span>
              )}
              
              {isFinish && completedAt && (
                <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                  Completed {formatRelativeTime(completedAt)}
                </span>
              )}
              
              <span className="text-[var(--color-text-tertiary)] font-mono">
                Created {formatDate(timestamp)}
              </span>
            </div>
          </div>

          {/* Delete */}
          <button
            onClick={() => onDelete(id)}
            className="opacity-0 group-hover:opacity-100 p-2 text-[var(--color-text-tertiary)] hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
})

TimelineItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    isFinish: PropTypes.bool.isRequired,
    priority: PropTypes.string,
    dueDate: PropTypes.number,
    tags: PropTypes.arrayOf(PropTypes.string),
    timestamp: PropTypes.number.isRequired,
    completedAt: PropTypes.number,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  isLast: PropTypes.bool,
}

TimelineItem.displayName = 'TimelineItem'

export default TimelineItem
