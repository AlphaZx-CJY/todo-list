/**
 * Date utility functions for the Todo List application
 */

import { TIMELINE_GROUPS } from './constants'

/**
 * Check if a date is today
 * @param {Date|number|string} date 
 * @returns {boolean}
 */
export const isToday = (date) => {
  const d = new Date(date)
  const today = new Date()
  return d.toDateString() === today.toDateString()
}

/**
 * Check if a date is yesterday
 * @param {Date|number|string} date 
 * @returns {boolean}
 */
export const isYesterday = (date) => {
  const d = new Date(date)
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return d.toDateString() === yesterday.toDateString()
}

/**
 * Check if a date is tomorrow
 * @param {Date|number|string} date 
 * @returns {boolean}
 */
export const isTomorrow = (date) => {
  const d = new Date(date)
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return d.toDateString() === tomorrow.toDateString()
}

/**
 * Check if a date is this week (not today or yesterday)
 * @param {Date|number|string} date 
 * @returns {boolean}
 */
export const isThisWeek = (date) => {
  const d = new Date(date)
  const now = new Date()
  const weekAgo = new Date()
  weekAgo.setDate(now.getDate() - 7)
  
  return d > weekAgo && d < now && !isToday(d) && !isYesterday(d)
}

/**
 * Check if a date is within the next 7 days
 * @param {Date|number|string} date 
 * @returns {boolean}
 */
export const isWithinNextWeek = (date) => {
  const d = new Date(date)
  const now = new Date()
  const nextWeek = new Date()
  nextWeek.setDate(now.getDate() + 7)
  
  return d > now && d <= nextWeek && !isToday(d) && !isTomorrow(d)
}

/**
 * Check if a due date is overdue
 * @param {Date|number|string} dueDate 
 * @returns {boolean}
 */
export const isOverdue = (dueDate) => {
  if (!dueDate) return false
  const d = new Date(dueDate)
  const now = new Date()
  // Set to end of today for comparison
  const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59)
  return d < endOfToday && !isToday(d)
}

/**
 * Get timeline group for a todo item
 * @param {Object} todo 
 * @returns {string} TIMELINE_GROUPS value
 */
export const getTimelineGroup = (todo) => {
  if (todo.isFinish) {
    return TIMELINE_GROUPS.COMPLETED
  }
  
  if (todo.dueDate) {
    if (isOverdue(todo.dueDate)) return TIMELINE_GROUPS.OVERDUE
    if (isToday(todo.dueDate)) return TIMELINE_GROUPS.TODAY
    if (isTomorrow(todo.dueDate)) return TIMELINE_GROUPS.TOMORROW
    if (isWithinNextWeek(todo.dueDate)) return TIMELINE_GROUPS.THIS_WEEK
    return TIMELINE_GROUPS.UPCOMING
  }
  
  // Group by creation date if no due date
  if (isToday(todo.timestamp)) return TIMELINE_GROUPS.TODAY
  if (isYesterday(todo.timestamp)) return TIMELINE_GROUPS.TOMORROW
  if (isThisWeek(todo.timestamp)) return TIMELINE_GROUPS.THIS_WEEK
  return TIMELINE_GROUPS.EARLIER
}

/**
 * Group todos by timeline
 * @param {Array} todos 
 * @returns {Object} Grouped todos
 */
export const groupByTimeline = (todos) => {
  const groups = {
    [TIMELINE_GROUPS.OVERDUE]: [],
    [TIMELINE_GROUPS.TODAY]: [],
    [TIMELINE_GROUPS.TOMORROW]: [],
    [TIMELINE_GROUPS.THIS_WEEK]: [],
    [TIMELINE_GROUPS.UPCOMING]: [],
    [TIMELINE_GROUPS.EARLIER]: [],
    [TIMELINE_GROUPS.COMPLETED]: [],
  }
  
  todos.forEach(todo => {
    const group = getTimelineGroup(todo)
    if (groups[group]) {
      groups[group].push(todo)
    }
  })
  
  // Sort completed by completion time (newest first)
  groups[TIMELINE_GROUPS.COMPLETED].sort((a, b) => 
    (b.completedAt || 0) - (a.completedAt || 0)
  )
  
  // Sort others by due date, then priority
  Object.keys(groups).forEach(key => {
    if (key !== TIMELINE_GROUPS.COMPLETED) {
      groups[key].sort((a, b) => {
        // Sort by due date first
        if (a.dueDate && b.dueDate) {
          return new Date(a.dueDate) - new Date(b.dueDate)
        }
        if (a.dueDate) return -1
        if (b.dueDate) return 1
        // Then by priority
        const priorityOrder = { high: 0, medium: 1, low: 2 }
        return priorityOrder[a.priority] - priorityOrder[b.priority]
      })
    }
  })
  
  return groups
}

/**
 * Format date for display
 * @param {Date|number|string} date 
 * @returns {string}
 */
export const formatDate = (date) => {
  if (!date) return ''
  const d = new Date(date)
  const now = new Date()
  const isCurrentYear = d.getFullYear() === now.getFullYear()
  
  const options = {
    month: 'short',
    day: 'numeric',
    ...(isCurrentYear ? {} : { year: 'numeric' }),
  }
  
  return d.toLocaleDateString('zh-CN', options)
}

/**
 * Format date with time for display
 * @param {Date|number|string} date 
 * @returns {string}
 */
export const formatDateTime = (date) => {
  if (!date) return ''
  const d = new Date(date)
  
  const options = {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }
  
  return d.toLocaleString('zh-CN', options)
}

/**
 * Format relative time (e.g., "2小时前", "昨天")
 * @param {Date|number|string} date 
 * @returns {string}
 */
export const formatRelativeTime = (date) => {
  if (!date) return ''
  const d = new Date(date)
  const now = new Date()
  const diffMs = now - d
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)
  
  if (diffMins < 1) return '刚刚'
  if (diffMins < 60) return `${diffMins}分钟前`
  if (diffHours < 24) return `${diffHours}小时前`
  if (isYesterday(d)) return '昨天'
  if (diffDays < 7) return `${diffDays}天前`
  
  return formatDate(d)
}

/**
 * Get input date string for date input element
 * @param {Date|number|string} date 
 * @returns {string} YYYY-MM-DD format
 */
export const toInputDate = (date) => {
  if (!date) return ''
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Get today's date string for date input
 * @returns {string} YYYY-MM-DD format
 */
export const getTodayInputDate = () => {
  return toInputDate(new Date())
}
