
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { Col, Row } from 'react-flexbox-grid';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// import Loader from '../../common/Loader/Loader';
import MSelect from '../../common/Select/index';
import { renderTextField } from '../../common/TextField/';


const validate = (values, props) => {
  const errors = {};

  const address1 = values.get('address1');
  const city = values.get('city');
  const state = values.get('state');
  const zipcode = values.get('zipcode');
  const firstName = values.get('firstName');
  const lastName = values.get('lastName');

  if (!firstName) {
    errors.firstName = props.cqContent.error.DT_OD_ENE_FIELD_REQUIRED_TEXT;
  } else if (!/^[a-zA-Z\- ',\s]+$/i.test(firstName)) {
    errors.firstName = props.cqContent.error.DT_OD_ENE_ERROR_FIRSTNAME;
  }
  if (!lastName) {
    errors.lastName = props.cqContent.error.DT_OD_ENE_FIELD_REQUIRED_TEXT;
  } else if (!/^[a-zA-Z\- ',\s]+$/i.test(lastName)) {
    errors.lastName = props.cqContent.error.DT_OD_ENE_ERROR_LASTNAME;
  }
  if (!address1) {
    errors.address1 = props.cqContent.error.DT_OD_ENE_FIELD_REQUIRED_TEXT;
  } else if (!/^[a-zA-Z0-9\-\. ',#&;/\s]+$/i.test(address1)) { // eslint-disable-line
    errors.address1 = props.cqContent.error.DT_OD_ENE_ERROR_ADDRESS1;
  }
  if (!city) {
    errors.city = props.cqContent.error.DT_OD_ENE_FIELD_REQUIRED_TEXT;
  } else if (!/^[a-zA-Z\- ',\s]+$/i.test(city)) {
    errors.city = props.cqContent.error.DT_OD_ENE_ERROR_CITY;
  }
  if (!zipcode) {
    errors.zipcode = props.cqContent.error.DT_OD_ENE_FIELD_REQUIRED_TEXT;
  } else if (!/^\d{5}-\d{4}$|^\d{5}$/i.test(zipcode)) {
    errors.zipcode = props.cqContent.error.DT_OD_ENE_ERROR_ZIPCODE;
  }

  if (!state || state === props.cqContent.label.DT_OD_ENE_STATE_OPTION) {
    errors.state = props.cqContent.label.DT_OD_ENE_FIELD_REQUIRED_TEXT;
  }

  return errors;
};

class EmergencyAddressInfo extends Component {
  getChildContext() {
    const muitheme = getMuiTheme(baseTheme);
    // muitheme.renderTextField.borderColor = 'rgba(0, 0, 0, 0.298039)';
    return { muiTheme: muitheme };
    // return { muiTheme: getMuiTheme(baseTheme) };
  }

  componentWillReceiveProps(nextProps) {
    const { valid, formValues } = nextProps;
    this.props.toggleSubmit({ isE911Valid: valid, e911FormData: formValues });
  }


  render() {
    const { cqContent, handleSubmit, submitting, isFetching, valid, emergencyContactInfo } = this.props; // eslint-disable-line

    return (
      <section className="margin50 onlyTopMargin">
        <h2 className="fontSize_5  margin15 onlyTopMargin">{cqContent.label.DT_OD_ENE_PAGE_TITLE}</h2>
        <section className="background_gray_one pad15 margin10 onlyTopMargin">
          <p className="">{cqContent.label.DT_OD_ENE_PAGE_SUB_TITLE}</p>
          <p className="pad10 onlyTopPad" dangerouslySetInnerHTML={{ __html: cqContent.label.DT_OD_ENE_FIELD_REQUIRED }} />
          {emergencyContactInfo.emergencyAddressError && <div className="margin10 color_white onlyTopMargin pad30 background_black">
            <span className="notification_iconwrap">
              <div className="floatRight">
                <div role="button" tabIndex="0" aria-label="Close" className="notification_close cursorPointer bold" onClick={this.closeErrorModal.bind(this)} />
              </div>
              <div>
                <span className="floatLeft block notification_icon m-warning fontTextMedium" />
                <span className="floatLeft block pad20 onlySidePad bold margin10 onlyTopMargin" dangerouslySetInnerHTML={{ __html: emergencyContactInfo.emergencyAddressError }} />
              </div>
            </span>
          </div>}
          <section className="margin10  onlyBottomMargin noShare_e911Form">
            <Row className=" margin15 noSideMargin">
              <Col md={6} xs={6} className="">
                <Field
                  className="leftAlign width100 fontSize_4 "
                  onFocus={this.focus}
                  component={renderTextField}
                  type="text"
                  id="address1"
                  name="address1"
                  label={cqContent.label.DT_OD_ENE_ADDRESS1}
                />
              </Col>
              <Col md={6} xs={6} className="">
                <div className="clearfix">
                  <Field
                    className="leftAlign width100 fontSize_4 "
                    component={renderTextField}
                    type="text"
                    id="address2"
                    name="address2"
                    label={cqContent.label.DT_OD_ENE_ADDRESS2}
                  />
                </div>
              </Col>
            </Row>

            <Row className="clearfix ">
              <Col md={3} xs={3} className="">
                <Field
                  className="leftAlign width100 fontSize_4 "
                  onFocus={this.focus}
                  component={renderTextField}
                  type="text"
                  id="zipcode"
                  name="zipcode"
                  label={cqContent.label.DT_OD_ENE_ZIPCODE}
                />
              </Col>
              <Col md={3} xs={3} className="e911StateWrap">
                <MSelect
                  name="state"
                  id="state"
                  className="fontSize_4 color_000"
                  label={cqContent.label.DT_OD_ENE_STATE}
                  style={{ height: '50px', fontSize: '12px' }}
                  borderStyle
                >
                  <option value="" key="disabled" dangerouslySetInnerHTML={{ __html: cqContent.label.DT_OD_ENE_STATE_OPTION }} selected disabled />
                  {
                    emergencyContactInfo.states && emergencyContactInfo.states.map((stateName) => <option key={stateName} value={stateName}> {stateName} </option>)
                  }
                </MSelect>
              </Col>
              <Col md={6} xs={6} className="">
                <Field
                  className="leftAlign width100 fontSize_4 "
                  onFocus={this.focus}
                  component={renderTextField}
                  type="text"
                  id="city"
                  name="city"
                  label={cqContent.label.DT_OD_ENE_CITY}
                />
              </Col>

            </Row>

          </section>
        </section>
      </section>
    );
  }
}

EmergencyAddressInfo.childContextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

EmergencyAddressInfo.propTypes = {
  toggleSubmit: PropTypes.func,
};

export default reduxForm({
  form: 'addressInfoForm',
  validate,
})(EmergencyAddressInfo);
