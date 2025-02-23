import PropTypes from 'prop-types'
import deleteSvg from '../assets/delete.svg'

/**
 * @typedef {object} DelBtnProps
 * @property {function} onDelete
 */

/**
 * Delete Button Component
 * 
 * @param {DelBtnProps} props 
 * @returns 
 */
const DelBtn = ({ onDelete }) => {
  return (
    <div className="p-3 rounded-full cursor-pointer border border-transparent transition-all hover:bg-slate-100">
      <img
        className="w-6 h-6"
        src={deleteSvg}
        alt="delete item"
        onClick={() => onDelete()}
      />
    </div>
  )
}

DelBtn.propTypes = {
  onDelete: PropTypes.func.isRequired,
}

export default DelBtn
