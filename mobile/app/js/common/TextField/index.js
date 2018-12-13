import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ToolTip from '../ToolTip/index';
import { initAutoComplete } from '../Autocomplete/index';

const styles = {
  error: {
    bottom: '-6px',
    color: '#FFBC3D',
  },
  parentDiv: {
    width: '100%',
    float: 'left',
  },
  parentDivError: {
    width: '100%',
    float: 'left',
  },
  floatingLabel: {
    color: '#D8DADA',
    top: 0,
    minWidth: 85,
  },
  floatingLabelFocus: {
    color: '#D8DADA',
  },
  input: {
    marginTop: 0,
    border: '1px solid #D8DADA',
    borderBottom: 0,
    borderRadius: 0,
    paddingLeft: 6,
    paddingRight: 6,
  },
  underlineDefault: {
    bottom: '-2px',
    borderWidth: 2,
    borderColor: '#000000',
  },
  underlineValid: {
    bottom: '-2px',
    borderWidth: 2,
    borderColor: '#01AD3E',
  },
  underlineDisabled: {
    bottom: '-2px',
    borderWidth: 2,
    borderColor: '#D8DADA',
  },
  underlineFocus: {
    bottom: '-2px',
    borderColor: '#000000',
  },
};
export const renderTextField = ({
  input: { value, ...input }, label, required, meta, textFieldValue, tooltip, googleMapAPI, placesAutocomplete, placesAutocompleteOnSelect, ...rest
}) => {
  const errorState = (meta.touched || meta.autofill || (meta.invalid && meta.pristine && input.value)) && meta.error;
  const labelText = <span>{label}{required && <span aria-hidden="true">*</span>}</span>;

  if (placesAutocomplete) {
    initAutoComplete(googleMapAPI, rest.id, placesAutocompleteOnSelect);
  }
  return (
    <MuiThemeProvider muiTheme={getMuiTheme(baseTheme)}>
      <div className="positionRelative clearfix textField" style={errorState ? { marginBottom: 12 } : {}}>
        {label &&
          <label
            htmlFor={rest.id}
            className={`${tooltip ? 'displayInlineBlock' : 'displayBlock'} margin6 noSideMargin color_gray_six`}
          >
            {labelText}
          </label>
        }
        {tooltip &&
          <div className="displayInlineBlock margin6 noSideMargin verticalBottom">
            <ToolTip
              className="margin3 onlyLeftMargin displayInlineBlock"
              ariaLabel={`${label} tooltip`}
              text={tooltip}
              noRenderHTML
            />
          </div>
        }

        <TextField
          inputStyle={{
            ...styles.input,
            ...rest.inputStyle,
          }}
          floatingLabelFixed
          floatingLabelStyle={{ ...styles.floatingLabel, ...rest.floatingLabelStyle }}
          floatingLabelFocusStyle={styles.floatingLabelFocus}
          underlineStyle={styles.underlineDefault}
          underlineFocusStyle={(meta.visited && meta.valid ? styles.underlineValid : styles.underlineDefault)}
          style={(meta.touched && meta.error ? { ...styles.parentDivError, ...rest.style } : { ...styles.parentDiv, ...rest.style })}
          errorStyle={{ ...styles.error, ...rest.errorStyle }}
          errorText={!meta.active && meta.touched && meta.error}
          aria-required={required}
          value={(typeof textFieldValue === 'string') ? textFieldValue : value}
          {...input}
          {...rest}
          defaultValue={rest.defaultValue}

        />
      </div>
    </MuiThemeProvider>
  );
};
renderTextField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,
  textFieldValue: PropTypes.string,
  required: PropTypes.bool,
  tooltip: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  placesAutocomplete: PropTypes.bool,
  placesAutocompleteOnSelect: PropTypes.func,
  googleMapAPI: PropTypes.object,
};
