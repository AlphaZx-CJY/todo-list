/**
 * Constants for the Todo List application
 */

// Priority levels
export const PRIORITY = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
}

export const PRIORITY_LABELS = {
  [PRIORITY.HIGH]: 'High',
  [PRIORITY.MEDIUM]: 'Medium',
  [PRIORITY.LOW]: 'Low',
}

// Timeline groups
export const TIMELINE_GROUPS = {
  OVERDUE: 'overdue',
  TODAY: 'today',
  TOMORROW: 'tomorrow',
  THIS_WEEK: 'thisWeek',
  UPCOMING: 'upcoming',
  EARLIER: 'earlier',
  COMPLETED: 'completed',
}

export const TIMELINE_LABELS = {
  [TIMELINE_GROUPS.OVERDUE]: 'Overdue',
  [TIMELINE_GROUPS.TODAY]: 'Today',
  [TIMELINE_GROUPS.TOMORROW]: 'Tomorrow',
  [TIMELINE_GROUPS.THIS_WEEK]: 'This Week',
  [TIMELINE_GROUPS.UPCOMING]: 'Upcoming',
  [TIMELINE_GROUPS.EARLIER]: 'Earlier',
  [TIMELINE_GROUPS.COMPLETED]: 'Completed',
}

// View modes
export const VIEW_MODE = {
  LIST: 'list',
  TIMELINE: 'timeline',
}

// Filter options
export const FILTER_STATUS = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
}

// Database config
export const DB_CONFIG = {
  NAME: 'MyTodoList',
  STORE: 'TodoListStore',
  VERSION: 2,
}

// Max tags per todo
export const MAX_TAGS = 10

// Tag colors (CSS classes)
export const TAG_COLORS = [
  'bg-blue-100 text-blue-700 border-blue-200',
  'bg-purple-100 text-purple-700 border-purple-200',
  'bg-pink-100 text-pink-700 border-pink-200',
  'bg-indigo-100 text-indigo-700 border-indigo-200',
  'bg-teal-100 text-teal-700 border-teal-200',
  'bg-orange-100 text-orange-700 border-orange-200',
  'bg-cyan-100 text-cyan-700 border-cyan-200',
]
