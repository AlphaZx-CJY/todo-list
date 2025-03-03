import PropTypes from 'prop-types'
import TodoContent from './TodoContent'
import useIndexedDB from '../hooks/useIndexedDB'

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
  const { getAllItems, updateItem, deleteItem } = useIndexedDB(
    'MyTodoList',
    'TodoListStore'
  )
  const finished = []
  const unfinished = []
  items.forEach((item) => {
    if (item.isFinish) {
      finished.push(item)
    } else {
      unfinished.push(item)
    }
  })

  const updateChecked = async (value, todo) => {
    for (let item of items) {
      if (item.timestamp === todo.timestamp) {
        await updateItem({ ...item, isFinish: value })
        break
      }
    }
    const todos = await getAllItems()
    updateTodos(todos)
  }

  const handleDeleteItem = async (item) => {
    await deleteItem(item.id)
    const todos = await getAllItems()
    updateTodos(todos)
  }

  return (
    <div className="flex flex-col gap-2 grow md:min-w-128 md:max-w-128 md:self-center self-stretch mx-4 overflow-hidden mb-2">
      {unfinished.length > 0 && (
        <TodoContent
          title="Unfinished"
          items={unfinished}
          updateChecked={updateChecked}
          deleteItem={handleDeleteItem}
        />
      )}

      {finished.length > 0 && (
        <TodoContent
          title="Finished"
          items={finished}
          updateChecked={updateChecked}
          deleteItem={handleDeleteItem}
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
