import PropTypes from 'prop-types'
import TodoContent from './TodoContent'

/**
 * @typedef {import('./TodoItem').TodoItemInterface} TodoItemInterface
 * @typedef {object} TodoListProps
 * @property {TodoItemInterface[]} items
 * @property {function} updateTodos
 */

/**
 * TodoList Component
 *
 * @param {TodoListProps} props
 * @returns
 */
const TodoList = ({ items, updateTodos }) => {
  const finished = []
  const unfinished = []
  items.forEach((item) => {
    if (item.isFinish) {
      finished.push(item)
    } else {
      unfinished.push(item)
    }
  })

  const updateChecked = (value, todo) => {
    const todos = []
    for (let item of items) {
      if (item.timestamp === todo.timestamp) {
        todos.push({ ...item, isFinish: value })
        continue
      }
      todos.push(item)
    }
    updateTodos(todos)
  }

  const deleteItem = (item) => {
    const newItems = items.filter((it) => item.timestamp !== it.timestamp)
    updateTodos(newItems)
  }

  return (
    <div className="flex flex-col gap-2 grow md:min-w-128 md:max-w-128 md:self-center self-stretch mx-4 overflow-hidden mb-2">
      {unfinished.length > 0 && (
        <TodoContent
          title="Unfinished"
          items={unfinished}
          updateChecked={updateChecked}
          deleteItem={deleteItem}
        />
      )}

      {finished.length > 0 && (
        <TodoContent
          title="Finished"
          items={finished}
          updateChecked={updateChecked}
          deleteItem={deleteItem}
        />
      )}
    </div>
  )
}

TodoList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      timestamp: PropTypes.number,
      content: PropTypes.string,
      isFinish: PropTypes.bool,
    })
  ).isRequired,
  updateTodos: PropTypes.func.isRequired,
}

export default TodoList
