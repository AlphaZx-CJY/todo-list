import { useState } from 'react'
import TodoItem from './TodoItem'
import PropTypes from 'prop-types'

/**
 * @typedef {import('./TodoItem').TodoItemInterface} TodoItemInterface
 * @typedef {object} TodoContentProps
 * @property {string} title
 * @property {TodoItemInterface[]} items
 * @property {function} updateChecked
 * @property {function} deleteItem
 */

/**
 * TodoContent Component
 *
 * @param {TodoContentProps} props
 * @returns
 */
const TodoContent = ({ title, items, updateChecked, deleteItem }) => {
  const [expanded, setExpanded] = useState(true)

  const list = items.map((item) => (
    <TodoItem
      key={item.timestamp}
      timestamp={item.timestamp}
      content={item.content}
      isFinish={item.isFinish}
      onChecked={(value) => updateChecked(value, item)}
      onDelete={() => deleteItem(item)}
    />
  ))

  const updateExpanded = () => {
    if (list.length > 0) {
      setExpanded(!expanded)
    }
  }

  const count = list.length === 0 ? '' : `[${list.length}]`
  return (
    <>
      <h2
        className="font-bold font-mono text-xl uppercase cursor-pointer"
        onClick={updateExpanded}
      >
        <span className="bg-slate-800 px-2 text-gray-100 border rounded-md italic">{title}</span>
        {count}
      </h2>
      <ul
        className={`flex flex-col gap-2 overflow-y-scroll hide-scrollbar transition-all duration-300 ease-in-out ${
          expanded ? 'max-h-1/2' : 'max-h-0'
        }`}
      >
        {list}
      </ul>
    </>
  )
}

TodoContent.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      timestamp: PropTypes.number,
      content: PropTypes.string,
      isFinish: PropTypes.bool,
    })
  ).isRequired,
  updateChecked: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
}

export default TodoContent
