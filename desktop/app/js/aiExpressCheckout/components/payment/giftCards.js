
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form/immutable';
import { Row, Col } from 'react-flexbox-grid';
import { renderTextField } from '../../../common/TextField/';
import Checkbox from '../../../common/Checkbox/index';
import GiftCardIcon from '../../../../images/GiftCard.png';
import * as validation from '../../../common/validation';

const validate = (values, props) => {
  const errors = {};
  const { dueToday } = props;
  const cqError = props.cqContent.error;
  for (let index = 1; props.giftCardsLimit >= index; index++) {
    const checked = values.get(`giftCardCheckbox_${index}`);
    const giftCardNumber = values.get(`giftCardNumber_${index}`);
    const giftCardPin = values.get(`giftCardPin_${index}`);
    const amountToApply = values.get(`amountToApply_${index}`);
    const balance = values.get(`balance_${index}`);

    if (checked) {
      if (!giftCardNumber) {
        errors[`giftCardNumber_${index}`] = cqError.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
      } else if (giftCardNumber.length < 11) {
        errors[`giftCardNumber_${index}`] = cqError.DT_OD_CHECKOUT_TEXT_FIELD_GENERIC_ERRROR;
      }
      for (let i = 1; props.giftCardsLimit >= i; i++) {
        if (i !== index && giftCardNumber === values.get(`giftCardNumber_${i}`)) {
          errors[`giftCardNumber_${index}`] = cqError.DT_OD_CHECKOUT_TEXT_FIELD_GENERIC_ERRROR;
        }
      }

      // Gift Card Pin
      if (!giftCardPin) {
        errors[`giftCardPin_${index}`] = cqError.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
      } else if (giftCardPin && giftCardPin.length < 6) {
        errors[`giftCardPin_${index}`] = cqError.DT_OD_CHECKOUT_TEXT_FIELD_GENERIC_ERRROR;
      }

      // Amount to apply
      if (!amountToApply) {
        errors[`amountToApply_${index}`] = cqError.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
      } else if (parseFloat(amountToApply) > parseFloat(balance)) {
        errors[`amountToApply_${index}`] = cqError.DT_OD_CHECKOUT_GIFT_CARD_EXCEED_BALANCE;
      } else if (parseFloat(amountToApply) > parseFloat(dueToday)) {
        errors[`amountToApply_${index}`] = cqError.DT_OD_CHECKOUT_GIFT_CARD_EXCEED_AMOUNT_DUE;
      } else if (amountToApply && !(/^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{1,2})?$/i.test(amountToApply))) {
        errors[`amountToApply_${index}`] = cqError.DT_OD_CHECKOUT_TEXT_FIELD_GENERIC_ERRROR;
      }

      // Balance
      if (!balance) {
        errors[`balance_${index}`] = cqError.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
      } else if (balance && !(/^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{1,2})?$/i.test(balance))) {
        errors[`balance_${index}`] = cqError.DT_OD_CHECKOUT_TEXT_FIELD_GENERIC_ERRROR;
      }
    }
  }
  return errors;
};

const maskCard = (str) => (str.substring(0, str.length - 4).replace(/[0-9]/g, '*') + str.substring(str.length - 4, str.length));

class GiftCards extends Component {
  constructor(props) {
    super(props);
    let giftCardList = {};
    for (let i = 0; props.giftCards.length > i; i++) {
      let card_number = '';
      if (props.giftCards[i].isEncrypted) {
        if (props.giftCards[i].lastDigits) {
          card_number = `00000000000${props.giftCards[i].lastDigits}`;
        } else {
          card_number = '00000000000';
        }
      } else if (props.giftCards[i].giftCardNumber) {
        card_number = props.giftCards[i].giftCardNumber;
      }

      giftCardList = {
        ...giftCardList,
        [`card_number_${i + 1}`]: card_number,
        [`masked_card_number_${i + 1}`]: maskCard(card_number),
        [`card_identifier_${i + 1}`]: props.giftCards[i].giftCardNumber,
      };
    }
    this.state = {
      showMore: !(props.giftCards.length > 1 && props.giftCards[props.giftCards.length - 1].giftCardNumber),
      ...giftCardList,
    };
  }

  componentWillReceiveProps = (newProps) => {
    if (newProps.giftCardBalanceFetched) {
      // Giftcard balance was retrieved, updating the corresponding input
      const { giftCards } = newProps.asyncCallStatus.data.output;
      this.props.change(`balance_${newProps.asyncCallStatus.data.index}`, parseFloat(giftCards[0].balance).toFixed(2));
      this.props.invalidateAsyncFetch();
    }
  };
  // Event Handler: Clears giftcard number input and states
  onCardFocus = (index) => {
    if (this.props.selectValue(`isEncrypted_${index}`)) {
      this.props.change(`giftCardPin_${index}`, '');
    }
    this.props.change(`isEncrypted_${index}`, false);
    this.props.change(`lastDigits_${index}`, '');
    this.setState({
      [`card_number_${index}`]: '',
      [`masked_card_number_${index}`]: '',
      [`card_identifier_${index}`]: '',
    });
  }

  // Event Handler: Masks the card value and runs "cardErrorCheck"
  onCardBlur = (index) => {
    const str = this.state[`card_number_${index}`];
    this.setState({
      [`masked_card_number_${index}`]: maskCard(str),
    });
  }

  // Event Handler: Normalizes giftcard and updates states
  onCardChange = (e, index) => {
    const normalizedValue = validation.allowOnlyNumbers(e.target.value);
    this.props.change(`lastDigits_${index}`, normalizedValue.slice(-4));

    this.setState({
      [`card_number_${index}`]: normalizedValue,
      [`masked_card_number_${index}`]: normalizedValue,
      [`card_identifier_${index}`]: normalizedValue,
    });
  }

  // Clears redux form inputs and local state, does not trigger remove call`
  clearGiftCardInputs = (index) => {
    this.props.change(`giftCardNumber_${index}`, '');
    this.props.change(`giftCardPin_${index}`, '');
    this.props.change(`balance_${index}`, '');
    this.props.change(`amountToApply_${index}`, '');
    this.props.change(`lastDigits_${index}`, '');
    this.props.change(`isEncrypted_${index}`, false);

    this.props.untouch(`giftCardPin_${index}`);
    this.props.untouch(`amountToApply_${index}`);
    this.props.untouch(`lastDigits_${index}`);
    this.props.untouch(`isEncrypted_${index}`);

    this.setState({
      [`card_number_${index}`]: '',
      [`masked_card_number_${index}`]: '',
      [`card_identifier_${index}`]: '',
    });
  }

  // Generates giftcard array and triggers check balance ajax call
  checkBalance = (index) => {
    const { selectValue } = this.props;

    this.props.checkGiftCardBalance({
      giftCard: selectValue(`giftCardNumber_${index}`),
      pin: selectValue(`giftCardPin_${index}`),
      isEncrypted: selectValue(`isEncrypted_${index}`),
      lastDigits: selectValue(`lastDigits_${index}`),
    }, index);
  };

  // Logic for check balance CTA status
  isCheckBalanceDisabled = (index) => (!!(this.props.formErrors[`giftCardNumber_${index}`] || this.props.formErrors[`giftCardPin_${index}`]));

  render() {
    const {
      cqContent, giftCards, selectValue,
    } = this.props;
    return (
      <div className="margin18 onlyTopMargin">
        {giftCards.map((giftcard, index) => (

          <div
            className="clearfix margin12 noSideMargin"
            key={`giftCardForm-${index}`}
          >
            <Checkbox
              className="checkbox"
              id={`giftCardCheckbox_${index + 1}`}
              name={`giftCardCheckbox_${index + 1}`}
              component="input"
              type="checkbox"
              labelClass="displayInlineBlock verticalCenter leftAlign pad12 onlyLeftPad checkboxLabel"
              analyticstrack="payment-giftCard-apply-checkbox"
            >
              <p id={`giftCardCheckbox_${index + 1}_Label`} >{cqContent.label.DT_OD_CHECKOUT_GIFT_CARD_APPLY_CARD.replace('$NUMBER$', index + 1)}</p>
            </Checkbox>
            {selectValue(`giftCardCheckbox_${index + 1}`) &&
              <Row>
                <Col xs={6} >
                  <div className="margin18 noSideMargin">

                    <Field
                      className=""
                      id={`giftCardNumber_${index + 1}`}
                      name={`giftCardNumber_${index + 1}`}
                      component={renderTextField}
                      type="text"
                      label={(index === 0 ? cqContent.label.DT_OD_CHECKOUT_GIFT_CARD_FORM_NUMBER_REQUIRED : cqContent.label.DT_OD_CHECKOUT_GIFT_CARD_FORM_NUMBER_OPTIONAL)}
                      maxLength="16"
                      textFieldValue={this.state[`masked_card_number_${index + 1}`]}
                      onFocus={() => { this.onCardFocus(index + 1); }}
                      onBlur={() => { this.onCardBlur(index + 1); }}
                      onChange={(e) => { this.onCardChange(e, index + 1); }}
                      pattern="[0-9]*"
                      required
                      autoFocus={false}
                    // disabled={!!this.props.selectValue(`balance_${index + 1}`)}
                    />
                  </div>
                  <div className="margin18 noSideMargin">
                    <Field
                      className=""
                      component={renderTextField}
                      id={`giftCardPin_${index + 1}`}
                      name={`giftCardPin_${index + 1}`}
                      normalize={validation.allowOnlyNumbers}
                      onFocus={() => {
                        if (selectValue(`isEncrypted_${index + 1}`)) {
                          this.onCardFocus(index + 1);
                        } else {
                          this.props.change(`giftCardPin_${index + 1}`, '');
                        }
                      }}
                      maxLength="8"
                      label={(index === 0 ? cqContent.label.DT_OD_CHECKOUT_GIFT_CARD_FORM_PIN_REQUIRED : cqContent.label.DT_OD_CHECKOUT_GIFT_CARD_FORM_PIN_OPTIONAL)}
                      type="password"
                      required
                    // disabled={!!this.props.selectValue(`balance_${index + 1}`)}
                    />
                  </div>
                </Col>
                <Col xs={6}>
                  <img className="margin36 noBottomMargin" src={GiftCardIcon} alt="Gift Card" width="200px" height="170px" />

                </Col>
                <Col xs={12}>
                  <div className="margin12 noSideMargin">
                    <button
                      className="secondary button large margin6 onlySideMargin"
                      disabled={this.isCheckBalanceDisabled(index + 1)}
                      onClick={() => this.checkBalance(index + 1)}
                    >
                      {cqContent.label.DT_OD_CHECKOUT_GIFT_CARD_CHECK_BALANCE}
                    </button>
                    {selectValue(`balance_${index + 1}`) && <span className="bold fontSize_4 pad6 onlyLeftPad">{cqContent.label.DT_OD_CHECKOUT_GIFT_CARD_FORM_BALANCE.replace('$NUMBER$', selectValue(`balance_${index + 1}`))}</span>}
                  </div>
                  <div className={`margin18 noSideMargin width50 pad8 onlyRightPad ${selectValue(`balance_${index + 1}`) || selectValue(`amountToApply_${index + 1}`) ? '' : 'displayNone'}`}>

                    <Field
                      className=""
                      component={renderTextField}
                      type="text"
                      id={`amountToApply_${index + 1}`}
                      name={`amountToApply_${index + 1}`}
                      normalize={validation.allowOnlyMoney}
                      label={cqContent.label.DT_OD_CHECKOUT_GIFT_CARD_FORM_AMOUNT_APPLIED}
                    />

                  </div>
                </Col>
              </Row>
            }
          </div>
        ))
        }
      </div>
    );
  }
}

GiftCards.propTypes = {
  cqContent: PropTypes.object,
  change: PropTypes.func,
  giftCards: PropTypes.array,
  selectValue: PropTypes.func,
  checkGiftCardBalance: PropTypes.func,
  formErrors: PropTypes.object,
  invalidateAsyncFetch: PropTypes.func,
  untouch: PropTypes.func,
};
const selector = formValueSelector('giftCardsForm');

export default connect((state) => ({ selectValue: (field) => selector(state, field) }))(
  reduxForm({
    form: 'giftCardsForm',
    validate,
    destroyOnUnmount: false,
  })(GiftCards)
);
