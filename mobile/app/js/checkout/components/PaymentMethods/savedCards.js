/* eslint-disable no-class-assign */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, change } from 'redux-form/immutable';
import { Grid, Row, Col } from 'react-flexbox-grid';
import styled from 'styled-components';

import * as validation from '../../../common/validation';
import Backbutton from './../../../common/BackButton/BackButton';
import Title from './../../../common/Title/Title';
import MSelect from './../../../common/Select';
import CVV from '../../../../images/cvv.svg';
import { renderTextField } from './../../../common/TextField';

import NortonSeal from '../../../../images/norton_secure_seal.svg';
import CardSprite from '../../../../images/credit-cards-sprite.png';

const validate = (values, props) => {
  const errors = {};

  const cardNumber = values.get('card_number');
  console.log(cardNumber);
  const cardCVC = values.get('card_cvc');
  const cvvLength = (!cardNumber) ? 4 : (getCard(cardNumber, props.savedCardInfo).creditCardType.toLowerCase() === 'americanexpress' ? 4 : 3);
  if (!cardCVC) {
    errors.card_cvc = props.cqContent.label.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/i.test(cardCVC) || cardCVC.toString().length < cvvLength || cardCVC.toString().length > cvvLength) {
    errors.card_cvc = props.cqContent.error.OD_CHECKOUT_ADD_NEW_PAYMENT_METHOD_INVALID_CVC_ERROR;
  }
  if (!cardNumber) {
    errors.card_number = 'select card';
  }
  console.log(errors);
  return errors;
};

const getCard = (selectedcard, savedCardInfo) => {
  const cardInfo = savedCardInfo.filter((card) => card.savedCardNickName === selectedcard)[0];
  return cardInfo;
};

class SavedCards extends Component {
  static propTypes = {
    cqContent: PropTypes.object,
    savedCardInfo: PropTypes.array,
    dispatch: PropTypes.func,
    choosePaymentMethod: PropTypes.func,
    valid: PropTypes.bool,
    submitting: PropTypes.bool,
    handleSubmit: PropTypes.func,
    billingInfo: PropTypes.object,
    cvvNeeded: PropTypes.bool,
    handle3dPaymentValidated: PropTypes.func,
    dispatchErrorNotification: PropTypes.func,
    authInfo: PropTypes.object,
    asyncFetchFalied: PropTypes.func,
  }
  constructor(props) {
    super(props);
    const selectedCardInfo = props.savedCardInfo.filter((card) => card.preselectCard === true)[0] || props.savedCardInfo[0];
    this.selectedCard = selectedCardInfo.savedCardNickName;
    this.cardinalInit = window.cardinalInit || false;
    this.state = {
      selectedCardInfo,
      cardType: selectedCardInfo.creditCardType,
      cvvLength: (selectedCardInfo.creditCardType && selectedCardInfo.creditCardType.toLowerCase() === 'americanexpress') ? 4 : 3,
      disabled: false,
      pad: '10px',
    };
  }

  componentDidMount() {
    const {
      handle3dPaymentValidated, dispatchErrorNotification, authInfo, asyncFetchFalied, cqContent,
    } = this.props;
    const { selectedCardInfo } = this.state;
    const _this = this;
    console.log(this.state.selectedCardInfo);
    const orderObject = {
      Consumer: {
        Account: {
          AccountNumber: selectedCardInfo.creditCardBIN,
        },
      },
    };
    // Checking for Cardinal's 3D Secure JS
    if (window.Cardinal) {
      // 3D Secure initialization and registering Event Handlers

      try {
        window.Cardinal.configure({
          logging: {
            level: 'verbose',
          },
        });

        if (typeof authInfo.clients.CARDINAL3DSECURE.featuresList !== 'undefined' && authInfo.clients.CARDINAL3DSECURE.featuresList !== null && authInfo.clients.CARDINAL3DSECURE.featuresList.binDetection) {
          window.Cardinal.setup('init', {
            jwt: authInfo.clients.CARDINAL3DSECURE.token,
            order: orderObject,
          });
        } else {
          window.Cardinal.setup('init', {
            jwt: authInfo.clients.CARDINAL3DSECURE.token,
          });
        }

        window.Cardinal.on('payments.setupComplete', () => {
          console.log('Cardinal setup Complete');
          _this.cardinalInit = true;
          // Trigger 3D Secure flow for Masterpass card, exisitng cards are handled in the actions.js
        });

        window.Cardinal.on('payments.validated', (data, jwt) => {
          console.log('Trigger::: ChoosePaymentMethod RD', data);
          if (typeof data.Payment !== 'undefined' && data.Payment.Type !== undefined) {
            switch (data.ActionCode) {
              case 'SUCCESS': // Handle successful authentication scenario and validate the signature on the JWT
                console.log('Trigger::: ChoosePaymentMethod RD ::: SUCCESS');
                handle3dPaymentValidated(data, jwt);// dispatches handle3dPaymentValidated action
                break;

              case 'NOACTION': // Handle unenrolled scenario
                console.log('Trigger::: ChoosePaymentMethod RD :: NOACTION');
                handle3dPaymentValidated(data, jwt);
                break;

              case 'FAILURE': // Handle authentication failed or error encounter scenario
                console.log('FAILURE');
                asyncFetchFalied();
                dispatchErrorNotification(cqContent.error.OD_CHECKOUT_CARDINAL_FAILURE_ERROR);
                break;

              case 'ERROR': // Handle service level error
                console.log('ERROR');
                asyncFetchFalied();
                dispatchErrorNotification(cqContent.error.OD_CHECKOUT_CARDINAL_ERROR_ERROR);
                break;

              default:
                break;
            }
          } else if (data.ActionCode === 'ERROR' || data.ActionCode === 'FAILURE') {
            console.log(data.ActionCode);
            asyncFetchFalied();
            dispatchErrorNotification(cqContent.error.OD_CHECKOUT_CARDINAL_ERROR_ERROR);
          } else {
            _this.cardinalInit = false;
          }
        });
      } catch (e) {
        // An error occurred
        _this.cardinalInit = false;
        console.log((window.Cardinal === undefined ? 'Cardinal Cruise did not load properly. ' : 'Cardinal :::: An error occurred during processing. ') + e);
      }
    }
  }
  handleOnChange = (e) => {
    const selectedCardInfo = getCard(e.target.value, this.props.savedCardInfo);
    const cardType = selectedCardInfo.creditCardType;

    this.props.dispatch(change('selectPaymentMethodForm', 'card_cvc', ''));
    this.setState({
      cardType,
      selectedCardInfo,
      cvvLength: (selectedCardInfo.creditCardType && selectedCardInfo.creditCardType.toLowerCase() === 'americanexpress') ? 4 : 3,
      disabled: true,
      pad: '60px',
    });
  }
  handleSubmitPayment = (data) => {
    const paymentInfo = this.state.selectedCardInfo;
    paymentInfo.creditCardVerificationNumber = data.card_cvc;
    paymentInfo.paymentType = 'savedcard';
    const { authInfo, cvvNeeded } = this.props;
    if (authInfo) {
      if (typeof authInfo.clients.CARDINAL3DSECURE.featuresList !== 'undefined' && authInfo.clients.CARDINAL3DSECURE.featuresList !== null && authInfo.clients.CARDINAL3DSECURE.featuresList.binDetection) {
        window.Cardinal.trigger('accountNumber.update', paymentInfo.creditCardBIN);
      }
    }
    this.props.choosePaymentMethod(paymentInfo, false, false, this.cardinalInit, cvvNeeded);
  };
  render() {
    const {
      cqContent,
      savedCardInfo,
      valid,
      submitting,
      handleSubmit,
      billingInfo,
      cvvNeeded,

    } = this.props;
    // const cvvNeeded = true;
    const SelectedCard = styled.span`
      position: absolute;
      width: 35px;
      height: 26px;
      background-size: 35px 25px;
      top: 38px;
      left: 24px;
    `;
    return (
      <Grid className="pad12 onlyTopPad">
        <Row>
          <Col xs={12}>
            <Backbutton to="/" />
          </Col>
        </Row>
        <Row className="pad12 noSideMargin">
          <Col xs={11} md={8} >
            <Title className="h2 margin12 onlyTopMargin" >Authenticate your<br /> saved payment.</Title>
            <p className="pad6 onlyTopPad fontSize_4">{cvvNeeded ? 'Confirm your CVV to authenticate.' : 'Confirm your preferred payment.'}</p>
          </Col>
        </Row>

        <div className="pad12 noSidePad">
          <form>
            <Row className="pad12 noSideMargin">
              <Col xs={cvvNeeded ? 8 : 12} className="positionRelative">
                {savedCardInfo.length > 1 ?
                  <MSelect
                    name="card_number"
                    id="card_number"
                    label={cqContent.label.OD_CHECKOUT_ADD_NEW_PAYMENT_METHOD_EXPIRATION_MONTH_TEXT}
                    borderStyle
                    required
                    defaultSelected={0}
                    style={{ paddingLeft: `${this.state.pad}` }}
                    onChange={this.handleOnChange}
                    ref={(card) => this.selectedCard = card}
                    analyticstrack="choose-saved-card"
                  >
                    <option selected disabled={this.state.disabled} >Select Card</option>
                    {savedCardInfo.map((card) => (<option key={`month-${card.savedCardNickName}`} data-card-type={card.creditCardType} value={card.savedCardNickName}>{card.savedCardNickName}</option>))}
                  </MSelect> :
                  <div>
                    <span className="fontDisplayMedium textTransCapitalize">{savedCardInfo[0].creditCardType.toLowerCase()} &bull;&bull;&bull;&bull;</span> {savedCardInfo[0].savedCardNickName}
                  </div>
                }
                {this.state.disabled &&
                  <SelectedCard className={`creditCards m_${this.state.cardType} m_entered`} style={{ background: `url(${CardSprite}) no-repeat` }} />
                }
                <p className="legalFinePrint pad6 noSidePad color_legal">
                  <span className="fontDisplayMedium">Exp date</span> {this.state.selectedCardInfo.creditCardExpMonth}/{this.state.selectedCardInfo.creditCardExpYear} <br />
                  <span className="fontDisplayMedium">Zip code</span> {billingInfo.billingAddress.zipcode}
                </p>

              </Col>
              {cvvNeeded &&
                <Col xs={savedCardInfo.length === 1 ? 12 : 4} className="clearfix">
                  <Field
                    aria-label="CVV Number"
                    name="card_cvc"
                    id="card_cvc"
                    component={renderTextField}
                    type="password"
                    label={cqContent.label.OD_CHECKOUT_ADD_NEW_PAYMENT_METHOD_CVC_TEXT}
                    normalize={validation.allowOnlyNumbers}
                    maxLength={this.state.cvvLength}
                    tooltip={
                      <div>
                        <p className="margin12 onlyBottomMargin">{cqContent.label.OD_CHECKOUT_PAYMENT_CARD_CVV_TOOLTIP}</p>
                        <img src={CVV} alt="CVV location" />
                      </div>
                    }
                  />
                </Col>
              }
            </Row>
            <Row className="pad12 noSideMargin">
              <Col>
                <img className="height48" src={NortonSeal} alt="Norton Secured" />
              </Col>
            </Row>
          </form>
          <Row className="footerFixed textAlignCenter border_grey onlyTopBorder" style={{ bottom: '10px' }}>
            <Col xs={12}>
              <button
                className="primary button large"
                type="submit"
                disabled={!valid || submitting}
                analyticstrack="submit-saved-payments"
                onClick={
                  handleSubmit((data) => {
                    this.handleSubmitPayment(Object.assign({}, data.toJS()));// dispatches add new card action
                  })
                }
              >Confirm
              </button>
            </Col>
          </Row>

        </div>

      </Grid>
    );
  }
}
SavedCards = reduxForm({
  form: 'selectPaymentMethodForm',
  validate,
})(SavedCards);

export default SavedCards;

