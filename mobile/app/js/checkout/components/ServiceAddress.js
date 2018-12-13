/**
 * Created by mambig on 2/16/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { Grid, Row, Col } from 'react-flexbox-grid';

import Title from '../../common/Title/Title';
import Loader from '../../common/Loader/Loader';
import BackButton from '../../common/BackButton/BackButton';
import HorizontalRule from '../../common/HorizontalRule';
import { renderTextField } from '../../common/TextField';
import MSelect from './../../common/Select/';

const validate = (values, props) => {
  const errors = {};

  const address1 = values.get('address1');
  const city = values.get('city');
  const state = values.get('state');
  const zipcode = values.get('zipCode');

  if (!address1) {
    errors.address1 = props.cqContent.label.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!/^[a-zA-Z0-9\-\. ',#&;/\s]+$/i.test(address1)) { // eslint-disable-line
    errors.address1 = props.cqContent.error.OD_CHECKOUT_SERVICE_INVALID_ADDRESS_ERROR;
  }
  if (!city) {
    errors.city = props.cqContent.label.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!/^[a-zA-Z\- ',\s]+$/i.test(city)) {
    errors.city = props.cqContent.error.OD_CHECKOUT_SERVICE_INVALID_CITY_ERROR;
  }
  if (!zipcode) {
    errors.zipCode = props.cqContent.label.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!/^\d{5}-\d{4}$|^\d{5}$/i.test(zipcode)) {
    errors.zipCode = props.cqContent.error.OD_CHECKOUT_SERVICE_INVALID_ZIPCODE_ERROR;
  }

  if (!state) {
    errors.state = props.cqContent.label.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  }

  return errors;
};

class ServiceAddress extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    const {
      cqContent, states, handleSubmit, valid, submitting, currentDevice, isFetching, updateServiceAddress,
    } = this.props;
    return (
      <Grid className="pad12 noSidePad">
        {isFetching === true && <Loader />}
        <Row className="noSideMargin">
          <Col xs={12} className="noSidePad">
            <BackButton to="/" >{cqContent.label.OD_CHECKOUT_BACK_TEXT}</BackButton>
          </Col>
        </Row>
        <Row className="noSideMargin pad24">
          <Col xs={12}>
            <Row className="noSideMargin ">
              <Col xs={12} className="noSidePad">
                <Title className="h1">{cqContent.label.OD_CHECKOUT_SERVICE_ADDRESS_TITLE_TEXT}</Title>
                <p className="color_six_gray fontSize_1_3" >
                  <span dangerouslySetInnerHTML={{ __html: cqContent.label.OD_CHECKOUT_SERVICE_ADDRESS_DESCRIPTION_TEXT + '&nbsp;' + currentDevice.deviceName + '.' }} />
                  <span className="fontDisplayMedium margin6 onlyLeftMargin">{currentDevice.npaNxxnumber}</span>
                </p>
                <HorizontalRule />
              </Col>
            </Row>
            <form className="clearfix">
              <Row className="noSideMargin onlySidePad">
                <Col xs={12} className="noSidePad pad12">
                  <Field
                    component={renderTextField}
                    type="text"
                    id="address1"
                    name="address1"
                    label={cqContent.label.OD_CHECKOUT_SERVICE_ADDRESS_TEXT}
                  />
                </Col>
                <Col xs={12} className="noSidePad pad12">
                  <Field
                    className="leftAlign width100 fontSize_4"
                    component={renderTextField}
                    type="text"
                    id="address2"
                    name="address2"
                    label={cqContent.label.OD_CHECKOUT_SERVICE_ADDRESS_SECONDARY_TEXT}
                  />
                </Col>
                <Col xs={12} className="noSidePad pad12">
                  <Field
                    className="leftAlign width100 fontSize_4"
                    component={renderTextField}
                    type="text"
                    id="city"
                    name="city"
                    label={cqContent.label.OD_CHECKOUT_SERVICE_CITY_TEXT}
                  />
                </Col>
                <Col xs={12} className="noSidePad pad12">
                  <Row>
                    <Col xs={6}>
                      <MSelect
                        name="state"
                        id="state"
                        label={cqContent.label.OD_CHECKOUT_SERVICE_STATE_TEXT}
                        value="MD"
                        borderStyle
                        required
                        analyticstrack="choose-sevice-addr-state"
                      >
                        {states.map((optionLabel, id) => (<option key={id} value={optionLabel}>{optionLabel}</option>))}
                      </MSelect>
                    </Col>
                    <Col xs={6}>
                      <Field
                        className="leftAlign width100 fontSize_4"
                        component={renderTextField}
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        label={cqContent.label.OD_CHECKOUT_SERVICE_ZIPCODE_TEXT}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col xs={12} className="noSidePad pad24 textAlignCenter">
                  <button
                    className="primary button large"
                    type="submit"
                    disabled={!valid || submitting}
                    analyticstrack="update-service-address"
                    onClick={
                      handleSubmit((data) => {
                        const formData = data.toJS();
                        updateServiceAddress(Object.assign({}, formData, { deviceId: currentDevice.deviceId }), cqContent.error.OD_CHECKOUT_ADDRESS_UPDATE_FAILURE_TEXT);
                      })
                    }
                  >{cqContent.label.OD_CHECKOUT_SERVICE_ADDRESS_CTA_TEXT}
                  </button>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }
}

ServiceAddress.childContextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

ServiceAddress.propTypes = {
  cqContent: PropTypes.object,
  states: PropTypes.array,
  handleSubmit: PropTypes.func,
  valid: PropTypes.bool,
  submitting: PropTypes.bool,
  currentDevice: PropTypes.object,
  isFetching: PropTypes.bool,
  updateServiceAddress: PropTypes.func,
};
export default reduxForm({
  form: 'serviceAddressForm',
  validate,
})(ServiceAddress);
