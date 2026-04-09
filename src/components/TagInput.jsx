import { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { MAX_TAGS } from '../utils/constants'

const TagInput = ({ tags = [], onChange, suggestions = [] }) => {
  const [inputValue, setInputValue] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef(null)

  const availableSuggestions = suggestions.filter(
    tag => !tags.includes(tag) && tag.toLowerCase().includes(inputValue.toLowerCase())
  )

  const addTag = (tag) => {
    const trimmed = tag.trim()
    if (trimmed && !tags.includes(trimmed) && tags.length < MAX_TAGS) {
      onChange([...tags, trimmed])
      setInputValue('')
    }
  }

  const removeTag = (tagToRemove) => {
    onChange(tags.filter(tag => tag !== tagToRemove))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag(inputValue)
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      removeTag(tags[tags.length - 1])
    }
  }

  return (
    <div className="relative z-50">
      <div 
        className={`
          flex flex-wrap items-center gap-2 p-3 border rounded-xl bg-[var(--color-surface)]
          transition-all duration-200
          ${tags.length >= MAX_TAGS ? 'bg-[var(--color-muted)]' : 'focus-within:border-[var(--color-text-secondary)] focus-within:ring-1 focus-within:ring-[var(--color-accent)]/10'}
        `}
        onClick={() => inputRef.current?.focus()}
      >
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-[var(--color-muted)] text-[var(--color-text-secondary)] border border-[var(--color-border)]"
          >
            <span className="text-[var(--color-text-tertiary)]">#</span>
            {tag}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                removeTag(tag)
              }}
              className="hover:text-[var(--color-text-primary)] transition-colors"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </span>
        ))}
        
        {tags.length < MAX_TAGS && (
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value)
              setShowSuggestions(true)
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder={tags.length === 0 ? `Add tags (max ${MAX_TAGS})...` : ''}
            className="flex-1 min-w-[80px] outline-none text-sm bg-transparent text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)]"
          />
        )}
      </div>
      
      {/* Tag count hint */}
      {tags.length > 0 && (
        <p className="text-xs text-[var(--color-text-tertiary)] mt-1.5">
          {tags.length}/{MAX_TAGS} tags added
        </p>
      )}
      
      {/* Suggestions */}
      {showSuggestions && availableSuggestions.length > 0 && (
        <div className="absolute z-[60] mt-2 w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-xl max-h-40 overflow-y-auto">
          {availableSuggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => {
                addTag(suggestion)
                setShowSuggestions(false)
              }}
              className="w-full text-left px-4 py-2.5 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-muted)] hover:text-[var(--color-text-primary)] transition-colors first:rounded-t-xl last:rounded-b-xl"
            >
              <span className="text-[var(--color-text-tertiary)]">#</span>
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

TagInput.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.string),
}

export default TagInput
