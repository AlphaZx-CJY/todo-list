import PropTypes from 'prop-types'
import CheckBox from './CheckBox'
import DelBtn from './DelBtn'

/**
 * @typedef {object} TodoItemInterface
 * @property {number} timestamp
 * @property {string} content
 * @property {boolean} isFinish
 */

/**
 * @typedef {object} TodoItemProps
 * @property {function} onChecked
 * @property {function} onDelete
 */

/**
 * TodoItem Component
 *
 * @param {TodoItemInterface & TodoItemProps} props
 * @returns
 */
const TodoItem = ({ timestamp, content, isFinish, onChecked, onDelete }) => {
  const id = `item__${timestamp}`

  return (
    <li className="flex items-center p-2 gap-2 font-mono border border-slate-800 rounded-lg text-gray-600 shadow-sm">
      <CheckBox id={id} isFinish={isFinish} onChecked={onChecked}>
        <p className="whitespace-normal overflow-y-auto break-words scrollbar">
          {content}
        </p>
        <span className="text-xs text-gray-400">
          Create at: {convertToAsiaShanghaiTime(timestamp)}
        </span>
      </CheckBox>
      <DelBtn onDelete={onDelete} />
    </li>
  )
}

TodoItem.propTypes = {
  timestamp: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  isFinish: PropTypes.bool.isRequired,
  onChecked: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

/**
 * convert timestamp to asia/shanghai time
 *
 * @param {number} timestamp
 * @returns {string}
 */
function convertToAsiaShanghaiTime(timestamp) {
  const options = {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }
  return new Date(timestamp).toLocaleString('zh-CN', options)
}

export default TodoItem
