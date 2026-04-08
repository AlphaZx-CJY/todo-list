import PropTypes from 'prop-types'
import TodoItem from './TodoItem'
import EmptyState from './EmptyState'
import { PRIORITY } from '../utils/constants'

const TodoList = ({ items, onToggle, onDelete, onEdit }) => {
  const unfinished = items.filter(item => !item.isFinish)
  const finished = items.filter(item => item.isFinish)

  // Sort unfinished by priority and due date
  const sortedUnfinished = [...unfinished].sort((a, b) => {
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate) - new Date(b.dueDate)
    }
    if (a.dueDate) return -1
    if (b.dueDate) return 1
    
    const priorityOrder = { [PRIORITY.HIGH]: 0, [PRIORITY.MEDIUM]: 1, [PRIORITY.LOW]: 2 }
    return priorityOrder[a.priority] - priorityOrder[b.priority]
  })

  // Sort finished by completion time
  const sortedFinished = [...finished].sort((a, b) => 
    (b.completedAt || 0) - (a.completedAt || 0)
  )

  if (items.length === 0) {
    return <EmptyState type="default" />
  }

  return (
    <div className="space-y-8">
      {sortedUnfinished.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
              To Do
            </h2>
            <span className="px-2 py-0.5 text-xs font-medium bg-[var(--color-muted)] text-[var(--color-text-secondary)] rounded-full">
              {sortedUnfinished.length}
            </span>
          </div>
          <div className="space-y-3">
            {sortedUnfinished.map((item) => (
              <TodoItem
                key={item.id}
                id={item.id}
                timestamp={item.timestamp}
                content={item.content}
                isFinish={item.isFinish}
                priority={item.priority}
                dueDate={item.dueDate}
                tags={item.tags}
                onChecked={() => onToggle(item.id)}
                onDelete={() => onDelete(item.id)}
                onEdit={() => onEdit(item)}
              />
            ))}
          </div>
        </section>
      )}

      {sortedFinished.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">
              Completed
            </h2>
            <span className="px-2 py-0.5 text-xs font-medium bg-[var(--color-border-subtle)] text-[var(--color-text-tertiary)] rounded-full">
              {sortedFinished.length}
            </span>
          </div>
          <div className="space-y-3">
            {sortedFinished.map((item) => (
              <TodoItem
                key={item.id}
                id={item.id}
                timestamp={item.timestamp}
                content={item.content}
                isFinish={item.isFinish}
                priority={item.priority}
                dueDate={item.dueDate}
                tags={item.tags}
                onChecked={() => onToggle(item.id)}
                onDelete={() => onDelete(item.id)}
                onEdit={() => onEdit(item)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

TodoList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      timestamp: PropTypes.number.isRequired,
      content: PropTypes.string.isRequired,
      isFinish: PropTypes.bool.isRequired,
      priority: PropTypes.string,
      dueDate: PropTypes.number,
      tags: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
}

export default TodoList
