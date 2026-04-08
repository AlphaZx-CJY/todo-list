import { useState } from 'react'
import TodoItem from './TodoItem'
import PropTypes from 'prop-types'

const TodoContent = ({ title, items, onToggle, onDelete, onEdit }) => {
  const [expanded, setExpanded] = useState(true)

  const list = items.map((item) => (
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
  ))

  const count = list.length

  if (count === 0) return null

  return (
    <div className="space-y-3">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-3 group"
      >
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors">
          {title}
        </h2>
        <span className="px-2 py-0.5 text-xs font-medium bg-[var(--color-muted)] text-[var(--color-text-secondary)] rounded-full">
          {count}
        </span>
        <svg 
          className={`w-4 h-4 text-[var(--color-text-tertiary)] transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <div className={`space-y-3 overflow-hidden transition-all duration-300 ${expanded ? 'opacity-100' : 'max-h-0 opacity-0'}`}>
        {list}
      </div>
    </div>
  )
}

TodoContent.propTypes = {
  title: PropTypes.string.isRequired,
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

export default TodoContent
