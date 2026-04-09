import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import PrioritySelect from './PrioritySelect'
import DatePicker from './DatePicker'
import TagInput from './TagInput'
import { PRIORITY } from '../utils/constants'

const EditModal = ({ todo, onSave, onClose, availableTags = [] }) => {
  const [content, setContent] = useState('')
  const [priority, setPriority] = useState(PRIORITY.MEDIUM)
  const [dueDate, setDueDate] = useState(null)
  const [tags, setTags] = useState([])

  useEffect(() => {
    if (todo) {
      setContent(todo.content || '')
      setPriority(todo.priority || PRIORITY.MEDIUM)
      setDueDate(todo.dueDate || null)
      setTags(todo.tags || [])
    }
  }, [todo])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    
    if (todo) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [todo, onClose])

  const handleSave = () => {
    if (!content.trim()) return
    
    onSave({
      content: content.trim(),
      priority,
      dueDate,
      tags,
    })
    onClose()
  }

  // Prevent closing when clicking inside modal
  const handleModalClick = (e) => {
    e.stopPropagation()
  }

  if (!todo) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50"
        style={{ backdropFilter: 'none' }}
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className="relative w-full max-w-lg bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-2xl z-10"
        onClick={handleModalClick}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[var(--color-border)] flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
              Edit Task
            </h2>
            <p className="text-xs text-[var(--color-text-tertiary)] mt-0.5">
              Update task details
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-muted)] rounded-lg transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Content */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] mb-2">
              Task Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What needs to be done?"
              rows={3}
              className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg bg-[var(--color-surface)] text-[var(--color-text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:border-[var(--color-accent)] resize-none"
              autoFocus
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] mb-2">
              Priority
            </label>
            <PrioritySelect value={priority} onChange={setPriority} size="sm" />
          </div>

          {/* Due date */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] mb-2">
              Due Date
            </label>
            <DatePicker value={dueDate} onChange={setDueDate} />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] mb-2">
              Tags
            </label>
            <TagInput tags={tags} onChange={setTags} suggestions={availableTags} />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[var(--color-muted)]/50 border-t border-[var(--color-border)] flex justify-end gap-3 rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-muted)] rounded-lg transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!content.trim()}
            className="px-4 py-2 text-sm font-medium text-white bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

EditModal.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    priority: PropTypes.string,
    dueDate: PropTypes.number,
    tags: PropTypes.arrayOf(PropTypes.string),
  }),
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  availableTags: PropTypes.arrayOf(PropTypes.string),
}

export default EditModal
