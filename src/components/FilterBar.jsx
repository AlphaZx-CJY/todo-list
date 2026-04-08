import PropTypes from 'prop-types'
import { FILTER_STATUS, PRIORITY } from '../utils/constants'

const FilterBar = ({ filter, onChange, availableTags = [], onClear }) => {
  const hasFilters = filter.status !== FILTER_STATUS.ALL || 
                     filter.priority || 
                     filter.tag || 
                     filter.search

  const handleSearchChange = (e) => {
    onChange({ ...filter, search: e.target.value })
  }

  const handleStatusChange = (status) => {
    onChange({ ...filter, status })
  }

  const handlePriorityChange = (priority) => {
    onChange({ ...filter, priority: filter.priority === priority ? null : priority })
  }

  const handleTagChange = (tag) => {
    onChange({ ...filter, tag: filter.tag === tag ? null : tag })
  }

  return (
    <div className="card p-5">
      {/* Search */}
      <div className="relative mb-4">
        <svg 
          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-tertiary)]"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={filter.search}
          onChange={handleSearchChange}
          placeholder="Search tasks or tags..."
          className="input !pl-10"
        />
        {filter.search && (
          <button
            onClick={() => onChange({ ...filter, search: '' })}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-6">
        {/* Status */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">
            Status
          </span>
          <div className="flex items-center gap-1.5">
            {Object.values(FILTER_STATUS).map((status) => (
              <button
                key={status}
                onClick={() => handleStatusChange(status)}
                className={`
                  px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200
                  ${filter.status === status
                    ? 'bg-[var(--color-accent)] text-white'
                    : 'bg-[var(--color-muted)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                  }
                `}
              >
                {status === FILTER_STATUS.ALL && 'All'}
                {status === FILTER_STATUS.ACTIVE && 'Active'}
                {status === FILTER_STATUS.COMPLETED && 'Done'}
              </button>
            ))}
          </div>
        </div>

        {/* Priority */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">
            Priority
          </span>
          <div className="flex items-center gap-1.5">
            {Object.values(PRIORITY).map((priority) => (
              <button
                key={priority}
                onClick={() => handlePriorityChange(priority)}
                className={`
                  w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200
                  ${filter.priority === priority
                    ? priority === PRIORITY.HIGH 
                      ? 'bg-red-500 text-white'
                      : priority === PRIORITY.MEDIUM 
                        ? 'bg-amber-500 text-white'
                        : 'bg-emerald-500 text-white'
                    : 'bg-[var(--color-muted)] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]'
                  }
                `}
                title={priority}
              >
                <span className="w-2 h-2 rounded-full bg-current" />
              </button>
            ))}
          </div>
        </div>

        {/* Tags */}
        {availableTags.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">
              Tags
            </span>
            <div className="flex items-center gap-1.5">
              {availableTags.slice(0, 6).map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagChange(tag)}
                  className={`
                    px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-200
                    ${filter.tag === tag
                      ? 'bg-[var(--color-accent)] text-white'
                      : 'bg-[var(--color-muted)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                    }
                  `}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Clear */}
        {hasFilters && (
          <button
            onClick={onClear}
            className="ml-auto text-xs font-medium text-[var(--color-text-tertiary)] hover:text-red-500 transition-colors flex items-center gap-1"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear
          </button>
        )}
      </div>
    </div>
  )
}

FilterBar.propTypes = {
  filter: PropTypes.shape({
    status: PropTypes.string.isRequired,
    priority: PropTypes.string,
    tag: PropTypes.string,
    search: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  availableTags: PropTypes.arrayOf(PropTypes.string),
  onClear: PropTypes.func.isRequired,
}

export default FilterBar
