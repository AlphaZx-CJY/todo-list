import PropTypes from 'prop-types'

/**
 * @typedef {object} InputAreaProps
 * @property {string} value
 * @property {function} onValueChanged
 * @property {function} onSubmit
 */

/**
 * InputArea Component
 *
 * @param {InputAreaProps} props
 * @returns
 */
const InputArea = ({ value, onValueChanged, onSubmit }) => {
  const handleClick = (e) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <div className="md:min-w-128 md:self-center self-stretch mx-4 border border-slate-800 rounded-lg flex overflow-hidden shrink-0">
      <input
        className="grow p-2 outline-none font-mono m-2"
        value={value}
        onChange={(e) => onValueChanged(e.target.value)}
        placeholder="Enter TODO ..."
      />
      <button
        className="py-2 px-4 bg-blue-500 text-white font-mono cursor-pointer hover:bg-blue-600 transition duration-150 disabled:bg-gray-400 disabled:cursor-not-allowed"
        onClick={handleClick}
        disabled={!value}
      >
        Submit
      </button>
    </div>
  )
}

InputArea.propTypes = {
  value: PropTypes.string.isRequired,
  onValueChanged: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default InputArea
