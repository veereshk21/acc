import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { Field } from 'redux-form/immutable';

import { renderTextField } from '../../../common/TextField/';
import MSelect from '../../../common/Select/index';
import Checkbox from '../../../common/Checkbox/index';

const ShippingAddressForm = (props) => (
  <form
    id="field"
    className="margin0"
  >
    <Row className="noSideMargin pad24 onlySidePad">
      <Col xs={12} >
        <div>
          <Checkbox
            className="checkbox"
            name="shipToType"
            id="shipToType"
            component="input"
            type="checkbox"
            checkboxClass="displayInlineBlock pad6 noLeftPad"
            labelClass="displayInlineBlock verticalCenter leftAlign pad6 "
            aria-labelledby="labelId"
            tabIndex="-1"
            aria-hidden
            checked={props.isBuisnessAddress}
            onClick={props.handleBusinessAddressChange}
            analyticstrack="business-address"
          >
            <p id="labelId" >
              {props.cq.label.OD_CHECKOUT_DELIVERY_ADDRESS_BUSINESS_ADDRESS_LABEL_TEXT}
            </p>
          </Checkbox>
        </div>
      </Col>
    </Row>

    {props.isBuisnessAddress &&
      <Row className="noSideMargin pad24 onlySidePad">
        <Col xs={12} className="margin6 noSideMargin">
          <Field
            component={renderTextField}
            id="businessName"
            name="businessName"
            label={props.cq.label.OD_CHECKOUT_DELIVERY_ADDRESS_COMPANY_NAME_TEXT}
          />
        </Col>
      </Row>
    }
    <Row className="noSideMargin pad24 onlySidePad">
      <Col xs={12} className="margin6 noSideMargin">
        <Field
          component={renderTextField}
          type="text"
          id="firstName"
          name="firstName"
          label={props.cq.label.OD_CHECKOUT_DELIVERY_ADDRESS_FIRST_NAME_TEXT}
          required
        />
      </Col>
    </Row>
    <Row className="noSideMargin pad24 onlySidePad">
      <Col xs={12} className="margin6 noSideMargin">
        <Field
          component={renderTextField}
          type="text"
          id="lastName"
          name="lastName"
          label={props.cq.label.OD_CHECKOUT_DELIVERY_ADDRESS_LAST_NAME_TEXT}
          required
        />
      </Col>
    </Row>
    <Row className="noSideMargin pad24 onlySidePad">
      <Col xs={12} className="margin6 noSideMargin">
        <Field
          component={renderTextField}
          type="text"
          id="address1"
          name="address1"
          label={props.cq.label.OD_CHECKOUT_DELIVERY_ADDRESS_SHIPPING_ADDRESS_PRIMARY_TEXT}
          required
          placeholder=""
          placesAutocomplete
          placesAutocompleteOnSelect={props.autocompleteOnSelect}
          googleMapAPI={props.googleMapAPI}
        />
      </Col>
    </Row>
    <Row className="noSideMargin pad24 onlySidePad">
      <Col xs={12} className="margin6 noSideMargin">
        <Field
          component={renderTextField}
          type="text"
          id="address2"
          name="address2"
          label={props.cq.label.OD_CHECKOUT_DELIVERY_ADDRESS_SHIPPING_ADDRESS_SECONDARY_TEXT}
        />
      </Col>
    </Row>
    <Row className="noSideMargin pad24 onlySidePad">
      <Col xs={12} className="margin6 noSideMargin">
        <Field
          component={renderTextField}
          type="text"
          id="city"
          name="city"
          label={props.cq.label.OD_CHECKOUT_DELIVERY_ADDRESS_CITY_TEXT}
          required
        />
      </Col>
    </Row>
    <Row className="noSideMargin pad24 onlySidePad">
      <Col xs={12} className="margin6 noSideMargin">
        <Row>
          <Col xs={6}>
            <MSelect
              label={props.cq.label.OD_CHECKOUT_DELIVERY_ADDRESS_STATE_TEXT}
              name="state"
              aria-label={props.cq.label.OD_CHECKOUT_DELIVERY_ADDRESS_STATE_TEXT}
              id="state"
              borderStyle
              required
              analyticstrack="choose-shipping-addr-state"
            >
              {props.states.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </MSelect>
          </Col>
          <Col xs={6}>
            <Field
              component={renderTextField}
              type="text"
              id="zipcode"
              name="zipcode"
              label={props.cq.label.OD_CHECKOUT_DELIVERY_ADDRESS_ZIPCODE_TEXT}
              required
              onBlur={(evt) => {
                props.fetchZipCodeInfo(evt.target.value, props.form);
              }}
            />
          </Col>
        </Row>
      </Col>
    </Row>
    <Row className="noSideMargin pad24 onlySidePad">
      <Col xs={12} className="margin6 noSideMargin">
        <Field
          component={renderTextField}
          type="text"
          id="email"
          name="email"
          label={props.cq.label.OD_CHECKOUT_DELIVERY_ADDRESS_EMAIL_TEXT}
          required
        />
      </Col>
    </Row>
    <Row className="noSideMargin pad24 onlySidePad">
      <Col xs={12} className="margin6 noSideMargin">
        <Field
          component={renderTextField}
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          maxLength="10"
          label={props.cq.label.OD_CHECKOUT_DELIVERY_ADDRESS_PHONE_NUMBER_TEXT}
          required
        />
      </Col>
    </Row>
  </form>
);

ShippingAddressForm.propTypes = {
  handleBusinessAddressChange: PropTypes.func,
  isBuisnessAddress: PropTypes.bool,
  cq: PropTypes.object,
  states: PropTypes.array,
  autocompleteOnSelect: PropTypes.func,
  googleMapAPI: PropTypes.object,
  fetchZipCodeInfo: PropTypes.func,
  form: PropTypes.string,
};

ShippingAddressForm.defaultProps = {
  isBuisnessAddress: false,
};

export default ShippingAddressForm;
