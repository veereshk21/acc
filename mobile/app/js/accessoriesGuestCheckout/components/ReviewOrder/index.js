import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';

import { hashHistory } from './../../../store';

import Header from './Header';
import Accessories from './Accessories';
import SelectListItem from '../SelectListItem';
import PlaceOrderBtn from './PlaceOrder';

export default class ReviewOrderLanding extends React.Component {
  static propTypes = {
    cq: PropTypes.object,
    selectedShippingType: PropTypes.object,
    dueToday: PropTypes.string,
    shippingInfo: PropTypes.object,
    billingInfo: PropTypes.object,
    giftCardsEnabled: PropTypes.bool,
    totalGiftCardAmount: PropTypes.string,
    giftCardsUsed: PropTypes.number,
    balanceCreditCardAmount: PropTypes.string,
    dueTodayView: PropTypes.object,
    submitOrderURL: PropTypes.string,
    placeOrder: PropTypes.func,
    cartDetailURL: PropTypes.string,
    steps: PropTypes.object,
    paymentInfo: PropTypes.string,
  }
  constructor(props) {
    super(props);
    this.state = {};
  }
  giftCardClick = () => {
    let prompt = false;
    prompt = window.confirm(this.props.cq.label.OD_CHECKOUT_GIFT_CARD_INVALID_PAYMENT_PROMPT);
    if (prompt) {
      hashHistory.push('/addNewCard/newGiftCard');
    }
  }
  render() {
    const {
      cq,
      selectedShippingType,
      dueToday,
      shippingInfo,
      billingInfo,
      giftCardsEnabled,
      totalGiftCardAmount,
      giftCardsUsed,
      balanceCreditCardAmount,
      dueTodayView,
      submitOrderURL,
      placeOrder,
      cartDetailURL,
      steps,
      paymentInfo,
    } = this.props;
    const showGiftCardPrompt = (billingInfo.selectedPaymentMode === 'newCard');

    return (
      <Grid className="noSidePad">
        <Row className="noSideMargin">
          <Col xs={12} className="background_00 color_FFF pad12 onlyTopPad">
            <Header cq={cq} />
          </Col>
        </Row>
        {<Accessories {...this.props} />}
        <SelectListItem title={cq.label.OD_CHECKOUT_SHIPPING_ADDRESS_TEXT} value={shippingInfo.addressInfo.address1} to="/shippingAddress" />
        <SelectListItem title={cq.label.OD_CHECKOUT_DELIVERY_METHOD_TEXT} value={selectedShippingType.shippingTypeName} to="/shippingOptions" />
        <SelectListItem title="Billing Address" value={billingInfo.billingAddress && billingInfo.billingAddress.address1} to="/billingAddress" />
        <SelectListItem
          title={cq.label.OD_CHECKOUT_PAYMENT_TEXT}
          subtitle={balanceCreditCardAmount && `$${balanceCreditCardAmount}`}
          value={paymentInfo}
          to="/choosePaymentMethod"
        />
        {(giftCardsEnabled) &&
          <SelectListItem
            title={cq.label.OD_CHECKOUT_GIFT_CARD_LABEL}
            value={`-$${totalGiftCardAmount}`}
            showValue={giftCardsUsed > 0}
            to="/giftCards"
            onClick={showGiftCardPrompt ? null : this.giftCardClick}
          />
        }
        <SelectListItem title={dueTodayView.title} value={'$' + dueToday} color="#000000" to="/dueToday" />
        <Row className="noSideMargin pad24 noBottomPad">
          <Col xs={12} className="ensighten_bottomButtons textAlignCenter">
            <PlaceOrderBtn
              cqContent={cq}
              submitOrderURL={submitOrderURL}
              onOrderPlacement={placeOrder}
              steps={steps}
            />

          </Col>

        </Row>
        <Row className="noSideMargin margin48 onlyBottomMargin pad24 noTopPad textAlignCenter">
          <Col xs={12} className="ensighten_bottomButtons">
            <div className="margin30 onlyTopMargin">
              <a className="link" href={cartDetailURL} analyticstrack="edit-cart">{cq.label.OD_CHECKOUT_MAIN_SCREEN_CART_TEXT}</a>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}
