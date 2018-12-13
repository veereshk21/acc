/**
 * Created by mambig on 2/4/2017.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form/immutable';
import TextField from 'material-ui/TextField';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import SavedCard from './SavedCard';
import styles from '../../common/Constants/FormStyles';
import Loader from '../../common/Loader/Loader';

const validate = (values, props) => {
  const errors = {};

  const cardCVC = values.get('card_cvc');

  if (!cardCVC) {
    errors.card_cvc = props.cqContent.label.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/i.test(cardCVC) || cardCVC.toString().length < 3 || cardCVC.toString().length > 3) {
    errors.card_cvc = props.cqContent.error.OD_CHECKOUT_MISSING_CVC_INVALID_CVC_ERROR;
  }

  return errors;
};

// eslint-disable-next-line react/prop-types
const renderField = ({
  input, label, type, meta: { active, touched, error }, ...custom
}) => (
  <TextField
    hintText={label}
    underlineFocusStyle={styles.underlineFocusStyle}
    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
    style={{ width: '100%', float: 'left' }}
    floatingLabelText={label}
    errorStyle={styles.errorStyle}
    errorText={!active && touched && error}
    type={type}
    {...input}
    {...custom}

  />
);
renderField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.object,
};
class MissingCVC extends Component {
  // material-ui specific method
  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  render() {
    const {
      cqContent, handleSubmit, valid, submitting, confirmPayment, isFetching, selectedCard, pieEnabled,
    } = this.props;
    const cardNumberStr = selectedCard.creditCardNumber.toString();
    const cardNumberSpliced = cardNumberStr.substring(cardNumberStr.length - 4);
    return (
      <div>
        {isFetching === true && <Loader />}

        <section className="pad20">
          <h2 className="textAlignCenter bold">{cqContent.label.OD_CHECKOUT_MISSING_CVC_TITLE_TEXT}</h2>

          <div className="margin36 onlyTopMargin clearfix" >
            <SavedCard cardName={selectedCard.savedCardNickName} cardNumber={cardNumberSpliced} cardType={selectedCard.creditCardType} />

            <form>
              <div className="clearfix">
                <Field className="leftAlign fontSize_4" name="card_cvc" id="card_cvc" component={renderField} type="password" label={cqContent.label.OD_CHECKOUT_MISSING_CVC_CREDIT_CARD_VERIFICATION_TEXT} />
              </div>
            </form>
          </div>

        </section>

        <Link to="/addPaymentMethod" className="textAlignCenter margin36 onlyTopMargin block link">{cqContent.label.OD_CHECKOUT_ADD_NEW_PAYMENT_METHOD_TEXT}</Link>

        <footer className="textAlignCenter width100 margin24 onlyTopMargin">
          <button
            className="button large"
            type="submit"
            disabled={!valid || submitting}
            onClick={
              handleSubmit((data) => {
                confirmPayment(Object.assign({}, data.toJS(), selectedCard));// dispatches add new card action
              })
            }
          >{cqContent.label.OD_CHECKOUT_MISSING_CVC_CTA_TEXT}
          </button>
        </footer>
      </div>
    );
  }
}

MissingCVC.propTypes = {
  selectedCard: PropTypes.object,
  cqContent: PropTypes.object,
  handleSubmit: PropTypes.func,
  valid: PropTypes.bool,
  submitting: PropTypes.bool,
  confirmPayment: PropTypes.func,
  isFetching: PropTypes.bool,
  pieEnabled: PropTypes.bool,
};


MissingCVC.childContextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

export default reduxForm({
  form: 'missingCVC',
  validate,
})(MissingCVC);
