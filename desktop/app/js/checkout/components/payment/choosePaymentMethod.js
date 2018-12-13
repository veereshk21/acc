import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form/immutable';
import { Row, Col } from 'react-flexbox-grid';
import * as validation from '../../../common/validation';
import AddNewCardForm from './addNewCard';
import GiftCards from '../../containers/payment/giftCards';
import ToolTip from '../../../common/ToolTip/index';
import Button from '../../../common/Button/Button';
import { EDIT_STATE } from '../../constants';
import PaymentMethods from './paymentMethods';

const scrollProps = { block: 'start', inline: 'nearest', behavior: 'smooth' };

const validate = (values, props) => {
  const errors = {};

  const cardCVC = values.get('card_cvc');
  const cardType = props.savedCards[0] && props.savedCards[props.selectedSavedCardIndex].creditCardType;
  const cvvLength = cardType && (cardType.toLowerCase() === 'amex' || cardType.toLowerCase() === 'americanexpress') ? 4 : 3;

  if (!cardCVC) {
    errors.card_cvc = props.cqContent.label.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidCreditCardCVC(cardCVC, cvvLength)) {
    errors.card_cvc = props.cqContent.error.OD_CHECKOUT_MISSING_CVC_INVALID_CVC_ERROR;
  }

  return errors;
};

class ChoosePaymentMethod extends Component {
  constructor(props) {
    super(props);
    this.paymentOptionsLength = this.props.paymentOptions ? this.props.paymentOptions.length : 0;
    this.cardinalInit = window.cardinalInit || false;
  }

  componentWillMount() {
    const {
      applePayOption, appleMerchantIdentifier, applePayEnabled, showApplePay,
    } = this.props;
    if (applePayEnabled && !showApplePay) {
      applePayOption(appleMerchantIdentifier);
    }
  }

  componentDidMount = () => {
    const {
      handle3dPaymentValidated, dispatchErrorNotification, authInfo, masterpass3DSecure, cqContent,
    } = this.props;
    const _this = this;

    // Checking for Cardinal's 3D Secure JS
    if (window.Cardinal) {
      // 3D Secure initialization and registering Event Handlers
      if (authInfo) {
        try {
          window.Cardinal.configure({
            logging: {
              level: 'verbose',
            },
          });

          window.Cardinal.setup('init', {
            jwt: authInfo.clients.CARDINAL3DSECURE.token,
          });

          window.Cardinal.on('payments.setupComplete', () => {
            // eslint-disable-next-line no-console
            console.log('Cardinal setup Complete');
            _this.cardinalInit = true;
            window.cardinalInit = true;
            // Trigger 3D Secure flow for Masterpass card, exisitng cards are handled in the actions.js
            if (masterpass3DSecure) {
              window.Cardinal.continue(
                'cca',
                {
                  AcsUrl: masterpass3DSecure.acsUrl,
                  Payload: masterpass3DSecure.payload,
                },
                {
                  OrderDetails: {
                    TransactionId: masterpass3DSecure.transId,
                  },
                }
              );
            }
          });

          window.Cardinal.on('payments.validated', (data, jwt) => {
            // eslint-disable-next-line no-console
            console.log('Trigger::: ChoosePaymentMethod RD', data);

            if (typeof data.Payment !== 'undefined' && data.Payment.Type !== undefined) {
              switch (data.ActionCode) {
                case 'SUCCESS': // Handle successful authentication scenario and validate the signature on the JWT
                  // eslint-disable-next-line no-console
                  console.log('Trigger::: ChoosePaymentMethod RD ::: SUCCESS');
                  handle3dPaymentValidated(data, jwt);// dispatches handle3dPaymentValidated action
                  break;

                case 'NOACTION': // Handle unenrolled scenario
                  // eslint-disable-next-line no-console
                  console.log('Trigger::: ChoosePaymentMethod RD :: NOACTION');
                  handle3dPaymentValidated(data, jwt);
                  break;

                case 'FAILURE': // Handle authentication failed or error encounter scenario
                  // eslint-disable-next-line no-console
                  console.log('FAILURE');
                  dispatchErrorNotification(cqContent.error.DT_OD_CHECKOUT_PAYMENT_3D_SECURE_FAILURE);
                  window.document.getElementById('paymentSection').scrollIntoView(scrollProps);
                  break;

                case 'ERROR': // Handle service level error
                  // eslint-disable-next-line no-console
                  console.log('ERROR');
                  dispatchErrorNotification(cqContent.error.DT_OD_CHECKOUT_PAYMENT_3D_SECURE_FAILURE);
                  window.document.getElementById('paymentSection').scrollIntoView(scrollProps);
                  break;

                default:
                  break;
              }
            } else if (data.ActionCode === 'ERROR' || data.ActionCode === 'FAILURE') {
              // eslint-disable-next-line no-console
              console.log(data.ActionCode);
              dispatchErrorNotification(cqContent.error.DT_OD_CHECKOUT_PAYMENT_3D_SECURE_FAILURE);
              window.document.getElementById('paymentSection').scrollIntoView(scrollProps);
            } else {
              _this.cardinalInit = false;
              // eslint-disable-next-line no-console
              console.log('Trigger::: AddPaymentMethod :: UNDEFINED', data);
            }
          });
        } catch (e) {
          // An error occurred
          _this.cardinalInit = false;
          // eslint-disable-next-line no-console
          console.log((window.Cardinal === undefined ? 'Cardinal Cruise did not load properly. ' : 'Cardinal :::: An error occurred during processing. ') + e);
        }
      }
    }
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.applePayEnabled === true && window.ApplePaySession) {
      return true;
    }
    return true;
  }
  componentWillUnmount() {
    if (window.Cardinal) {
      // eslint-disable-next-line no-console
      console.log('Component UnMounted from ChoosePaymentMethod ::: RD');
      window.Cardinal.off('payments.validated');
    }
  }
  onCancel = () => {
    this.props.updateEditState(EDIT_STATE.PAYMENT, false);
  }
  onChoosePaymentMethod = () => {
    const {
      orderSelectedPaymentMode,
      selectedRadioButton,
      addNewCard,
      forms,
      pieEnabled,
      pastDuePaymentRequired,
      choosePaymentMethod,
      selectedSavedCardIndex,
      savedCards,
      giftCardList,
      paypalFlowCompleted,
      masterpassFlowCompleted,
      dispatchErrorNotification,
      cqContent,
      authInfo,
      showCVV,
    } = this.props;

    if (selectedRadioButton === 'savedcard') {
      // Saved Card
      const { creditCardBIN } = savedCards[selectedSavedCardIndex];
      const card_cvc = forms && forms.choosePaymentMethod && forms.choosePaymentMethod.values && forms.choosePaymentMethod.values.card_cvc;
      // Checking for Cardinal's 3D Secure JS
      if (window.Cardinal && authInfo) {
        // 3D Secure initialization and registering Event Handlers
        try {
          if (typeof authInfo.clients.CARDINAL3DSECURE.featuresList !== 'undefined' && authInfo.clients.CARDINAL3DSECURE.featuresList.binDetection) {
            window.Cardinal.trigger('accountNumber.update', creditCardBIN);
          }
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log((window.Cardinal === undefined ? 'Cardinal Cruise did not load properly. ' : 'Cardinal :::: An error occurred during processing. ') + e);
        }
      }
      choosePaymentMethod({ paymentType: selectedRadioButton, ...savedCards[selectedSavedCardIndex], card_cvc }, pastDuePaymentRequired, pieEnabled, giftCardList, this.cardinalInit, showCVV);
    } else if (selectedRadioButton === 'newcard') {
      // New Card
      // Checking for Cardinal's 3D Secure JS
      if (window.Cardinal && authInfo) {
        // 3D Secure initialization and registering Event Handlers
        try {
          if (typeof authInfo.clients.CARDINAL3DSECURE.featuresList !== 'undefined' && authInfo.clients.CARDINAL3DSECURE.featuresList.binDetection) {
            window.Cardinal.trigger('accountNumber.update', forms.addNewCard.values.card_number.slice(0, 6));
          }
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log((window.Cardinal === undefined ? 'Cardinal Cruise did not load properly. ' : 'Cardinal :::: An error occurred during processing. ') + e);
        }
      }
      addNewCard({ ...forms.addNewCard.values, cardType: validation.getCardType(forms.addNewCard.values.card_number) }, pastDuePaymentRequired, pieEnabled, giftCardList, this.cardinalInit);
    } else if (selectedRadioButton === 'BTA' && selectedRadioButton !== orderSelectedPaymentMode) {
      // BTA
      choosePaymentMethod({ paymentType: selectedRadioButton }, pastDuePaymentRequired);
    } else if (selectedRadioButton === 'paypal' && !paypalFlowCompleted) {
      dispatchErrorNotification(cqContent.error.DT_OD_CHECKOUT_PAYMENT_PAYPAL_VALIDATE_INCOMPLETE_ERROR);
      window.document.getElementById('paymentSection').scrollIntoView(scrollProps);
    } else if (selectedRadioButton === 'masterpass' && !masterpassFlowCompleted) {
      dispatchErrorNotification(cqContent.error.DT_OD_CHECKOUT_PAYMENT_MASTERPASS_VALIDATE_INCOMPLETE_ERROR);
      window.document.getElementById('paymentSection').scrollIntoView(scrollProps);
    } else {
      // No Changes
      this.props.updateEditState(EDIT_STATE.PAYMENT, false);
    }
  }

  isValidateEnabled = () => {
    const {
      valid, submitting, forms, showCVV, showGiftCard, selectedRadioButton, paypalFlowCompleted, masterpassFlowCompleted,
    } = this.props;
    let result = (valid && !submitting && forms.choosePaymentMethod && forms.choosePaymentMethod.values && forms.choosePaymentMethod.values.paymentRadio);
    if (result) {
      if (forms.choosePaymentMethod.values.paymentRadio === 'newcard') {
        result = (forms.addNewCard && !forms.addNewCard.syncErrors) && (showGiftCard ? (forms.giftCardsForm && !forms.giftCardsForm.syncErrors) : true);
      } else if (forms.choosePaymentMethod.values.paymentRadio === 'savedcard' && showCVV) {
        result = forms.choosePaymentMethod.values.card_cvc && !forms.choosePaymentMethod.syncErrors && (showGiftCard ? (forms.giftCardsForm && !forms.giftCardsForm.syncErrors) : true);
      } else if ((selectedRadioButton === 'paypal' && !paypalFlowCompleted) || (selectedRadioButton === 'masterpass' && !masterpassFlowCompleted)) {
        result = false;
      }
    }
    return result;
  }


  render() {
    const {
      cqContent, showAddCard, paymentRequired, billingInfo, showGiftCard,
    } = this.props;
    const { billingAddress } = this.props.billingInfo;

    return (
      <div>
        <div className="margin30 onlyBottomMargin">
          <div className="margin12 noSideMargin">
            <h3 className="displayInlineBlock">{cqContent.label.DT_OD_CHECKOUT_PAYMENT_HOW_WOULD_YOU_LIKE_TO_PAY_TITLE}</h3>
            <ToolTip
              className="margin3 onlyLeftMargin displayInlineBlock"
              ariaLabel="Payment options tooltip"
              text={cqContent.label.DT_OD_CHECKOUT_PAYMENT_HOW_WOULD_YOU_LIKE_TO_PAY_TOOLTIP}
              noRenderHTML
            />
          </div>
          <p>{cqContent.label.DT_OD_CHECKOUT_PAYMENT_HOW_WOULD_YOU_LIKE_TO_PAY_DESCRIPTION}</p>
        </div>

        <Row className="pad12 onlyBottomPad">
          <Col xs={7} >
            <div className="">
              <div className="margin12 onlyTopMargin">
                <h3 className="displayInlineBlock">{cqContent.label.DT_OD_CHECKOUT_PAYMENT_INFORMATION_SECTION_TITLE}</h3>
                <ToolTip
                  className="margin3 onlyLeftMargin displayInlineBlock"
                  ariaLabel="Payment information tooltip"
                  text={cqContent.label.DT_OD_CHECKOUT_PAYMENT_INFORMATION_SECTION_TITLE_TOOLTIP}
                  noRenderHTML
                />
              </div>
              <div className="margin12 onlySideMargin">
                <PaymentMethods {...this.props} />
              </div>
              {showAddCard &&
                <AddNewCardForm
                  cqContent={cqContent}
                  billingInfo={billingInfo}
                  initialValues={{
                    card_zip: billingInfo.billingAddress.zipcode,
                  }}
                  checkoutStates={this.props.checkoutStates}
                />
              }
            </div>
          </Col>
          <Col xs={4} lgOffset={0} className="billingAddress">
            <div className="" style={{ minHeight: 200 }}>
              <div className="margin12 noSideMargin">
                <h3 className="displayInlineBlock">
                  {cqContent.label.DT_OD_CHECKOUT_PAYMENT_BILLING_ADDRESS_SECTION_TITLE}
                </h3>
                <ToolTip
                  className="margin3 onlyLeftMargin displayInlineBlock"
                  ariaLabel="Billing address information tooltip"
                  text={cqContent.label.DT_OD_CHECKOUT_PAYMENT_BILLING_ADDRESS_SECTION_TITLE_TOOLTIP}
                  noRenderHTML
                />
              </div>
              <div className="margin24 onlyTopMargin">
                {billingAddress.businessName &&
                  <p>{billingAddress.businessName}</p>
                }
                {(billingAddress.firstName || billingAddress.lastName) &&
                  <p> {billingAddress.firstName} {billingAddress.lastName}</p>
                }
                <p>{billingAddress.address1}</p>
                {billingAddress.address2 &&
                  <p>{billingAddress.address2}</p>
                }
                <p>{billingAddress.city}, {billingAddress.state}, {billingAddress.zipcode}</p>
                <p>{validation.normalizePhoneNumber(billingAddress.phoneNumber)}</p>
                <p> {billingAddress.email}</p>
              </div>
            </div>
          </Col>
          <Col xs={12}>
            {showGiftCard &&
              <GiftCards />
            }
          </Col>
        </Row>
        <div className="width100 margin24 onlyTopMargin clearfix">
          <Button
            className="primary button large"
            type="submit"
            analyticstrack="payment-validate-CTA"
            disabled={!this.isValidateEnabled()}
            onClick={this.onChoosePaymentMethod}
          >
            Validate
          </Button>
          {!paymentRequired &&
            <Button
              className="secondary button large margin10 onlyLeftMargin"
              onClick={this.onCancel}
              analyticstrack="payment-cancel-CTA"
            >
              {cqContent.label.DT_OD_CHECKOUT_PAYMENT_CANCEL}
            </Button>
          }
        </div>
      </div>
    );
  }
}

ChoosePaymentMethod.propTypes = {
  paymentOptions: PropTypes.array,
  cqContent: PropTypes.object,
  paymentRequired: PropTypes.bool,
  handle3dPaymentValidated: PropTypes.func,
  dispatchErrorNotification: PropTypes.func,
  authInfo: PropTypes.object,
  masterpass3DSecure: PropTypes.object,
  applePayEnabled: PropTypes.bool,
  appleMerchantIdentifier: PropTypes.string,
  applePayOption: PropTypes.func,
  showGiftCard: PropTypes.bool,
  showApplePay: PropTypes.bool,
  showAddCard: PropTypes.bool,
  showCVV: PropTypes.bool,
  savedCards: PropTypes.array,
  selectedRadioButton: PropTypes.string,
  orderSelectedPaymentMode: PropTypes.string,
  billingInfo: PropTypes.object,
  valid: PropTypes.bool,
  submitting: PropTypes.bool,
  updateEditState: PropTypes.func,
  addNewCard: PropTypes.func,
  forms: PropTypes.object,
  pieEnabled: PropTypes.bool,
  pastDuePaymentRequired: PropTypes.bool,
  choosePaymentMethod: PropTypes.func,
  selectedSavedCardIndex: PropTypes.number,
  giftCardList: PropTypes.array,
  paypalFlowCompleted: PropTypes.bool,
  masterpassFlowCompleted: PropTypes.bool,
  checkoutStates: PropTypes.object,
};

// export default ChoosePaymentMethod;
export default reduxForm({
  form: 'choosePaymentMethod',
  validate,
})(ChoosePaymentMethod);
