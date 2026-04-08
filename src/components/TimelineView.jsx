import PropTypes from 'prop-types'
import { groupByTimeline } from '../utils/dateUtils'
import { TIMELINE_LABELS } from '../utils/constants'
import TimelineItem from './TimelineItem'
import EmptyState from './EmptyState'

const TimelineView = ({ todos, onToggle, onDelete, onEdit }) => {
  const groups = groupByTimeline(todos)

  const groupOrder = [
    'overdue',
    'today',
    'tomorrow',
    'thisWeek',
    'upcoming',
    'earlier',
    'completed',
  ]

  const getGroupStyle = (groupKey) => {
    switch (groupKey) {
      case 'overdue':
        return 'bg-red-50 border-red-200 text-red-800'
      case 'today':
        return 'bg-[var(--color-accent)] border-[var(--color-accent)] text-white'
      case 'tomorrow':
        return 'bg-neutral-100 border-neutral-200 text-neutral-800'
      case 'thisWeek':
        return 'bg-neutral-50 border-neutral-200 text-neutral-700'
      case 'upcoming':
        return 'bg-slate-50 border-slate-200 text-slate-700'
      case 'earlier':
        return 'bg-[var(--color-muted)] border-[var(--color-border)] text-[var(--color-text-secondary)]'
      case 'completed':
        return 'bg-emerald-50 border-emerald-200 text-emerald-800'
      default:
        return 'bg-[var(--color-muted)] border-[var(--color-border)]'
    }
  }

  const hasAnyTodos = Object.values(groups).some(group => group.length > 0)

  if (!hasAnyTodos) {
    return <EmptyState type="timeline" />
  }

  return (
    <div className="space-y-10">
      {groupOrder.map((groupKey) => {
        const groupTodos = groups[groupKey]
        if (groupTodos.length === 0) return null

        return (
          <section key={groupKey} className="relative">
            {/* Group Header */}
            <div className="flex items-center gap-4 mb-5 sticky top-[200px] z-10">
              <span className={`
                px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border
                ${getGroupStyle(groupKey)}
              `}>
                {TIMELINE_LABELS[groupKey]}
              </span>
              <span className="text-sm text-[var(--color-text-tertiary)] font-mono">
                {groupTodos.length} tasks
              </span>
              <div className="flex-1 h-px bg-[var(--color-border)]" />
            </div>

            {/* Timeline Items */}
            <div className="relative space-y-3 pl-4">
              {groupTodos.map((todo, index) => (
                <TimelineItem
                  key={todo.id}
                  todo={todo}
                  onToggle={onToggle}
                  onDelete={onDelete}
                  onEdit={onEdit}
                  isLast={index === groupTodos.length - 1}
                />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}

TimelineView.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    isFinish: PropTypes.bool.isRequired,
    priority: PropTypes.string,
    dueDate: PropTypes.number,
    tags: PropTypes.arrayOf(PropTypes.string),
    timestamp: PropTypes.number.isRequired,
    completedAt: PropTypes.number,
  })).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
}

export default TimelineView
