import React from 'react';
import PropTypes from 'prop-types';

const RenderDropdown = ({ input, ...custom }) => {
  const { options, ...rest } = custom;
  return (
    <div className="selectpicker">
      <select {...input} {...rest}>
        {options.map((optionLabel, id) => (
          <option
            key={id}
            value={optionLabel.value}
          >{optionLabel.label}</option>
        ))}
      </select>
    </div>
  );
};

RenderDropdown.propTypes = {
  input: PropTypes.any,
  label: PropTypes.any,
  type: PropTypes.any,
  meta: PropTypes.object,
};

export default RenderDropdown;
