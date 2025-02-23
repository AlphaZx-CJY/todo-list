import PropTypes from 'prop-types'

/**
 * @typedef {object} SloganProps
 * @property {string} content
 */

/**
 * Slogan Component
 *
 * @param {SloganProps} props
 * @returns
 */
const Slogan = ({ content }) => {
  return (
    <h1 className="w-full p-6 text-4xl text-center bg-amber-50 font-mono">
      {content}
    </h1>
  )
}

Slogan.propTypes = {
  content: PropTypes.string.isRequired,
}

export default Slogan
