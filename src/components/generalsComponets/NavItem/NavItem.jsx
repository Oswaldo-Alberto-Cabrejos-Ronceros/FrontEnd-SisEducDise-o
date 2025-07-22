import { NavLink } from "react-router-dom";
import "./NavItem.css";
import PropTypes from "prop-types";

function NavItem({ id, titulo, icon, to, onClick,horizontal }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `${horizontal?'NavItemContainer NavItemContainerHorizontal':'NavItemContainer'} ${isActive ? "active" : ""}`
      }
      id={id}
    >
      <div className="IconContainer">{icon}</div>
      {titulo && <p className="PMd">{titulo}</p>}
    </NavLink>
  );
}

NavItem.propTypes = {
  id: PropTypes.number.isRequired,
  titulo: PropTypes.string,
  icon: PropTypes.node.isRequired,
  to: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  horizontal:PropTypes.bool
};

export default NavItem;
