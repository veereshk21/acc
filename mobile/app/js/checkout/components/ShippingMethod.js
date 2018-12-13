/* eslint-disable prefer-destructuring */
import React, { Component } from 'react';
import { reduxForm } from 'redux-form/immutable';
import { Grid, Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import { hashHistory } from './../../store';
import Loader from '../../common/Loader/Loader';
import RadioButton from '../../common/RadioButton/';
import Title from '../../common/Title/Title';
import HorizontalRule from '../../common/HorizontalRule';
import BackButton from '../../common/BackButton/BackButton';

import MSelect from '../../common/Select/index';

class ShippingMethod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shippingType: props.selectedShippingMethod,
      disableBtn: (typeof props.selectedShippingMethod === 'undefined'),
      deliveryWindow: props.initialDeliveryWindow.id,
      selectedSDDDescription: props.initialDeliveryWindow.description,
    };
  }

  handleChange(event) {
    // const sddAvailableWindows = this.props.shippingInfo.shippingTypesInfo.filter((type) => type.sddAvailableWindows !== null)[0].sddAvailableWindows;
    const sddOption = this.props.shippingInfo.shippingTypesInfo.find((shippingOption) => (shippingOption.shippingOptionId === 'SDD_SAMEDAY'));
    const sddAvailableWindows = sddOption ? sddOption.sddAvailableWindows : null;
    const selectedSDDObj = sddAvailableWindows ? sddAvailableWindows.find((sddWindow) => (sddWindow.id === event.target.value)) : null;

    this.setState({
      deliveryWindow: event.target.value,
      selectedSDDDescription: selectedSDDObj && selectedSDDObj.windowDescription ? selectedSDDObj.windowDescription : '',
    });
  }

  handleOptionChange(changeEvent) {
    this.setState({ shippingType: changeEvent, disableBtn: false });
  }

  submitShippingInfo() {
    const { shippingType } = this.state;
    const { shippingInfo } = this.props;
    if (typeof shippingType.ispuOption !== 'undefined' && shippingType.ispuOption !== null && shippingType.ispuOption) {
      hashHistory.push('/ispu');
    } else {
      console.log(shippingInfo.shippingTypesInfo, shippingType, shippingInfo);
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
        shipToType: shippingInfo.addressInfo.businessName ? 'business' : 'residence',
        flow: this.props.flow,
        showUpdatedAddress: true,
        standaloneAccessories: true,
        deliveryWindow: this.state.deliveryWindow,
        shipOptionChangeOnly: true,
      };
      if (shippingInfo.addressInfo.businessName) {
        param.businessName = shippingInfo.addressInfo.businessName;
      }
      for (const prop in param) {
        if (param[prop] === null) {
          delete param[prop];
        }
      }
      this.props.updateShippingInfo(param);
    }
  }

  renderOptions = () => {
    const { shippingInfo, cqContent } = this.props;
    const renderedOptions = shippingInfo.shippingTypesInfo.map((option, index) => {
      const radioName = `shippingRadio${index}`;
      return (
        <Row key={index} className="pad6 noSidePad">
          <Col xs={12}>
            <RadioButton
              name="shippingRadio"
              id={radioName}
              defaultChecked={option.addedShippingOptionId}
              value={option.shippingOptionId}
              onChange={this.handleOptionChange.bind(this, option)}
              analyticstrack="shipping-options"
            >
              <div>
                <div><strong>{Number(option.shippingCost) > 0 && '$' + option.shippingCost} {option.shippingDescription}</strong></div>
                <div>{option.sddAvailableWindows ? (this.state.selectedSDDDescription ? this.state.selectedSDDDescription : option.description) : option.description}&nbsp;</div>

                {option.sddAvailableWindows &&
                  <div className="pad12 onlyTopPad">
                    <MSelect
                      id="sddOption"
                      borderStyle
                      className="sddAvailableSelect"
                      name="sddOption"
                      onChange={this.handleChange.bind(this)}
                      ref={(input) => this.menu = input}
                      analyticstrack="sdd-window"
                    >
                      {option.sddAvailableWindows.map((opt, i) => <option key={i} value={opt.id} >{opt.formattedWindow}</option>)}
                    </MSelect>
                  </div>
                }

              </div>
            </RadioButton>
            {/* ISPU, Empty contact info error */}
            {(option.ispuOption === true && ((shippingInfo.contactInfo.activeSMSCapableMtnList === null) || (shippingInfo.contactInfo.activeSMSCapableMtnList.length === 0))) && <div className="normalText pad10 onlySidePad textAlignJustify"> {cqContent.error.OD_CHECKOUT_EMPTY_CONTACT_NUMBER_ERROR}</div>}
            <HorizontalRule y={1} margin="16px 0 16px 0" color="#dad8d8" />
          </Col>
        </Row>
      );
    });
    return renderedOptions;
  }

  render() {
    const {
      cqContent, dueToday, isFetching, shippingMethodRequired,
    } = this.props;
    return (
      <Grid className="pad12 noSidePad">
        {isFetching && <Loader />}
        {shippingMethodRequired === false &&
          <Row className="noSideMargin">
            <Col xs={12} className="noSidePad">
              <BackButton />
            </Col>
          </Row>
        }
        <Row className="noSideMargin pad24 noBottomPad">
          <Col xs={12}>
            <Title className="noSidePad">{cqContent.label.OD_CHECKOUT_DELIVERY_METHOD_TITLE_TEXT}</Title>
            <p className="pad12 onlyTopPad">
              <span className="bold">${dueToday}</span>&nbsp;
              <span>{cqContent.label.OD_CHECKOUT_DUE_TODAY_DESCRIPTION_TEXT}</span>
            </p>
            <HorizontalRule />
          </Col>
        </Row>
        <Row className="noSideMargin pad24 onlySidePad">
          <Col xs={12}>
            <form>
              {this.renderOptions()}
            </form>
            <div className="textAlignCenter margin36 noSideMargin width100 floatLeft">
              <button
                disabled={this.state.disableBtn}
                onClick={this.submitShippingInfo.bind(this)}
                analyticstrack="update-shipping-option"
                className="button large"
              >{cqContent.label.OD_CHECKOUT_DELIVERY_METHOD_BUTTON_TEXT}
              </button>
            </div>
          </Col>
        </Row>
      </Grid>

    );
  }
}


ShippingMethod.propTypes = {
  selectedShippingMethod: PropTypes.object,
  shippingInfo: PropTypes.object,
  updateShippingInfo: PropTypes.func,
  cqContent: PropTypes.object,
  dueToday: PropTypes.string,
  isFetching: PropTypes.bool,
  flow: PropTypes.string,
  shippingMethodRequired: PropTypes.bool,
  initialDeliveryWindow: PropTypes.object,
};

export default reduxForm({
  form: 'shippingMethod',
})(ShippingMethod);
