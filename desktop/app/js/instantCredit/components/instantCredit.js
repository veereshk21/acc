/**
 * Created on 7/6/2017.
 */
/* eslint-disable no-unused-expressions */
import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { Row, Col } from 'react-flexbox-grid';

import PropTypes from 'prop-types';
import { renderTextField } from '../../common/TextField';
import Button from '../../common/Button/Button';
import Loader from '../../common/Loader/Loader';
import * as validation from '../../common/validation';
import AsyncComponent from '../../common/AsyncComponent';
import Notification from '../../common/Notification/Notification';

// import { parsePrice } from '../../common/Helpers';

const DeviceSwiper = AsyncComponent(() => import('./deviceSwiper'));


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
      showWarning: true,
      errorValidation: false,
      dynamicErrorMsg: '',
      formValue: {},
      formErrors: false,
    };
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
    if (e.target) {
      const inputPriceValue = parseFloat(e.target.value, 10);
      this.state.showWarning = false;
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
      if(this.state.icValue < 0 || isNaN(this.state.icValue)) { // eslint-disable-line
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
      isTotalCredit, tradeDeviceItems, cqLabel, cqHTML, cartDeviceItems, handleSubmit, wasPrice, tradeInPerMonth, submitting,
    } = this.props;
    return (
      <div className="section grid pad20 onlySidePad">
        {this.props.isFetching ? <Loader /> : ''}

        <DeviceSwiper
          wasPrice={wasPrice}
          isTotalCredit={isTotalCredit}
          tradeDeviceItems={tradeDeviceItems}
          cqLabel={cqLabel}
          cqHTML={cqHTML}
          tradeInPerMonth={tradeInPerMonth}
          showWarning={this.state.showWarning}
        />
        <div className="flexHorizontal border_00_thick" />

        <Row className="margin30 onlyTopMargin">
          <Col md={8} lg={6}>
            <h2 className="pad15 noSidePad">
              {cqLabel.get('OD_INSTANT_CREDIT_TITLE')}
              {isTotalCredit && <span>${isTotalCredit}</span>}
              {cqLabel.get('OD_INSTANT_CREDIT_TEXT')}
            </h2>
          </Col>
        </Row>
        <section>
          <Row>
            <Col md={8} lg={6}>
              <Row>
                <Col xs={5} className="border_black onlyBottomBorder" />
                <Col xs={3} className="border_black onlyBottomBorder pad10 onlyBottomPad bold lineHeight20">
                  <p>{cqLabel.get('OD_INSTANT_CREDIT_DUE_AMOUNT')}</p>
                </Col>
                <Col xs={4} className="border_black onlyBottomBorder pad10 onlyBottomPad bold lineHeight20">
                  <p>{cqLabel.get('OD_INSTANT_CREDIT_APPLY_AMOUNT')}</p>
                </Col>
              </Row>
            </Col>
          </Row>

          {cartDeviceItems && <form name="instantCreditForm" onChange={this.onFormChange.bind(this)}>
            {cartDeviceItems.map((item, index) => (
              <Row key={index} className="pad24 noSidePad">
                <Col md={8} lg={6}>
                  <Row>
                    <Col xs={5} className="bold lineHeight20">
                      <p>{cqLabel.get('OD_INSTANT_CREDIT_OPTIMAL_PAYMENT_TEXT')}</p>
                      <p>
                        {item.get('deviceBrand') && <span><span>{item.get('deviceBrand')}</span><span dangerouslySetInnerHTML={{ __html: cqHTML.get('OD_INSTANT_CREDIT_EMPTY_SPACE') }} /></span>}
                        <span dangerouslySetInnerHTML={{ __html: item.get('deviceName') }} />
                      </p>
                    </Col>
                    <Col xs={3}>
                      {item.get('edgeItemFullPrice') && <p className="lineHeight20">${item.get('edgeItemFullPrice')}</p>}
                    </Col>
                    <Col xs={4} className="creditAllocation">
                      <Field
                        component={renderTextField}
                        type="text"
                        id={`id-${index}`}
                        name={item.get('commerceItemId')}
                        className=""
                        placeHolder="$00.00"
                        analyticstrack={`update-price${index}`}
                        normalize={validation.allowOnlyMoneyWithOnly2Digits}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            ))}

            <Row className="textAlignLeft pad24 noSidePad">
              <Col md={8} lg={6}>
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
                  </div>}
              </Col>
            </Row>

            {(this.state.icValue && parseFloat(this.state.icValue, 10) > 0) ? <p className="pad20 noSidePad">{cqLabel.get('OD_INSTANT_CREDIT_BILL_CYCLE')}</p> : ''}

            <Row>
              <Col xs={4}>
                <div className="centerBlock textAlignLeft pad24 noSidePad">
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
              </Col>
            </Row>
          </form>}
        </section>

      </div>
    );
  }
}

InstantCreditComponent.propTypes = {
  isFetching: PropTypes.bool,
  cqLabel: PropTypes.object,
  cqHTML: PropTypes.object,
  isTotalCredit: PropTypes.string,
  tradeDeviceItems: PropTypes.array,
  cartDeviceItems: PropTypes.array,
  addSelectedItem: PropTypes.func,
  saveURL: PropTypes.string,
  handleSubmit: PropTypes.func,
  // invalid: PropTypes.bool,
  // pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  wasPrice: PropTypes.string,
  tradeInPerMonth: PropTypes.string,
};

export default reduxForm({
  // eslint-disable-line no-class-assign
  form: 'instantCreditForm',
  enableReinitialize: true,
  validate,
})(InstantCreditComponent);
