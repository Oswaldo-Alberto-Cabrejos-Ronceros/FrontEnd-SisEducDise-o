import './NavUser.css'
import PropTypes from "prop-types";
import { Avatar } from '@chakra-ui/react';

function NavUser({ nombre}) {
  return (
    <div className='NavUserContainer'> 
    <p className='PSm'>{nombre}</p>
    <Avatar.Root variant='outline'>
        <Avatar.Fallback name={nombre}></Avatar.Fallback>
    </Avatar.Root>
    </div>
  )
}


NavUser.propTypes={
  nombre:PropTypes.string.isRequired,
}

export default NavUser