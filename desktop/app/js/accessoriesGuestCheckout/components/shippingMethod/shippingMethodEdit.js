import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { reduxForm } from 'redux-form/immutable';
import Button from '../../../common/Button/Button';
import { EDIT_STATE } from '../../constants';
import RadioButton from '../../../common/RadioButton/index';
import MSelect from '../../../common/Select/index';

const validate = (values, props) => {
  const errors = {};
  const shippingRadio = values.get('shippingRadio');
  const availWindows = values.get('availWindows');

  if (!shippingRadio) {
    errors.shippingRadio = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (shippingRadio === 'SDD_SAMEDAY' && availWindows && availWindows !== 'title' && availWindows !== '') {
    errors.availWindows = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  }
  return errors;
};

class ShippingMethod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shippingType: props.selectedShippingMethod,
      sddDropdownVisible: (props.selectedShippingMethod ? props.selectedShippingMethod.sddAvailableWindows : null),
      selectedWindow: props.selectedDeliveryWindow,
    };
  }

  onCancel = () => {
    this.props.updateEditState(EDIT_STATE.SHIPPING_METHOD, false);
  }

  componentWillReceiveProp(nextProps) {
    if (this.props.selectedShippingRadio !== nextProps.selectedShippingRadio && nextProps.selectedShippingRadio === 'SDD_SAMEDAY') {
      this.setState({ sddDropdownVisible: true });
    } else {
      this.setState({ sddDropdownVisible: false });
    }
  }

  submitShippingInfo = () => {
    const {
      shippingInfo, selectedShippingRadio, flow, standaloneAccessories, selectedDeliveryWindow,
    } = this.props;
    const param = {
      ...shippingInfo.addressInfo,
      shippingType: selectedShippingRadio,
      shippingAddressType: 'shipToMe',
      shipToType: (shippingInfo.addressInfo.businessName !== null) ? 'business' : 'residence',
      flow,
      showUpdatedAddress: true,
      standaloneAccessories,
      deliveryWindow: (selectedDeliveryWindow && selectedShippingRadio === 'SDD_SAMEDAY') ? selectedDeliveryWindow : null,
      addressOnly: false,
      shipOptionChangeOnly: true,
    };
    for (const prop in param) {
      if (param[prop] === null) {
        delete param[prop];
      }
    }
    this.props.updateShippingInfo(param);
  }

  renderOptions = () => {
    const { shippingInfo } = this.props;
    const renderedOptions = shippingInfo.shippingTypesInfo.map((option, index) => {
      const radioName = `shippingRadio${index}`;
      return (
        <Row key={index} className="pad6 noSidePad">
          <Col xs={5}>
            <RadioButton
              name="shippingRadio"
              id={radioName}
              value={option.shippingOptionId}
              containerClassName=" "
              labelClassName="displayInlineBlock onlyLeftPad pad12 verticalCenter width85 radioLabel"
              analyticstrack="shipping-shippingMethod-radio"
            >
              <p>{option.shippingDescription}</p>
            </RadioButton>
          </Col>
          <Col xs={3}>
            <p className="pad3 noSidePad">{parseInt(option.shippingCost, 10) > 0 ? `$${option.shippingCost}` : 'Free'}</p>
          </Col>
          <Col xs={4}>
            <p className="pad3 noSidePad">{option.estimatedDeliveryDateText}</p>
          </Col>
        </Row>
      );
    });
    return renderedOptions;
  }

  render() {
    const { cqContent, shippingInfo, poboMessage, valid, submitting, stepsCompleted } = this.props;
    const sddJSON = shippingInfo.shippingTypesInfo.filter((option) => option.shippingOptionId === 'SDD_SAMEDAY');
    const availWindows = sddJSON && sddJSON.length === 1 ? sddJSON[0] : sddJSON;
    return (
      <div>
        {/* Shipping Method Selection */}
        <div className="margin20 noSideMargin">
          <Row>
            <Col xs={5}>
              <p className="bold fontSize_5">
                {cqContent.label.DT_OD_CHECKOUT_SHIPPING_METHOD_HEADER_SHIPPING_OPTION}
              </p>
            </Col>
            <Col xs={3}>
              <p className="bold fontSize_5">
                {cqContent.label.DT_OD_CHECKOUT_SHIPPING_METHOD_HEADER_PRICE}
              </p>
            </Col>
            <Col xs={4}>
              <p className="bold fontSize_5">
                {cqContent.label.DT_OD_CHECKOUT_SHIPPING_METHOD_HEADER_DELIVERY_ESTIMATE}
              </p>
            </Col>
          </Row>
        </div>
        <fieldset className="noMargin noPad" style={{ border: 'none' }}>
          <legend className="is-visuallyHidden">Shipping Methods</legend>
          {this.renderOptions()}
        </fieldset>

        {this.state.sddDropdownVisible && sddJSON.length === 1 && availWindows.sddAvailableWindows &&
          <div className="margin45 onlyTopMargin width60">
            <MSelect
              name="availWindows"
              id="availWindows"
              onChange={this.changeShipping.bind(this)}
              borderStyle
              label={'Choose a delivery window'}
              labelClassName="bold fontSize_5 color_00"
              labelStyle={{ color: '#000000', fontSize: '16px' }}
              value={this.state.selectedWindow}
            >
              <option key="-1" value="title">{cqContent.label.DT_OD_CHECKOUT_SDD_PICK_DELIVERY_TIME}</option>
              {availWindows.sddAvailableWindows.map((option, index) => (
                <option key={index} value={option.id} >{option.formattedWindow}</option>
              ))}
            </MSelect>
          </div>
        }
        {/* PO/BO Message */}
        {poboMessage &&
          <p className="margin36 onlyTopMargin">{poboMessage}</p>
        }
        {/* Shipping Method Disclaimer */}
        <hr className="onlyTopBorder border_black margin36 noSideMargin" />
        <div className="margin20 noSideMargin" dangerouslySetInnerHTML={{ __html: cqContent.html.DT_OD_CHECKOUT_SHIPPING_METHOD_DISCLAIMER }} />
        <div className="width100 margin24 onlyTopMargin clearfix border_grayThree onlyTopBorder pad24 onlyTopPad">
          {stepsCompleted.deliveryInfo &&
            <button
              className="fontSize_3 link background_transparent displayInlineBlock margin15 borderSize_0"
              onClick={this.onCancel}
              analyticstrack="shipping-shippingMethod-cancel-CTA"
            >
              {cqContent.label.DT_OD_CHECKOUT_PAYMENT_CANCEL}
            </button>
          }
          <Button
            className="primary button large"
            type="submit"
            disabled={!valid || submitting}
            onClick={this.submitShippingInfo}
            analyticstrack="shipping-shippingMethod-update-CTA"
          >
            {cqContent.label.DT_OD_CHECKOUT_SHIPPING_METHOD_BUTTON_TEXT}
          </Button>

        </div>
      </div>
    );
  }
}

ShippingMethod.propTypes = {
  cqContent: PropTypes.object,
  shippingInfo: PropTypes.object,
  selectedShippingMethod: PropTypes.object,
  selectedShippingRadio: PropTypes.string,
  flow: PropTypes.string,
  standaloneAccessories: PropTypes.bool,
  updateShippingInfo: PropTypes.func,
  selectedDeliveryWindow: PropTypes.string,
  poboMessage: PropTypes.string,
  valid: PropTypes.bool,
  submitting: PropTypes.bool,
  stepsCompleted: PropTypes.object,
  updateEditState: PropTypes.func,
};
// export default ShippingMethod;
export default reduxForm({
  form: 'chooseShippingMethod',
  validate,
})(ShippingMethod);
