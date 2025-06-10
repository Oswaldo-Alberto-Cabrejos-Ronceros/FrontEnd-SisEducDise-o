import './NavUser.css'
import PropTypes from "prop-types";

function NavUser({ nombre, imagen}) {
  return (
    <div className='NavUserContainer'> 
    <p className='PLg'>{nombre}</p>
    <img className='ImgUser' src={imagen} alt="Imagen de Usuario" />
        
    </div>
  )
}


NavUser.propTypes={
  nombre:PropTypes.string.isRequired,
  imagen:PropTypes.string.isRequired
}

export default NavUser