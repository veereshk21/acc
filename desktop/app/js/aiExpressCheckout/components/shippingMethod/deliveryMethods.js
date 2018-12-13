import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import RadioButton from '../../../common/RadioButton';
import Button from '../../../common/Button/Button';
import MSelect from '../../../common/Select';

class ShippingMethod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shippingType: props.selectedShippingMethod,
      sddDropdownVisible: (props.selectedShippingMethod ? props.selectedShippingMethod.sddAvailableWindows : null),
      selectedWindow: props.selectedDeliveryWindow,
    };
  }

  componentDidUpdate(prevProps) {
    const { selectedShippingMethod, selectedShippingRadio } = this.props;
    if (prevProps.selectedShippingRadio !== selectedShippingRadio && (prevProps.selectedShippingRadio || !selectedShippingMethod)) {
      if (selectedShippingRadio === 'SDD_SAMEDAY') {
        this.showSddDropdown();
      } else {
        this.hideSddDropdown();
        // this.submitShippingInfo();
      }
    }
  }

  showSddDropdown = () => {
    this.setState({ sddDropdownVisible: true });
  }

  hideSddDropdown = () => {
    this.setState({ sddDropdownVisible: false });
  }

  changeShipping = (e) => {
    if (e.target.value !== 'title') {
      this.setState({ selectedWindow: e.target.value });
    }
  }

  renderOptions = () => {
    const { shippingInfo } = this.props;
    const renderedOptions = shippingInfo.shippingTypesInfo.map((option, index) => {
      const radioName = `shippingRadio${index}`;
      return (!option.ispuOption &&
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
    const { cqContent, shippingInfo, poboMessage, selectedShippingRadio, selectedDeliveryWindow } = this.props;
    const sddJSON = shippingInfo.shippingTypesInfo.filter((option) => option.shippingOptionId === 'SDD_SAMEDAY');
    const availWindows = sddJSON && sddJSON.length === 1 ? sddJSON[0] : sddJSON;
    const updateDisabled = !(selectedShippingRadio === 'SDD_SAMEDAY' ? selectedDeliveryWindow && selectedDeliveryWindow !== 'title' && selectedDeliveryWindow !== '' : selectedShippingRadio);

    return (
      <div style={{ width: 600 }}>
        {/* Shipping Method Selection */}
        <h3 className="fontSize_5 is-VisuallyHidden">Delivery options</h3>

        <div className="margin20 noSideMargin">
          <Row>
            <Col xs={5}>
              <p className="bold fontSize_4">
                {cqContent.label.DT_OD_CHECKOUT_SHIPPING_METHOD_HEADER_SHIPPING_OPTION}
              </p>
            </Col>
            <Col xs={3}>
              <p className="bold fontSize_4">
                {cqContent.label.DT_OD_CHECKOUT_SHIPPING_METHOD_HEADER_PRICE}
              </p>
            </Col>
            <Col xs={4}>
              <p className="bold fontSize_4">
                {cqContent.label.DT_OD_CHECKOUT_SHIPPING_METHOD_HEADER_DELIVERY_ESTIMATE}
              </p>
            </Col>
          </Row>
        </div>
        <fieldset className="noMargin noPad" style={{ border: 'none' }}>
          <legend className="is-visuallyHidden">Delivery options</legend>
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
              <option key="-1" value="title">Pick delivery time</option>
              {availWindows.sddAvailableWindows.map((option, index) => (
                <option key={index} value={option.id} >{option.formattedWindow}</option>
              ))}
            </MSelect>
          </div>
        }
        {/* PO/BO Message */}
        {poboMessage && selectedShippingRadio !== 'ISPU' &&
          <p className="margin36 onlyTopMargin">{poboMessage}</p>
        }
        <Button
          className="margin20 noSideMargin button secondary large"
          onClick={this.props.submitShippingInfo}
          disable={`${updateDisabled}`}
        >
          Confirm
        </Button>
        {/* Shipping Method Disclaimer */}
        <div className="margin20 noSideMargin" dangerouslySetInnerHTML={{ __html: cqContent.html.DT_OD_CHECKOUT_SHIPPING_METHOD_DISCLAIMER }} />
      </div>
    );
  }
}

ShippingMethod.propTypes = {
  cqContent: PropTypes.object,
  shippingInfo: PropTypes.object,
  selectedShippingMethod: PropTypes.object,
  selectedShippingRadio: PropTypes.string,
  submitShippingInfo: PropTypes.func,
  selectedDeliveryWindow: PropTypes.string,
  poboMessage: PropTypes.string,
};

export default ShippingMethod;
