import './ButtonSubtmit.css'
import PropTypes from "prop-types";

function ButtonSubtmit({nombre}) {
  return (
    <div className="BtnSubmitContainer">
    <button type="submit" className="BtnSubmitContent">
      <span className="PSm">{nombre}</span>
    </button>
  </div>
  )
}

ButtonSubtmit.propTypes={
  nombre:PropTypes.string.isRequired
}

export default ButtonSubtmit