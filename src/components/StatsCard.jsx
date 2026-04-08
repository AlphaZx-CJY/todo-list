import PropTypes from 'prop-types'

const StatsCard = ({ stats }) => {
  const { total, active, completed, overdue, byPriority } = stats

  const cards = [
    {
      label: 'Total',
      value: total,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      color: 'text-[var(--color-text-primary)]',
      bgColor: 'bg-[var(--color-surface)]',
      borderColor: 'border-[var(--color-border)]',
    },
    {
      label: 'Active',
      value: active,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
    },
    {
      label: 'Done',
      value: completed,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
    },
    {
      label: 'Overdue',
      value: overdue,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      color: overdue > 0 ? 'text-red-600' : 'text-[var(--color-text-tertiary)]',
      bgColor: overdue > 0 ? 'bg-red-50' : 'bg-[var(--color-muted)]',
      borderColor: overdue > 0 ? 'border-red-200' : 'border-[var(--color-border)]',
      pulse: overdue > 0,
    },
  ]

  return (
    <div className="space-y-5">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-4 gap-3">
        {cards.map((card) => (
          <div
            key={card.label}
            className={`
              relative overflow-hidden rounded-xl p-4 border transition-all duration-200
              ${card.bgColor} ${card.borderColor}
              ${card.pulse ? 'ring-2 ring-red-100' : ''}
            `}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-tertiary)] mb-1">
                  {card.label}
                </p>
                <p className={`text-2xl font-semibold tracking-tight ${card.color}`}>
                  {card.value}
                </p>
              </div>
              <div className={`${card.color} opacity-60`}>
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Priority Breakdown */}
      {active > 0 && (
        <div className="bg-[var(--color-muted)]/50 rounded-xl p-4 border border-[var(--color-border-subtle)]">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-secondary)]">
              Priority Distribution
            </p>
            <span className="text-xs text-[var(--color-text-tertiary)] font-mono">
              {active} active
            </span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-sm text-[var(--color-text-secondary)]">High</span>
              <span className="text-sm font-semibold text-[var(--color-text-primary)]">{byPriority.high}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-sm text-[var(--color-text-secondary)]">Medium</span>
              <span className="text-sm font-semibold text-[var(--color-text-primary)]">{byPriority.medium}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-sm text-[var(--color-text-secondary)]">Low</span>
              <span className="text-sm font-semibold text-[var(--color-text-primary)]">{byPriority.low}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

StatsCard.propTypes = {
  stats: PropTypes.shape({
    total: PropTypes.number.isRequired,
    active: PropTypes.number.isRequired,
    completed: PropTypes.number.isRequired,
    overdue: PropTypes.number.isRequired,
    byPriority: PropTypes.shape({
      high: PropTypes.number.isRequired,
      medium: PropTypes.number.isRequired,
      low: PropTypes.number.isRequired,
    }).isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
}

export default StatsCard
