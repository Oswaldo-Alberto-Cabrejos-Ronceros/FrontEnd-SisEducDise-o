import './PrimaryButtonLarge.css'
import PropTypes from "prop-types";

function PrimaryButtonLarge({onClick, nombre}) {
  return (
    <div className='PrimaryButtonLargeContainer'>
        <button type='submit' className="BtnPrimaryLargeContent" onClick={onClick}><span className="PMd">{nombre}</span></button>
    </div>
  )
}

export default PrimaryButtonLarge

PrimaryButtonLarge.propTypes={
  onClick:PropTypes.func.isRequired,
  nombre:PropTypes.string.isRequired
}