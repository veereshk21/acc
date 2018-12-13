import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { normalizePhoneNumber } from '../../../common/validation';
import { EDIT_STATE } from '../../constants';
import EditButton from '../../../common/EditButton/index';
import { capitalize } from '../../../common/Helpers/index';
import CardSprite from '../../../../images/credit-cards-sprite.png';

class SelectedPaymentMethod extends Component {
  componentWillMount() {

  }
  onClickEdit = () => {
    this.props.updateEditState(EDIT_STATE.PAYMENT, true);
  }
  renderPaymentMethod = () => {
    const {
      selectedPaymentMode, selectedCard, cqContent, billingInfo,
    } = this.props;
    let paymentMethod = null;
    if (selectedPaymentMode === 'newcard') {
      paymentMethod = (
        <p>{selectedCard.creditCardNumber && selectedCard.creditCardNumber.length > 5 ? selectedCard.creditCardNumber : `XXXX-XXXX-XXXX-${selectedCard.creditCardNumber}`}</p>
      );
    } if (selectedPaymentMode === 'savedcard') {
      paymentMethod = (
        <div>
          <p className="clearfix">
            <span className={`creditCards m_${selectedCard.creditCardType} m_entered`} style={{ position: 'static', background: `url(${CardSprite}) no-repeat` }} />
            <span>{cqContent.label.DT_OD_CHECKOUT_PAYMENT_SAVED_CARD_SELECTED.replace('$NICKNAME$', selectedCard.savedCardNickName).replace('$LAST_DIGITS$', selectedCard.creditCardNumber.slice(-4))}</span>
          </p>
          <p className="margin3 onlyTopMargin">{cqContent.label.DT_OD_CHECKOUT_PAYMENT_SAVED_CARD_SELECTED_EXPIRATION_DATE.replace('$MONTH$', selectedCard.creditCardExpMonth).replace('$YEAR$', selectedCard.creditCardExpYear)}</p>
          <p className="legal margin18 onlyRightMargin pad6 onlyTopPad">{cqContent.label.DT_OD_CHECKOUT_PAYMENT_SAVED_CARD_SELECTED_DETAILS}</p>
        </div>
      );
    } else if (selectedPaymentMode === 'bta') {
      paymentMethod = (
        <div>
          <p>{cqContent.label.DT_OD_CHECKOUT_PAYMENT_BTA}</p>
          <p className="legal margin18 onlyRightMargin">{cqContent.label.DT_OD_CHECKOUT_PAYMENT_BTA_DESCRIPTION}</p>
        </div>
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
    const { cqContent, billingAddress } = this.props;

    return (
      <Row className="margin42 onlyBottomMargin">
        <Col xs={6}>
          <div className="margin12 onlyBottomMargin">
            <h3 className="verticalBottom displayInlineBlock">
              {cqContent.label.DT_OD_CHECKOUT_PAYMENT_COMPLETED_SECTION_TITLE}
            </h3>

            <EditButton
              onClick={this.onClickEdit}
              analyticstrack="payment-edit-CTA"
            >
              Edit
            </EditButton>
          </div>

          <div style={{ wordWrap: 'break-word' }}>{this.renderPaymentMethod()}</div>

        </Col>
        <Col xs={4} lg={5} lgOffset={1} className="billingAddressEdit">
          {/* Billing Address */}

          <h3 className="margin12 onlyBottomMargin">
            {cqContent.label.DT_OD_CHECKOUT_PAYMENT_BILLING_ADDRESS_SECTION_TITLE}
          </h3>

          {billingAddress.businessName &&
            <p>{capitalize(billingAddress.businessName)}</p>
          }
          {(billingAddress.firstName || billingAddress.lastName) &&
            <p> {capitalize(`${billingAddress.firstName} ${billingAddress.lastName}`)}</p>
          }
          <p>{capitalize(billingAddress.address1)}</p>
          {billingAddress.address2 &&
            <p>{capitalize(billingAddress.address2)}</p>
          }
          <p>{capitalize(billingAddress.city)}, {billingAddress.state}, {billingAddress.zipcode}</p>
          <p>{normalizePhoneNumber(billingAddress.phoneNumber)}</p>
          <p> {billingAddress.email}</p>


        </Col>
      </Row>
    );
  }
}

SelectedPaymentMethod.propTypes = {
  cqContent: PropTypes.object,
  billingAddress: PropTypes.object,
  selectedPaymentMode: PropTypes.string,
  selectedCard: PropTypes.object,
  updateEditState: PropTypes.func,
  billingInfo: PropTypes.object,
};
export default SelectedPaymentMethod;
