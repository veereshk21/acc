import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { capitalize } from '../../../common/Helpers/index';

class SelectedPaymentMethod extends Component {
  componentWillMount() {

  }
  renderPaymentMethod = () => {
    const {
      selectedPaymentMode, selectedCard, cqContent, billingInfo,
    } = this.props;
    let paymentMethod = null;
    if (selectedPaymentMode === 'newcard') {
      paymentMethod = (
        <Row>
          <Col xs={4}>
            <p className="clearfix">{capitalize(selectedCard.creditCardType)} ending - {selectedCard.creditCardNumber.slice(-4)}</p>
          </Col>

          <Col xs={6} style={{ marginTop: '-16px' }}>
            <p className="legal margin18 onlyRightMargin pad6 onlyTopPad">{cqContent.label.DT_OD_CHECKOUT_PAYMENT_SAVED_CARD_SELECTED_DETAILS}</p>
          </Col>
        </Row>);
    } if (selectedPaymentMode === 'savedcard') {
      paymentMethod = (
        <Row>
          <Col xs={4}>
            <p className="clearfix">{capitalize(selectedCard.creditCardType)} ending - {selectedCard.creditCardNumber.slice(-4)}</p>
          </Col>

          <Col xs={6} style={{ marginTop: '-16px' }}>
            <p className="legal margin18 onlyRightMargin pad6 onlyTopPad">{cqContent.label.DT_OD_CHECKOUT_PAYMENT_SAVED_CARD_SELECTED_DETAILS}</p>
          </Col>
        </Row>
      );
    } else if (selectedPaymentMode === 'bta') {
      paymentMethod = (
        <Row>
          <Col xs={4}>
            <p>{cqContent.label.DT_OD_CHECKOUT_PAYMENT_BTA}</p>
          </Col>
          <Col xs={6} style={{ marginTop: '-16px' }}>
            <p className="legal margin18 onlyRightMargin">{cqContent.label.DT_OD_CHECKOUT_PAYMENT_BTA_DESCRIPTION}</p>
          </Col>
        </Row>
      );
    } else if (selectedPaymentMode === 'paypal') {
      paymentMethod = (
        <div>
          <p>PayPal</p>
          <p>{billingInfo.paypalEmailAddress}</p>
        </div>
      );
    } else if (selectedPaymentMode === 'masterpass') {
      paymentMethod = (
        <div>
          <p>Masterpass</p>
          <p>{billingInfo.masterpassResponseInfo && billingInfo.masterpassResponseInfo.emailAddress}</p>
        </div>
      );
    } else if (selectedPaymentMode === 'applepay') {
      paymentMethod = (
        <div>
          <p>Apple Pay</p>
          <p>{billingInfo.applePayResponseInfo && billingInfo.applePayResponseInfo.emailAddress}</p>
        </div>
      );
    }
    return paymentMethod;
  }
  render() {
    const { cqContent } = this.props;

    return (
      <div id="paymentSection">
        <div className="pad24 noBottomPad">
          <hr />
          <Row className="">
            <Col xs={12}>
              <div className="">
                <h3 className="fontSize_5 verticalBottom displayInlineBlock margin3 onlyRightMargin">
                  {cqContent.label.DT_OD_CHECKOUT_PAYMENT_COMPLETED_SECTION_TITLE}
                </h3>
              </div>
              <div style={{ wordWrap: 'break-word' }}>{this.renderPaymentMethod()}</div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

SelectedPaymentMethod.propTypes = {
  cqContent: PropTypes.object,
  selectedPaymentMode: PropTypes.string,
  selectedCard: PropTypes.object,
  billingInfo: PropTypes.object,
};
export default SelectedPaymentMethod;
