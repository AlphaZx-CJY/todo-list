import { useState } from 'react'
import InputArea from './components/InputArea'
import TodoList from './components/TodoList'
import TimelineView from './components/TimelineView'
import StatsCard from './components/StatsCard'
import FilterBar from './components/FilterBar'
import EditModal from './components/EditModal'
import useTodos from './hooks/useTodos'
import { VIEW_MODE, FILTER_STATUS } from './utils/constants'

const App = () => {
  const {
    filteredTodos,
    activeTodos,
    completedTodos,
    filter,
    setFilter,
    stats,
    isLoading,
    error,
    addTodo,
    toggleTodo,
    updateTodo,
    removeTodo,
  } = useTodos()

  const [viewMode, setViewMode] = useState(VIEW_MODE.LIST)
  const [editingTodo, setEditingTodo] = useState(null)

  const handleAddTodo = async (todoData) => {
    await addTodo(todoData)
  }

  const handleToggleTodo = async (id) => {
    await toggleTodo(id)
  }

  const handleDeleteTodo = async (id) => {
    await removeTodo(id)
  }

  const handleEditTodo = (todo) => {
    setEditingTodo(todo)
  }

  const handleSaveEdit = async (updates) => {
    if (editingTodo) {
      await updateTodo(editingTodo.id, updates)
    }
  }

  const handleClearFilters = () => {
    setFilter({
      status: FILTER_STATUS.ALL,
      priority: null,
      tag: null,
      search: '',
    })
  }

  const displayTodos = viewMode === VIEW_MODE.LIST
    ? filteredTodos
    : [...activeTodos, ...completedTodos]

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-[var(--color-border)] border-t-[var(--color-accent)] rounded-full animate-spin" />
          <p className="text-[var(--color-text-secondary)] text-sm font-mono opacity-80">Loading...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)]">
        <div className="text-center">
          <div className="text-2xl font-display text-red-600 mb-2">Error</div>
          <p className="text-[var(--color-text-secondary)]">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] grain">
      {/* Header */}
      <header className="sticky top-0 z-40 glass">
        <div className="max-w-4xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between mb-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[var(--color-accent)] rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-semibold tracking-tight text-[var(--color-text-primary)]">
                  Taskmaster
                </h1>
                <p className="text-xs text-[var(--color-text-tertiary)] font-mono">
                  {stats.active} pending · {stats.completed} done
                </p>
              </div>
            </div>
            
            {/* View Toggle */}
            <div className="flex items-center bg-[var(--color-muted)] rounded-xl p-1">
              <button
                onClick={() => setViewMode(VIEW_MODE.LIST)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  flex items-center gap-2
                  ${viewMode === VIEW_MODE.LIST 
                    ? 'bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-sm' 
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                  }
                `}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                    d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                List
              </button>
              <button
                onClick={() => setViewMode(VIEW_MODE.TIMELINE)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  flex items-center gap-2
                  ${viewMode === VIEW_MODE.TIMELINE 
                    ? 'bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-sm' 
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                  }
                `}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Timeline
              </button>
            </div>
          </div>

          {/* Stats */}
          <StatsCard stats={stats} />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Input */}
        <div className="mb-6 animate-fade-in-up relative z-30">
          <InputArea 
            onSubmit={handleAddTodo}
            availableTags={stats.tags}
          />
        </div>

        {/* Filters */}
        <div className="mb-6 animate-fade-in-up stagger-1 relative z-20">
          <FilterBar
            filter={filter}
            onChange={setFilter}
            availableTags={stats.tags}
            onClear={handleClearFilters}
          />
        </div>

        {/* Content */}
        <div className="animate-fade-in-up stagger-2">
          {viewMode === VIEW_MODE.LIST ? (
            <TodoList
              items={displayTodos}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
              onEdit={handleEditTodo}
            />
          ) : (
            <TimelineView
              todos={displayTodos}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
              onEdit={handleEditTodo}
            />
          )}
        </div>
      </main>

      {/* Edit Modal */}
      <EditModal
        todo={editingTodo}
        onSave={handleSaveEdit}
        onClose={() => setEditingTodo(null)}
        availableTags={stats.tags}
      />
    </div>
  )
}

export default App
