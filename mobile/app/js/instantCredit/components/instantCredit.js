/**
 * Created on 7/6/2017.
 */
/* eslint-disable no-unused-expressions */
import React from 'react';
// import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form/immutable';
import { Grid, Row, Col } from 'react-flexbox-grid';

import PropTypes from 'prop-types';
import * as validation from '../../common/validation';
import { renderTextField } from '../../common/TextField';
import HorizontalRule from '../../common/HorizontalRule';
import Button from '../../common/Button/Button';
import Title from '../../common/Title/Title';
import Loader from '../../common/Loader/Loader';
import Notification from '../../common/Notification/Notification';


const validate = (price, props) => {
  const errors = price.toJS();
  for (const key in errors) {
    const value = errors[key];
    errors[key] = '';
    props.cartDeviceItems.map((data) => { // eslint-disable-line
      if (parseFloat(value) < 0) {
        errors[key] = props.cqLabel.get('OD_INSTANT_CREDIT_IC_PRICE_ERROR');
      } else if ((key === data.get('commerceItemId') && parseFloat(value) > parseFloat(data.get('maxEdgeItemFullPrice')))) {
        errors[key] = `Please enter a valid amount.You can use up to $ ${parseFloat(data.get('maxEdgeItemFullPrice'))} towards this optional down payment, if max total instant credit is $${parseFloat(data.get('edgeItemFullPrice'))}`;
      }
      return errors[key];
    });
  }
  return errors;
};

class InstantCreditComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      icValue: props.isTotalCredit,
      errorValidation: false,
      dynamicErrorMsg: '',
      formValue: {},
      formErrors: false,
    };
  }
  componentDidMount() {
    if (this.props.cartDeviceItems && this.props.cartDeviceItems.toJS().length > 0) {
      this.props.showErrorNotification(this.props.cqLabel.get('OD_INSTANT_CREDIT_ALLOCATION_NOTIFICATION_TXT'));
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.invalid) {
      this.setState({ formErrors: true });
    } else {
      this.setState({ formErrors: false });
    }
  }
  onFormChange(e) {
    this.setState({ errorValidation: false, dynamicErrorMsg: '' });
    this.props.hideNotification();
    if (e.target) {
      const inputPriceValue = parseFloat(e.target.value).toFixed(2);
      this.state.formValue[e.target.name] = (isNaN(inputPriceValue) ? 0 : inputPriceValue); // eslint-disable-line
      let inputVal = 0;
      for (const credit in this.state.formValue) {
        if (parseFloat(this.state.formValue[credit]) < -1) {
          this.setState({ errorValidation: true });
        } else if (parseFloat(inputVal) > -1 && parseFloat(this.state.formValue[credit]) > -1) {
          inputVal = parseFloat(inputVal) + parseFloat(this.state.formValue[credit]);
        } else if (parseFloat(this.state.formValue[credit]) > -1 || parseFloat(inputVal) > -1) {
          inputVal = parseFloat(this.state.formValue[credit]);
        }
      }

      this.state.icValue = parseFloat(this.props.isTotalCredit, 10) - parseFloat(inputVal, 10);
      if (this.state.icValue < 0 || isNaN(this.state.icValue)) { // eslint-disable-line
        this.setState({ errorValidation: true });
        this.setState({ dynamicErrorMsg: this.props.cqLabel.get('OD_INSTANT_CREDIT_IC_PRICE_ERROR') });
      }
    }
  }

  onSaveCredit = (values) => {
    const list = {};
    this.props.cartDeviceItems.map((data) => {  // eslint-disable-line      
      list[data.get('commerceItemId')] = (!values.get(data.get('commerceItemId'))) ? '0.00' : values.get(data.get('commerceItemId'));
    });
    const requestParams = {
      deviceList: list,
      totalInstantCredit: this.props.isTotalCredit,
    };
    this.props.addSelectedItem(this.props.saveURL, requestParams);
  }


  render() {
    const {
      isTotalCredit, cartDeviceItems, cqLabel, cqHTML, handleSubmit, submitting, tradeDeviceItems,
    } = this.props;

    return (
      <Grid>
        {this.props.isFetching ? <Loader /> : ''}
        <Title
          tabIndex="0"
          className="pad15"
        >
          {cqLabel.get('OD_INSTANT_CREDIT_TITLE')}
          {isTotalCredit && <span>${isTotalCredit}</span>}
          {cqLabel.get('OD_INSTANT_CREDIT_TEXT')}
        </Title>
        <p className="pad15 onlySidePad">{cqLabel.get('OD_INSTANT_CREDIT_EXPLANATION_TEXT')}</p>
        {tradeDeviceItems &&
          <Row className="pad15">
            <Col xs={12}>
              {tradeDeviceItems.get('tradeInDevicesVos') && tradeDeviceItems.get('tradeInDevicesVos').map((item, index) => (!item.get('bicApplied')) && (
                <div className="Pad10 noSidePad" key={index}>
                  <p className="bold">
                    {item.get('deviceBrand') && <span>{item.get('deviceBrand')}</span>}
                    {item.get('displayName') && <span>{` ${item.get('displayName')}`}</span>}
                    {item.get('size') && <span>{` ${item.get('size')}`}</span>}
                    {item.get('color') && <span>{` ${item.get('color')}`}</span>}
                  </p>
                  {item.get('deviceId') &&
                    <p>
                      <span>{cqLabel.get('OD_INSTANT_CREDIT_DEVICE_ID_TXT')}</span>
                      <span>{item.get('deviceId')}</span>
                    </p>
                  }
                  {item.get('originalAppraisalPrice') &&
                    <p className="pad15 noSidePad">
                      <span>{cqLabel.get('OD_INSTANT_CREDIT_MARKET_VALUE_TXT')}</span>
                      <span>${item.get('originalAppraisalPrice')}</span>
                    </p>
                  }
                </div>
              ))}
            </Col>
          </Row>
        }
        {cartDeviceItems &&
          <Row>
            <Col xs={12}>
              {cartDeviceItems.toJS().length > 0 && <HorizontalRule y={3} color="#000" />}
              <form onChange={this.onFormChange.bind(this)} name="instantCreditForm">
                {cartDeviceItems.map((item, index) => (
                  <div>
                    <Row key={index} className="pad15">
                      <Col xs={7} className="bold lineHeight20">
                        <span>{cqLabel.get('OD_INSTANT_CREDIT_OPTIMAL_PAYMENT_TEXT')}</span>
                        {item.get('deviceBrand') && <span><span>{item.get('deviceBrand')}</span><span dangerouslySetInnerHTML={{ __html: cqHTML.get('OD_INSTANT_CREDIT_EMPTY_SPACE') }} /></span>}
                        <span dangerouslySetInnerHTML={{ __html: item.get('deviceName') }} />
                      </Col>
                      <Col xs={5}>
                        <p className="bold lineHeight20">{cqLabel.get('OD_INSTANT_CREDIT_DUE_AMOUNT')}</p>
                        {item.get('edgeItemFullPrice') && <p className="h3 lineHeight20 pad10 noSidePad">${item.get('edgeItemFullPrice')}</p>}

                        <p className="bold lineHeight20 pad10 onlyBottomPad">{cqLabel.get('OD_INSTANT_CREDIT_APPLY_AMOUNT')}</p>
                        <Field
                          component={renderTextField}
                          type="text"
                          id={`id-${index}`}
                          name={item.get('commerceItemId')}
                          className="margin10 onlyBottomMargin"
                          placeHolder="$00.00"
                          analyticstrack={`update-price${index}`}
                          normalize={validation.allowOnlyMoneyWithOnly2Digits}
                        />
                      </Col>
                    </Row>
                    <HorizontalRule y={3} color="#000" />
                  </div>
                ))}
                {/*
                  <Row className="pad15">
                    <Col xs={7} className="h3 bold lineHeight20">
                      {cqLabel.get('OD_INSTANT_CREDIT_APPLY_TOTAL_DUE_AMOUNT')}
                    </Col>
                    <Col xs={5}>
                      <p className="h3 bold lineHeight20">{cqLabel.get('OD_INSTANT_CREDIT_DUE_AMOUNT')}</p>
                      {totalDueToday && <p className="h3 lineHeight20 pad10 noSidePad">${totalDueToday}</p>}

                      <p className="h3 bold lineHeight20 pad10 onlyBottomPad">{cqLabel.get('OD_INSTANT_CREDIT_APPLY_AMOUNT')}</p>
                      <Field
                        component={renderTextField}
                        type="text"
                        id="totalDueToday"
                        name="totalDueToday"
                        className=""
                        onChange={this.priceChanged}
                        tabIndex="-1"
                        onBlur={this.onFieldBlur}
                        onFocus={this.onFieldFocus}
                        analyticstrack="update-totalDuePrice"
                      />
                      <p>{this.priceChanged}</p>
                    </Col>
                  </Row>
                  <HorizontalRule y={3} color="#000" />

                  <Row className="pad15">
                    <Col xs={7} className="h3 bold lineHeight20">
                      <p className="pad10 onlyRightPad">
                        {cqLabel.get('OD_INSTANT_CREDIT_REMAINING_AMOUNT')}
                      </p>
                    </Col>
                    <Col xs={5}>
                      {totalDueToday && <p className="h3 lineHeight20 pad10 noSidePad">${totalDueToday}</p>}
                    </Col>
                  </Row>
                  <HorizontalRule y={3} color="#000" />
                */}
              </form>
            </Col>
          </Row>
        }

        <Row className="textAlignLeft">
          <Col xs={12}>
            {this.state.errorValidation ?
              <Notification message={this.state.dynamicErrorMsg} type="error" noClose noIcon /> :
              <div>
                {this.state.icValue && parseFloat(this.state.icValue, 10) > 0 ?
                  <p>
                    <span>{cqLabel.get('OD_INSTANT_CREDIT_BALANCE_IC')}</span>
                    <span>${parseFloat(this.state.icValue) ? parseFloat(this.state.icValue, 10).toFixed(2) : this.state.icValue}</span>
                    <span>{cqLabel.get('OD_INSTANT_CREDIT_BALANCE_IC_DUE_TODAY')}</span>
                  </p> :
                  <p>
                    {(parseFloat(this.state.icValue, 10) === 0) ? <span>{cqLabel.get('OD_INSTANT_CREDIT_ZERO_REMAINING_BALANCE_IC')}${parseFloat(this.state.icValue, 10).toFixed(2)}</span> : ''}
                  </p>
                }
              </div>
            }
          </Col>
        </Row>
        {this.state.icValue && parseFloat(this.state.icValue, 10) > 0 ? <p className="pad10 noSidePad textAlignLeft">{cqLabel.get('OD_INSTANT_CREDIT_BILL_CYCLE')}</p> : ''}

        {(this.state.errorValidation || (this.state.icValue && (parseFloat(this.state.icValue, 10) > 0 || parseFloat(this.state.icValue, 10) === 0))) && <HorizontalRule y={3} color="#000" />}

        {tradeDeviceItems &&
          <Row className="pad10 noSidePad">
            <Col xs={12} className="pad10">
              {tradeDeviceItems.get('tradeInDevicesVos') && tradeDeviceItems.get('tradeInDevicesVos').map((item, index) => (item.get('bicApplied')) && (
                <div className="Pad10 noSidePad" key={index}>
                  {item.get('promoValue') &&
                    <div className="margin20 noSideMargin">
                      <Notification message={cqLabel.get('OD_INSTANT_CREDIT_TRADE_IN_PROMO_PRICE_TEXT') + item.get('promoValue') + cqLabel.get('OD_INSTANT_CREDIT_TRADE_IN_PROMO_RECEIPT_TEXT')} type="info" noClose noIcon />
                    </div>
                  }
                  <p className="bold">
                    {item.get('deviceBrand') && <span>{item.get('deviceBrand')}</span>}
                    {item.get('displayName') && <span>{item.get('displayName')}</span>}
                    {item.get('size') && <span>{item.get('size')}</span>}
                    {item.get('color') && <span>{item.get('color')}</span>}
                  </p>
                  {item.get('deviceId') &&
                    <p>
                      <span>{cqLabel.get('OD_INSTANT_CREDIT_DEVICE_ID_TXT')}</span>
                      <span>{item.get('deviceId')}</span>
                    </p>
                  }
                  {item.get('originalAppraisalPrice') &&
                    <p className="pad15 noSidePad">
                      <span>{cqLabel.get('OD_INSTANT_CREDIT_ESTIMATED_MARKET_VALUE_TXT')}</span>
                      <span>${item.get('originalAppraisalPrice')}</span>
                    </p>
                  }
                  {item.get('promoValue') &&
                    <p className="pad15 noSidePad">
                      <span>{cqLabel.get('OD_INSTANT_CREDIT_PROMOTIONAL_VALUE_TXT')}</span>
                      <span>${item.get('promoValue')}</span>
                    </p>
                  }
                  {item.get('dppCredit') && <div>{`($${item.get('dppCredit')}/mo over 24 months)`}</div>}
                </div>
              ))}
            </Col>
          </Row>
        }
        <div className="centerBlock textAlignCenter pad15">
          <Button
            type="button"
            className="button primary width50"
            role="button"
            disabled={this.state.formErrors || this.state.errorValidation || submitting}
            onClick={
              handleSubmit((data) => {
                this.onSaveCredit(data);
              })
            }
            analyticstrack="instantCredit-selection-ctnBtn"
          >
            {cqLabel.get('OD_INSTANT_CREDIT_NEXT_BTN')}
          </Button>
        </div>
      </Grid>
    );
  }
}

InstantCreditComponent.propTypes = {
  isFetching: PropTypes.bool,
  cqLabel: PropTypes.object,
  cqHTML: PropTypes.object,
  isTotalCredit: PropTypes.string,
  cartDeviceItems: PropTypes.array,
  addSelectedItem: PropTypes.func,
  saveURL: PropTypes.string,
  handleSubmit: PropTypes.func,
  tradeDeviceItems: PropTypes.object,
  showErrorNotification: PropTypes.func,
  hideNotification: PropTypes.func,
  invalid: PropTypes.bool,
  // pristine: PropTypes.bool,
  submitting: PropTypes.bool,
};

export default reduxForm({
  // eslint-disable-line no-class-assign
  form: 'instantCreditForm',
  enableReinitialize: true,
  validate,
})(InstantCreditComponent);
