import "./SelectComponent.css";
import PropTypes from "prop-types";

function SelectComponent({
  name,
  options,
  value,
  onChange,
  disabledOptions = [],
}) {
  return (
    <div className="SelectComponentContainer">
      <select name={name} id={name} value={value} onChange={onChange}>
        {options.map((option, index) => {
          const optionValue =
            typeof option === "object" ? option.value : option;
          const optionLabel =
            typeof option === "object" ? option.label : option;
          const isDisabled = disabledOptions[index] === true;

          return (
            <option key={optionValue} value={optionValue} disabled={isDisabled}>
              {optionLabel}
            </option>
          );
        })}
      </select>
    </div>
  );
}

SelectComponent.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.string | PropTypes.number,
  onChange: PropTypes.array,
  disabledOptions: PropTypes.array,
};

export default SelectComponent;
