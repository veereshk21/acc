import React from 'react';
import PropTypes from 'prop-types';

const inputField = ({
  input: { disabled, ...input }, meta, ...rest
}) => {
  const errorState = (!meta.active && meta.touched && meta.error);
  return (
    <input
      {...input}
      {...rest}
      type="checkbox"
      disabled={disabled}
      className={`checkbox ${disabled ? 'disabled' : ''} ${errorState ? 'error' : ''}`}
    />
  );
};

inputField.propTypes = {
  input: PropTypes.object,
  disabled: PropTypes.bool,
  meta: PropTypes.object,
};

export default inputField;
