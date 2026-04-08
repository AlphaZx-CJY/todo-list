import PropTypes from 'prop-types'

const EmptyState = ({ type = 'default', message, onAction, actionLabel }) => {
  const configs = {
    default: {
      icon: (
        <svg className="w-16 h-16 text-[var(--color-border)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      title: 'No tasks yet',
      description: 'Create your first task to get started.',
    },
    timeline: {
      icon: (
        <svg className="w-16 h-16 text-[var(--color-border)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Timeline is empty',
      description: 'Add some tasks to see them organized by time.',
    },
    search: {
      icon: (
        <svg className="w-16 h-16 text-[var(--color-border)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      title: 'No results found',
      description: message || 'Try adjusting your filters or search terms.',
    },
    completed: {
      icon: (
        <svg className="w-16 h-16 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'All caught up!',
      description: 'You\'ve completed all your tasks. Great job!',
    },
  }

  const config = configs[type] || configs.default

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="mb-5">
        {config.icon}
      </div>
      <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
        {config.title}
      </h3>
      <p className="text-sm text-[var(--color-text-secondary)] max-w-sm mb-5">
        {message || config.description}
      </p>
      {onAction && actionLabel && (
        <button
          onClick={onAction}
          className="btn btn-primary"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}

EmptyState.propTypes = {
  type: PropTypes.oneOf(['default', 'timeline', 'search', 'completed']),
  message: PropTypes.string,
  onAction: PropTypes.func,
  actionLabel: PropTypes.string,
}

export default EmptyState
