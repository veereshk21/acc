import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hashHistory } from './../../store';
import Loader from '../../common/Loader/Loader';
import BackButton from '../../common/BackButton/BackButton';
import RadioButton from '../../common/RadioButton/';

class VendorShipping extends Component {
  constructor(props) {
    super(props);
    this.state = { shippingType: props.selectedShippingMethod };
  }
  handleOptionChange(changeEvent) {
    this.setState({ shippingType: changeEvent });
  }

  submitShippingInfo() {
    const { shippingType } = this.state;
    const { shippingInfo, giftCardFlow } = this.props;
    if (typeof shippingType.ispuOption !== 'undefined' && shippingType.ispuOption !== null && shippingType.ispuOption) {
      hashHistory.push('/ispu');
    } else {
      const param = {
        zipcode: shippingInfo.addressInfo.zipcode,
        firstName: shippingInfo.addressInfo.firstName,
        lastName: shippingInfo.addressInfo.lastName,
        address2: shippingInfo.addressInfo.address2,
        city: shippingInfo.addressInfo.city,
        address1: shippingInfo.addressInfo.address1,
        state: shippingInfo.addressInfo.state,
        emailAddress: shippingInfo.addressInfo.email,
        phoneNumber: shippingInfo.addressInfo.phoneNumber,
        shippingType: shippingType.shippingOptionId,
        shippingAddressType: 'shipToMe',
        shipToType: 'residence',
        flow: 'AAL',
        showUpdatedAddress: true,
        standaloneAccessories: false,
        vendorShippingOptions: {},
      };
      param.vendorShippingOptions[shippingType.shippingOptionId] = {
        shippingType: shippingType.shippingDescription,
        shippingCost: shippingType.shippingCost,
        shippingOptionId: shippingType.shippingOptionId,
        estimatedDeliveryDate: shippingType.estimatedDeliveryDate,
        twoDayShipping: true,
      };
      for (const prop in param) {
        if (param[prop] === null) {
          delete param[prop];
        }
      }
      if (shippingInfo.shippingTypesInfo.length > 1) {
        this.props.updateShippingInfo(param, giftCardFlow);
      } else {
        hashHistory.push('/');
      }
    }
  }

  renderOptions() {
    const { shippingInfo, cqContent } = this.props;

    const renderedOptions = shippingInfo.vendorShippingTypesInfo.map((option, index) => {
      const radioName = `contractradio${index}`;
      const radioBTNClass = (option.ispuOption === true && ((shippingInfo.contactInfo.activeSMSCapableMtnList === null) || (shippingInfo.contactInfo.activeSMSCapableMtnList.length === 0)));
      const radioLBLClass = radioBTNClass ? 'is-disabled' : '';
      const radioLBLsubClass = radioBTNClass ? 'pad6 onlyTopPad is-disabled' : 'pad6 onlyTopPad';
      return (

        <div
          className="pad36 noSidePad border_EB onlyBottomBorder verticalAlignMiddle floatLeft clearfix width90"
          key={index}
        >
          <RadioButton
            disabled={radioBTNClass}
            name="contractradio"
            id={radioName}
            value={option.shippingDescription}
            defaultChecked={option.addedShippingOptionId}
            onChange={this.handleOptionChange.bind(this, option)}
          >
            <div className={radioLBLClass}><strong>{Number(option.shippingCost) > 0 && '$' + option.shippingCost}&nbsp;{option.shippingDescription}</strong></div>
            <div className={radioLBLsubClass}>&nbsp;{option.description}</div>
          </RadioButton>
          { (option.ispuOption === true && ((shippingInfo.contactInfo.activeSMSCapableMtnList === null) || (shippingInfo.contactInfo.activeSMSCapableMtnList.length === 0))) && <div className="col span_5_of_5 normalText pad10 onlySidePad textAlignJustify"> {cqContent.error.OD_CHECKOUT_EMPTY_CONTACT_NUMBER_ERROR}</div> }
        </div>
      );
    });
    return renderedOptions;
  }

  render() {
    const {
      cqContent, dueToday, shippingMethodRequired, isFetching,
    } = this.props;
    return (
      <div className="pad12 onlyTopPad">
        {isFetching === true && <Loader />}
        {shippingMethodRequired === false && <BackButton to="/">{cqContent.label.OD_CHECKOUT_BACK_TEXT}</BackButton>}
        <div className="pad20">
          <div className=" clearfix">
            <h4 className="h2 textAlignCenter centerBlock">{cqContent.label.OD_CHECKOUT_DELIVERY_METHOD_TITLE_TEXT}</h4>
            <p className="textAlignCenter">
              <span className="bold">${dueToday}</span>&nbsp;
              <span>{cqContent.label.OD_CHECKOUT_DUE_TODAY_DESCRIPTION_TEXT}</span>
            </p>
            {this.renderOptions()}
            <div className="textAlignCenter margin36 noSideMargin width100 floatLeft">
              <button onClick={this.submitShippingInfo.bind(this)} className="button large">{cqContent.label.OD_CHECKOUT_DELIVERY_METHOD_BUTTON_TEXT}</button>
            </div>
          </div>
        </div>
      </div>

    );
  }
}


VendorShipping.propTypes = {
  selectedShippingMethod: PropTypes.object,
  shippingInfo: PropTypes.object,
  giftCardFlow: PropTypes.bool,
  updateShippingInfo: PropTypes.func,
  cqContent: PropTypes.object,
  dueToday: PropTypes.string,
  shippingMethodRequired: PropTypes.bool,
  isFetching: PropTypes.bool,
};

export default VendorShipping;
