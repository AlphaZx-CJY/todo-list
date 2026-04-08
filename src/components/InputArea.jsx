import { useState } from 'react'
import PropTypes from 'prop-types'
import PrioritySelect from './PrioritySelect'
import DatePicker from './DatePicker'
import TagInput from './TagInput'
import { PRIORITY } from '../utils/constants'

const InputArea = ({ onSubmit, availableTags = [] }) => {
  const [content, setContent] = useState('')
  const [priority, setPriority] = useState(PRIORITY.MEDIUM)
  const [dueDate, setDueDate] = useState(null)
  const [tags, setTags] = useState([])
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSubmit = (e) => {
    e?.preventDefault()
    if (!content.trim()) return

    onSubmit({
      content: content.trim(),
      priority,
      dueDate,
      tags,
    })

    setContent('')
    setPriority(PRIORITY.MEDIUM)
    setDueDate(null)
    setTags([])
    setIsExpanded(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className={`
      card-elevated transition-all duration-300
      ${isExpanded ? 'ring-1 ring-[var(--color-accent)]' : ''}
    `}>
      <form onSubmit={handleSubmit}>
        {/* Main Input */}
        <div className="flex items-center gap-3 p-4">
          <div className="w-8 h-8 rounded-full bg-[var(--color-muted)] flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-[var(--color-text-tertiary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <input
            className="flex-1 bg-transparent text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] outline-none text-[0.9375rem]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsExpanded(true)}
            placeholder="Add a new task..."
          />
          <button
            type="submit"
            disabled={!content.trim()}
            className="btn btn-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
          >
            <span>Add</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        {/* Expanded Options */}
        <div className={`
          overflow-hidden transition-all duration-300 ease-out
          ${isExpanded ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}
        `}>
          <div className="px-4 pb-4 pt-2 border-t border-[var(--color-border-subtle)] space-y-4">
            {/* Priority */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-[var(--color-text-secondary)] font-medium min-w-[4.5rem]">Priority</span>
              <PrioritySelect value={priority} onChange={setPriority} size="sm" />
            </div>

            {/* Due Date */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-[var(--color-text-secondary)] font-medium min-w-[4.5rem]">Due date</span>
              <DatePicker value={dueDate} onChange={setDueDate} />
            </div>

            {/* Tags */}
            <div className="flex items-start gap-4">
              <span className="text-sm text-[var(--color-text-secondary)] font-medium min-w-[4.5rem] pt-2">Tags</span>
              <div className="flex-1">
                <TagInput tags={tags} onChange={setTags} suggestions={availableTags} />
              </div>
            </div>
          </div>
        </div>

        {/* Hint */}
        {!isExpanded && (
          <div className="px-4 pb-3 pt-1">
            <p className="text-xs text-[var(--color-text-tertiary)]">
              Press <kbd className="px-1.5 py-0.5 bg-[var(--color-muted)] rounded text-[10px] font-mono">Enter</kbd> to quickly add
            </p>
          </div>
        )}
      </form>
    </div>
  )
}

InputArea.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  availableTags: PropTypes.arrayOf(PropTypes.string),
}

export default InputArea
