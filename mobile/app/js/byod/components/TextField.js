import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import styles from '../../common/Constants/FormStyles';

const RenderField = ({ input, label, type, meta: { active, touched, error }, ...custom }) => { // eslint-disable-line
  const displayLabel = (typeof error === 'string' && error.length > 0) ? 'none' : 'block';
  return (<TextField
    hintText={label}
    underlineFocusStyle={styles.underlineFocusStyle}
    floatingLabelFocusStyle={Object.assign({}, styles.floatingLabelFocusStyle, { display: 'none' })}
    floatingLabelShrinkStyle={Object.assign({}, { transform: 'scale(0.8) translate(0px, 36px)' }, { display: displayLabel })}
    style={{ width: '100%', float: 'left' }}
    floatingLabelText={label}
    errorStyle={styles.errorStyle}
    errorText={!active && touched && error}
    {...input}
    {...custom}
    defaultValue={custom.defaultValue}
  />);
};
RenderField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,
  textFieldValue: PropTypes.any,
};

export default RenderField;
