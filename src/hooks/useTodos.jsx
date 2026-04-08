import { useState, useEffect, useCallback, useMemo } from 'react'
import useIndexedDB from './useIndexedDB'
import { DB_CONFIG, FILTER_STATUS, PRIORITY } from '../utils/constants'
import { isOverdue } from '../utils/dateUtils'

/**
 * Unified todo management hook
 * Handles all CRUD operations, filtering, and statistics
 */
const useTodos = () => {
  const { 
    db, 
    err, 
    isLoading,
    addItem, 
    getAllItems, 
    updateItem, 
    deleteItem,
    deleteItems 
  } = useIndexedDB(DB_CONFIG.NAME, DB_CONFIG.STORE, DB_CONFIG.VERSION)
  
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState({
    status: FILTER_STATUS.ALL,
    priority: null,
    tag: null,
    search: '',
  })

  // Load todos on mount
  const loadTodos = useCallback(async () => {
    try {
      const data = await getAllItems()
      setTodos(data)
    } catch (error) {
      console.error('Failed to load todos:', error)
    }
  }, [getAllItems])

  useEffect(() => {
    if (db) {
      loadTodos()
    }
  }, [db, loadTodos])

  // Add new todo
  const addTodo = useCallback(async (todoData) => {
    const newTodo = {
      ...todoData,
      timestamp: Date.now(),
      createdAt: Date.now(),
      isFinish: false,
      priority: todoData.priority || PRIORITY.MEDIUM,
      tags: todoData.tags || [],
    }
    
    try {
      const id = await addItem(newTodo)
      await loadTodos()
      return id
    } catch (error) {
      console.error('Failed to add todo:', error)
      throw error
    }
  }, [addItem, loadTodos])

  // Toggle todo completion
  const toggleTodo = useCallback(async (id) => {
    const todo = todos.find(t => t.id === id)
    if (!todo) return

    const updatedTodo = {
      ...todo,
      isFinish: !todo.isFinish,
      completedAt: !todo.isFinish ? Date.now() : null,
    }
    
    try {
      await updateItem(updatedTodo)
      await loadTodos()
    } catch (error) {
      console.error('Failed to toggle todo:', error)
      throw error
    }
  }, [todos, updateItem, loadTodos])

  // Update todo
  const updateTodo = useCallback(async (id, updates) => {
    const todo = todos.find(t => t.id === id)
    if (!todo) return

    const updatedTodo = {
      ...todo,
      ...updates,
      updatedAt: Date.now(),
    }
    
    try {
      await updateItem(updatedTodo)
      await loadTodos()
    } catch (error) {
      console.error('Failed to update todo:', error)
      throw error
    }
  }, [todos, updateItem, loadTodos])

  // Delete todo
  const removeTodo = useCallback(async (id) => {
    try {
      await deleteItem(id)
      await loadTodos()
    } catch (error) {
      console.error('Failed to delete todo:', error)
      throw error
    }
  }, [deleteItem, loadTodos])

  // Batch delete todos
  const removeTodos = useCallback(async (ids) => {
    try {
      await deleteItems(ids)
      await loadTodos()
    } catch (error) {
      console.error('Failed to delete todos:', error)
      throw error
    }
  }, [deleteItems, loadTodos])

  // Filter todos
  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      // Status filter
      if (filter.status === FILTER_STATUS.ACTIVE && todo.isFinish) return false
      if (filter.status === FILTER_STATUS.COMPLETED && !todo.isFinish) return false
      
      // Priority filter
      if (filter.priority && todo.priority !== filter.priority) return false
      
      // Tag filter
      if (filter.tag && !todo.tags?.includes(filter.tag)) return false
      
      // Search filter
      if (filter.search) {
        const searchLower = filter.search.toLowerCase()
        const matchesContent = todo.content.toLowerCase().includes(searchLower)
        const matchesTag = todo.tags?.some(tag => tag.toLowerCase().includes(searchLower))
        if (!matchesContent && !matchesTag) return false
      }
      
      return true
    })
  }, [todos, filter])

  // Statistics
  const stats = useMemo(() => {
    const total = todos.length
    const active = todos.filter(t => !t.isFinish).length
    const completed = todos.filter(t => t.isFinish).length
    const overdue = todos.filter(t => !t.isFinish && isOverdue(t.dueDate)).length
    
    const byPriority = {
      high: todos.filter(t => t.priority === PRIORITY.HIGH && !t.isFinish).length,
      medium: todos.filter(t => t.priority === PRIORITY.MEDIUM && !t.isFinish).length,
      low: todos.filter(t => t.priority === PRIORITY.LOW && !t.isFinish).length,
    }
    
    // Get all unique tags
    const allTags = todos.flatMap(t => t.tags || [])
    const uniqueTags = [...new Set(allTags)]
    
    return {
      total,
      active,
      completed,
      overdue,
      byPriority,
      tags: uniqueTags,
    }
  }, [todos])

  // Active todos for display (sorted by priority and due date)
  const activeTodos = useMemo(() => {
    return todos
      .filter(t => !t.isFinish)
      .sort((a, b) => {
        // Sort by due date first (if exists)
        if (a.dueDate && b.dueDate) {
          return new Date(a.dueDate) - new Date(b.dueDate)
        }
        if (a.dueDate) return -1
        if (b.dueDate) return 1
        
        // Then by priority
        const priorityOrder = { high: 0, medium: 1, low: 2 }
        return priorityOrder[a.priority] - priorityOrder[b.priority]
      })
  }, [todos])

  // Completed todos (sorted by completion time)
  const completedTodos = useMemo(() => {
    return todos
      .filter(t => t.isFinish)
      .sort((a, b) => (b.completedAt || 0) - (a.completedAt || 0))
  }, [todos])

  return {
    // State
    todos,
    filteredTodos,
    activeTodos,
    completedTodos,
    filter,
    setFilter,
    stats,
    
    // Loading states
    isLoading,
    error: err,
    
    // Actions
    loadTodos,
    addTodo,
    toggleTodo,
    updateTodo,
    removeTodo,
    removeTodos,
  }
}

export default useTodos
