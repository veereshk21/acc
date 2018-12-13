
/* eslint-disable no-class-assign,no-nested-ternary */
/**
 * Created by mambig on 2/16/2017.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form/immutable';
import { Grid, Row, Col } from 'react-flexbox-grid';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import renderHTML from 'react-render-html';
import { renderTextField } from '../../common/TextField/';
import Title from '../../common/Title/Title';
import Loader from '../../common/Loader/Loader';
import BackButton from '../../common/BackButton/';
import HorizontalRule from '../../common/HorizontalRule';

const validate = (values, props) => {
  const errors = {};
  const { giftCards, dueToday } = props; // eslint-disable-line
  const cqLabel = props.cqContent.label;
  for (let index = 1; props.giftCardsLimit >= index; index++) {
    const giftCardNumber = values.get(`giftCardNumber_${index}`);
    const giftCardPin = values.get(`giftCardPin_${index}`);
    const amountToApply = values.get(`amountToApply_${index}`);
    const balance = values.get(`balance_${index}`);

    // Gift Card Pin
    if (!giftCardPin && giftCardNumber) {
      errors[`giftCardPin_${index}`] = cqLabel.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
    } else if (giftCardPin && giftCardPin.length < 6) {
      errors[`giftCardPin_${index}`] = cqLabel.OD_CHECKOUT_TEXT_FIELD_GENERIC_ERRROR;
    }

    // Amount to apply
    if (!amountToApply && balance) {
      errors[`amountToApply_${index}`] = cqLabel.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
    } else if (parseFloat(amountToApply) > parseFloat(balance)) {
      errors[`amountToApply_${index}`] = cqLabel.OD_CHECKOUT_GIFT_CARD_EXCEED_BALANCE;
    } else if (parseFloat(amountToApply) > parseFloat(dueToday)) {
      errors[`amountToApply_${index}`] = cqLabel.OD_CHECKOUT_GIFT_CARD_EXCEED_AMOUNT_DUE;
    } else if (amountToApply && !(/^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{1,2})?$/i.test(amountToApply))) {
      errors[`amountToApply_${index}`] = cqLabel.OD_CHECKOUT_TEXT_FIELD_GENERIC_ERRROR;
    }

    // Balance
    if (!balance && (giftCardPin || giftCardNumber)) {
      errors[`balance_${index}`] = cqLabel.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
    } else if (balance && !(/^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{1,2})?$/i.test(balance))) {
      errors[`balance_${index}`] = cqLabel.OD_CHECKOUT_TEXT_FIELD_GENERIC_ERRROR;
    }
  }
  return errors;
};

const allowOnlyNumbers = (value) => {
  if (!value) {
    return value;
  }
  // Reject other than numbers
  return value.replace(/[^\d]/g, '');
};
const allowOnlyMoney = (value) => {
  if (!value) {
    return value;
  }
  // Reject other than numbers and dot/decimal
  return value.replace(/[^\d|\.]/g, ''); // eslint-disable-line
};

const maskCard = (str) => (str.substring(0, str.length - 4).replace(/[0-9]/g, '*') + str.substring(str.length - 4, str.length));
// eslint-disable-next-line react/prop-types
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
        [`card_error_${i + 1}`]: '',
        [`card_ecrypted_${i + 1}`]: props.giftCards[i].isEncrypted,
        [`card_last_digits_${i + 1}`]: props.giftCards[i].lastDigits,
        [`card_identifier_${i + 1}`]: props.giftCards[i].giftCardNumber,
      };
    }
    this.state = {
      showMore: !(props.giftCards.length > 1 && props.giftCards[props.giftCards.length - 1].giftCardNumber),
      ...giftCardList,
    };
  }
  // material-ui specific method
  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }
  componentWillReceiveProps = (newProps) => {
    if (newProps.giftCardBalanceFetched) {
      // Giftcard balance was retrieved, updating the corresponding input
      const { giftCards } = newProps.data.output;
      for (let index = 1; giftCards.length >= index; index++) {
        this.props.change(`balance_${index}`, parseFloat(giftCards[index - 1].balance).toFixed(2));
      }
      this.props.invalidateAsyncFetch();
    } else if (newProps.giftCardsRemoved.length > 0) {
      // Remove was completed at a store level, clearing the corresponding inputs/states.
      for (let i = 0; newProps.giftCardsRemoved.length > i; i++) {
        for (let j = 1; newProps.giftCardsLimit >= j; j++) {
          if (newProps.giftCardsRemoved[i].giftCard === this.state[`card_identifier_${j}`]) {
            this.clearGiftCardInputs(j);
            break;
          }
        }
      }
      this.props.invalidateAsyncFetch();
    }
  };

  // Event Handler: Clears giftcard number input and states
  onCardFocus = (index) => {
    this.setState({
      [`card_number_${index}`]: '',
      [`masked_card_number_${index}`]: '',
      [`card_error_${index}`]: '',
      [`card_last_digits_${index}`]: '',
      [`card_ecrypted_${index}`]: false,
      [`card_identifier_${index}`]: '',
    });
    this.props.change(`balance_${index}`, '');
  }

  // Event Handler: Masks the card value and runs "cardErrorCheck"
  onCardBlur = (index) => {
    const str = this.state[`card_number_${index}`];
    this.setState({
      [`masked_card_number_${index}`]: maskCard(str),
    });
    this.cardErrorCheck(index);
  }

  // Event Handler: Normalizes giftcard and updates states
  onCardChange = (e, index) => {
    const normalizedValue = allowOnlyNumbers(e.target.value);
    this.setState({
      [`card_number_${index}`]: normalizedValue,
      [`masked_card_number_${index}`]: normalizedValue,
      [`card_last_digits_${index}`]: normalizedValue.slice(-4),
      [`card_identifier_${index}`]: normalizedValue,
    });
  }
  // Onclick event handler for Remove giftcard link
  onClickRemoveCard = (index) => {
    const { selectValue } = this.props;
    const giftCard = selectValue(`giftCardNumber_${index}`);
    let cardInOrder = false;
    const prompt = window.confirm(this.props.cqContent.label.OD_CHECKOUT_GIFT_CARD_REMOVE_PROMPT.replace('$NUMBER$', index));
    if (prompt) {
      for (let i = 0; this.props.giftCards.length > i; i++) {
        if (this.props.giftCards[i].giftCardNumber === giftCard) {
          cardInOrder = true;
          break;
        }
      }
      if (cardInOrder) {
        this.props.removeGiftCard([{
          giftCard,
          isEncrypted: this.state[`card_ecrypted_${index}`],
        }]);
      } else {
        this.clearGiftCardInputs(index);
      }
    }
  }

  // Clears redux form inputs and local state, does not trigger remove call`
  clearGiftCardInputs = (index) => {
    this.props.change(`giftCardNumber_${index}`, '');
    this.props.change(`giftCardPin_${index}`, '');
    this.props.change(`balance_${index}`, '');
    this.props.change(`amountToApply_${index}`, '');
    this.props.untouch(`giftCardPin_${index}`);
    this.props.untouch(`amountToApply_${index}`);

    this.setState({
      [`card_number_${index}`]: '',
      [`masked_card_number_${index}`]: '',
      [`card_error_${index}`]: '',
      [`card_last_digits_${index}`]: '',
      [`card_ecrypted_${index}`]: false,
      [`card_identifier_${index}`]: '',
    });
  }

  // Performs giftcard validation, needed as separate function due to masking
  cardErrorCheck = (index) => {
    const giftCardNumber = this.state[`card_number_${index}`];
    const cqLabel = this.props.cqContent.label;
    const { selectValue, giftCardsLimit } = this.props;
    // Gift Card Number
    if (!giftCardNumber && (selectValue(`giftCardPin_${index}`) || selectValue(`amountToApply_${index}`) || selectValue(`balance_${index}`))) {
      // errors[`giftCardNumber_${index}`] = cqLabel.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
      this.setState({ [`card_error_${index}`]: cqLabel.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT });
    } else if (giftCardNumber && giftCardNumber.length < 11) {
      // errors[`giftCardNumber_${index}`] = cqLabel.OD_CHECKOUT_TEXT_FIELD_GENERIC_ERRROR;
      this.setState({ [`card_error_${index}`]: cqLabel.OD_CHECKOUT_TEXT_FIELD_GENERIC_ERRROR });
    }
    for (let i = 1; giftCardsLimit >= i; i++) {
      if (i !== index && giftCardNumber === this.state[`card_number_${i}`]) {
        this.setState({ [`card_error_${index}`]: cqLabel.OD_CHECKOUT_TEXT_FIELD_GENERIC_ERRROR });
      }
    }
  }

  // Onclick event handler for "Remove giftcard 2" / "add another card" link, Updates state that determines which link to show
  showMoreOnClick = () => {
    if (!this.state.showMore) {
      this.onClickRemoveCard(2);
    }
    this.setState({
      showMore: !this.state.showMore,
    });
  }

  // Generates giftcard array and triggers check balance ajax call
  checkBalance = () => {
    const { selectValue } = this.props;
    const giftCardList = [];
    for (let index = 1; this.props.giftCardsLimit >= index; index++) {
      if (selectValue(`giftCardNumber_${index}`) && selectValue(`giftCardPin_${index}`)) {
        giftCardList.push({
          giftCard: selectValue(`giftCardNumber_${index}`),
          pin: selectValue(`giftCardPin_${index}`),
          isEncrypted: this.state[`card_ecrypted_${index}`],
          lastDigits: this.state[`card_last_digits_${index}`],
        });
      }
    }
    this.props.checkGiftCardBalance(giftCardList);
  };

  // Logic for check balance CTA status
  isCheckBalanceDisabled = () => {
    const { selectValue } = this.props;
    let disabled = true;
    for (let index = 1; this.props.giftCardsLimit >= index; index++) {
      if (disabled && selectValue(`giftCardNumber_${index}`) && !this.state[`card_error_${index}`] && selectValue(`giftCardPin_${index}`) && !selectValue(`balance_${index}`)) {
        disabled = false;
      }
    }
    return disabled;
  }

  isConfirmedDisabled = () => {
    const { valid, submitting, pristine } = this.props;
    let disabled = false;
    if (!valid || submitting || (!this.props.giftCardsUsed && pristine)) {
      disabled = true;
    } else {
      for (let index = 1; this.props.giftCardsLimit >= index; index++) {
        if (!disabled && this.state[`card_error_${index}`]) {
          disabled = true;
          break;
        }
      }
    }
    return disabled;
  }

  // Event Handler: Generates giftcard array and calls submitGiftCard
  handleSubmit = (data) => {
    const { submitGiftCard, selectValue } = this.props;
    const formData = data.toJS();
    const giftCardList = [];
    let giftCardAppliedValue = 0;
    for (let index = 1; this.props.giftCardsLimit >= index; index++) {
      if (formData[`giftCardNumber_${index}`] && formData[`giftCardPin_${index}`] && formData[`amountToApply_${index}`]) {
        giftCardAppliedValue += parseFloat(selectValue(`amountToApply_${index}`));
        giftCardList.push({
          giftCard: formData[`giftCardNumber_${index}`],
          pin: formData[`giftCardPin_${index}`],
          amountApplied: parseFloat(formData[`amountToApply_${index}`]),
          isEncrypted: this.state[`card_ecrypted_${index}`],
          lastDigits: this.state[`card_last_digits_${index}`],
        });
      }
    }
    if (giftCardAppliedValue > this.props.dueToday) {
      this.props.showErrorNotification(this.props.cqContent.label.OD_CHECKOUT_GIFT_CARD_TOTAL_EXCEED_AMOUNT_DUE);
    } else {
      submitGiftCard(giftCardList);
    }

    // updateServiceAddress(Object.assign({}, formData, { deviceId: this.props.params.deviceId }), cqContent.error.OD_CHECKOUT_ADDRESS_UPDATE_FAILURE_TEXT);
  };

  render() {
    const {
      cqContent, handleSubmit, isFetching, dueToday, giftCards,
    } = this.props;
    return (
      <Grid className="noSidePad pad12">
        {isFetching === true && <Loader />}
        <BackButton to="/" />
        <Row className="noSideMargin pad24">
          <Col xs={12}>
            <Title className="margin12 onlyTopMargin h2">{cqContent.label.OD_CHECKOUT_GIFT_CARD_TITLE}</Title>
            {cqContent.label.OD_CHECKOUT_GIFT_CARD_SUBTITLE &&
              <p dangerouslySetInnerHTML={{ __html: renderHTML(cqContent.label.OD_CHECKOUT_GIFT_CARD_SUBTITLE) }} />
            }

            <p>
              <span className="bold">{cqContent.label.OD_CHECKOUT_GIFT_CARD_DUE_TODAY}</span>
              ${dueToday}
            </p>
            <HorizontalRule />
          </Col>
        </Row>
        <Row className="noSideMargin pad24 onlySidePad">
          <Col xs={12}>
            {giftCards.map((giftcard, index) => (

              <form
                className={`clearfix ${index ? 'margin36 onlyTopMargin' : ''} ${(index && this.state.showMore) ? 'displayNone' : ''} `}
                key={`giftCardForm-${index}`}
              >
                <Row >
                  <Col xs={7}>
                    <Field
                      errorText={this.state[`card_error_${index + 1}`]}
                      className=""
                      id={`giftCardNumber_${index + 1}`}
                      name={`giftCardNumber_${index + 1}`}
                      component={renderTextField}
                      type="text"
                      label={(index === 0 ? cqContent.label.OD_CHECKOUT_GIFT_CARD_FORM_NUMBER_REQUIRED : cqContent.label.OD_CHECKOUT_GIFT_CARD_FORM_NUMBER_OPTIONAL).replace('$number$', index + 1)}
                      maxLength="16"
                      textFieldValue={this.state[`masked_card_number_${index + 1}`]}
                      onFocus={() => { this.onCardFocus(index + 1); }}
                      onBlur={() => { this.onCardBlur(index + 1); }}
                      onChange={(e) => { this.onCardChange(e, index + 1); }}
                      pattern="[0-9]*"
                      disabled={!!this.props.selectValue(`balance_${index + 1}`)}
                    />
                  </Col>

                  <Col xs={5}>
                    <Field
                      className=""
                      component={renderTextField}
                      id={`giftCardPin_${index + 1}`}
                      name={`giftCardPin_${index + 1}`}
                      normalize={allowOnlyNumbers}
                      maxLength="8"
                      label={(index === 0 ? cqContent.label.OD_CHECKOUT_GIFT_CARD_FORM_PIN_REQUIRED : cqContent.label.OD_CHECKOUT_GIFT_CARD_FORM_PIN_OPTIONAL).replace('$number$', index + 1)}
                      type="password"
                      disabled={!!this.props.selectValue(`balance_${index + 1}`)}
                    />
                  </Col>
                </Row>
                <Row className={this.props.selectValue(`balance_${index + 1}`) || this.props.selectValue(`amountToApply_${index + 1}`) ? '' : 'is-visuallyHidden'}>
                  <Col xs={7}>
                    <Field
                      className=""
                      component={renderTextField}
                      type="text"
                      id={`balance_${index + 1}`}
                      name={`balance_${index + 1}`}
                      normalize={allowOnlyMoney}
                      label={cqContent.label.OD_CHECKOUT_GIFT_CARD_FORM_BALANCE.replace('$number$', index + 1)}
                      disabled
                    />
                  </Col>
                  <Col xs={5}>
                    <Field
                      className=""
                      component={renderTextField}
                      type="text"
                      id={`amountToApply_${index + 1}`}
                      name={`amountToApply_${index + 1}`}
                      normalize={allowOnlyMoney}
                      label={cqContent.label.OD_CHECKOUT_GIFT_CARD_FORM_AMOUNT_APPLIED}
                    />
                  </Col>
                </Row>

              </form>
            ))
            }


          </Col>
        </Row>
        <Row className="noSideMargin pad24">
          <Col xs={12}>
            <a href="#/" analyticstrack="cancel-giftcard-view" className="link">Cancel</a>
          </Col>
        </Row>
        <Row className="textAlignCenter">
          <Col xs={12}>
            <div className="margin18">
              {this.props.selectValue('giftCardNumber_1') &&
                <span>
                  <a role="button" className="link" onClick={() => { this.onClickRemoveCard(1); }} analyticstrack="remove-giftcard">
                    {cqContent.label.OD_CHECKOUT_GIFT_CARD_REMOVE_GC.replace('$number$', 1)}
                  </a>
                  <span className="margin12 onlySideMargin displayInlineBlock">|</span>
                </span>
              }
              <a role="button" className="link" onClick={this.showMoreOnClick} analyticstrack="add-another-giftcard">
                {this.state.showMore ? cqContent.label.OD_CHECKOUT_GIFT_CARD_ADD_ANOTHER_GC : cqContent.label.OD_CHECKOUT_GIFT_CARD_REMOVE_GC.replace('$number$', giftCards.length)}
              </a>
            </div>
            <button
              className="secondary button large margin6 onlySideMargin"
              disabled={this.isCheckBalanceDisabled()}
              onClick={this.checkBalance}
              analyticstrack="check-giftcard-balance"
            >
              {cqContent.label.OD_CHECKOUT_GIFT_CARD_CHECK_BALANCE}
            </button>
            <button
              className="primary button large margin6 onlySideMargin"
              type="submit"
              disabled={this.isConfirmedDisabled()}
              analyticstrack="submit-giftcard-payment"
              onClick={
                handleSubmit(this.handleSubmit)
              }
            >
              {cqContent.label.OD_CHECKOUT_GIFT_CARD_CONFIRM}
            </button>
          </Col>
        </Row>
      </Grid>
    );
  }
}

GiftCards.childContextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

GiftCards.propTypes = {
  cqContent: PropTypes.object,
  dueToday: PropTypes.string,
  handleSubmit: PropTypes.func,
  valid: PropTypes.bool,
  submitting: PropTypes.bool,
  isFetching: PropTypes.bool,
  change: PropTypes.func,
  giftCards: PropTypes.array,
  giftCardsLimit: PropTypes.number,
  selectValue: PropTypes.func,
  checkGiftCardBalance: PropTypes.func,
  submitGiftCard: PropTypes.func,
  invalidateAsyncFetch: PropTypes.func,
  removeGiftCard: PropTypes.func,
  untouch: PropTypes.func,
  showErrorNotification: PropTypes.func,
  pristine: PropTypes.bool,
  giftCardsUsed: PropTypes.number,
};


GiftCards = reduxForm({
  form: 'giftCardsForm',
  validate,
})(GiftCards);

const selector = formValueSelector('giftCardsForm');

GiftCards = connect((state) => ({
  selectValue: (field) => selector(state, field),
}))(GiftCards);
export default GiftCards;
