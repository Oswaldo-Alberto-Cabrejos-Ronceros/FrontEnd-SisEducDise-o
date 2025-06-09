import './TextAreaComponent.css';
import PropTypes from 'prop-types';

function TextAreaComponent({ nombre, placeholder, icon, value, onChange }) {
  return (
    <div className='TextAreaComponentContainer'>
      <div className='IconTextAreaContainer'>
        {icon}
      </div>
      <textarea
        name={nombre}
        id={nombre}
        placeholder={placeholder}
        rows="3"
        cols="50"
        value={value}
        onChange={onChange}
      ></textarea>
    </div>
  );
}

// Validación de props
TextAreaComponent.propTypes = {
  nombre: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  icon: PropTypes.node,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TextAreaComponent;