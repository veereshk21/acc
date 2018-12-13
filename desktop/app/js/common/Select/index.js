
import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/lib/immutable';
import { renderTextField } from '../TextField/index';
// import '../../assets/css/modules/mSelect.css';
import './../../../css/modules/mSelect.scss';
import './../../../css/states/states.scss';

// import '../../assets/css/states/states.css';


const CLASS_NAME = 'mSelect';

const MSelect = (props) => {
  const {
    id, label, className, children, borderStyle, required, labelStyle, labelClassName, marginTopValue, ...rest
  } = props;
  const WRAPPER_CLASS_NAME = `${(borderStyle ? 'mSelectWrapper borderStyle' : 'mSelectWrapper')}`;
  const classNames = !className ? CLASS_NAME : ` ${CLASS_NAME} ${className}`;
  const styles = {
    heightZero: {
      height: '0px',
      lineHeight: '0px',
      width: '100%',
      position: 'absolute',
      bottom: '2px',
      left: '0',
    },
    hidden: {
      display: 'none',
      visibility: 'hidden',
    },
  };
  const marginValue = marginTopValue || 28;
  const wrapperStyle = label ? { marginTop: marginValue } : {};
  const LABEL_CLASSNAMES = `positionAbsolute fontSize_3 bold ${!borderStyle ? 'is-visuallyHidden' : ''}`;
  return (
    <div className={WRAPPER_CLASS_NAME} style={wrapperStyle}>
      {label &&
        <label
          htmlFor={id}
          className={LABEL_CLASSNAMES + labelClassName}
          style={labelStyle}
        >
          {label}{required && <span aria-hidden="true">*</span>}
        </label>
      }
      <Field
        component="select"
        className={classNames}
        id={id}
        aria-required={required}
        {...rest}
      >
        {children}
      </Field>
      <span aria-hidden="true" className="dropdownChevron" />
      <Field
        name={id}
        id={id + 'Input'}
        component={renderTextField}
        type="hidden"
        aria-hidden="true"
        style={styles.heightZero}
        floatingLabelStyle={styles.hidden}
        disabled={rest.disabled}
      />
    </div>
  );
};

MSelect.defaultProps = {
  className: '',
  children: [],
  borderStyle: false,
  labelStyle: {},
  required: false,
};
MSelect.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
  ]),
  borderStyle: PropTypes.bool,
  labelStyle: PropTypes.object,
  required: PropTypes.bool,
  labelTextStyle: PropTypes.number,
  marginTopValue: PropTypes.number,
  labelClassName: PropTypes.string,
};
export default MSelect;
