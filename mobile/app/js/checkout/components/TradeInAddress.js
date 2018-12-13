/**
 * Created by gautam on 4/11/2017.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TradeInAddressForm from './TradeInAddressForm';
import Title from '../../common/Title/Title';
import BackButton from './../../common/BackButton/BackButton';
import Loader from '../../common/Loader/Loader';

class TradeInAddress extends Component {
  constructor(props) {
    super(props);
    this.submitShippingInfo = this.submitShippingInfo.bind(this);
  }

  notifySecurePinIneligible() {
    const { cqContent } = this.props;
    this.props.showErrorNotification(cqContent.label.OD_CHECKOUT_ADDRESS_UPDATE_PROMPT_TEXT);
  }

  submitShippingInfo(data) {
    const { selectedShippingInfo, cqContent } = this.props;
    this.props.updateShippingAddress(Object.assign({}, data.toJS(), selectedShippingInfo), cqContent.error.OD_CHECKOUT_ADDRESS_UPDATE_FAILURE_TEXT);
  }

  render() {
    const {
      cqContent, addressInfo, contactInfo, shippingAddressRequired, states, isFetching,
    } = this.props;
    const { emailAddress, phoneNumber } = contactInfo;
    const formInitValues = Object.assign(addressInfo, { emailAddress, phoneNumber });

    return (
      <div className="pad12 onlyTopPad">
        {isFetching === true && <Loader />}
        {shippingAddressRequired === false ? <BackButton to="/" >{cqContent.label.OD_CHECKOUT_BACK_TEXT}</BackButton> : null}

        <div className="clearfix pad20">
          <Title className="h2 textAlignCenter">{cqContent.label.OD_CHECKOUT_TRADE_IN_ADDRESS_TITLE_TEXT}</Title>
          <p className="textAlignCenter">{cqContent.label.OD_CHECKOUT_TRADE_IN_ADDRESS_TITLE_DESCRIPTION_TEXT}</p>

          <div className="margin10 noSideMargin clearfix">
            <TradeInAddressForm
              states={states}
              formEnabled
              cqContent={cqContent}
              initialValues={formInitValues}
              onSubmit={this.submitShippingInfo}
            />
          </div>
        </div>
      </div>
    );
  }
}
TradeInAddress.propTypes = {
  cqContent: PropTypes.object,
  addressInfo: PropTypes.object,
  contactInfo: PropTypes.object,
  shippingAddressRequired: PropTypes.bool,
  selectedShippingInfo: PropTypes.any,
  updateShippingAddress: PropTypes.func,
  showErrorNotification: PropTypes.func,
  states: PropTypes.array,
  isFetching: PropTypes.bool,
};
export default TradeInAddress;
