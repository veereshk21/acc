/**
 * Created on 7/6/2017.
 */
/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { reduxForm } from 'redux-form/immutable';
import { Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import Button from '../../common/Button/Button';
import AsyncComponent from '../../common/AsyncComponent';
import Loader from '../../common/Loader/Loader';
import RadioButton from '../../common/RadioButton/index';

const DeviceSwiper = AsyncComponent(() => import('./deviceSwiper'));

class OneTradeInOnePurchase extends Component {
  constructor(props) {
    super(props);
    this.selectOption = this.selectOption.bind(this);
    this.updateAllocation = this.updateAllocation.bind(this);
    this.state = {
      selectedOption: '',
    };
  }

  updateAllocation() {
    const requestParams = {
      deviceList: this.state.selectedOption,
      totalInstantCredit: this.props.isTotalCredit,
    };
    this.props.addSelectedItem(this.props.saveURL, requestParams);
  }

  selectOption(commerceItemId, event) {
    const selectedDevice = {};
    selectedDevice[commerceItemId] = event.target.value;
    this.setState({
      selectedOption: selectedDevice,
    });
  }

  render() {
    const {
      isTotalCredit, tradeDeviceItems, cqLabel, cqHTML, singleDevice, wasPrice, tradeInPerMonth,
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
        <hr className="margin20 onlyTopMargin" />
        <Row className="margin20 onlyTopMargin">
          <Col md={8} lg={6}>
            <h2 className="pad15 noSidePad">
              {cqLabel.get('OD_INSTANT_CREDIT_OTOP_TITLE_1')}
              {isTotalCredit && <span>{isTotalCredit}</span>}
              {cqLabel.get('OD_INSTANT_CREDIT_OTOP_TITLE_2')}
            </h2>
            <p>{cqLabel.get('OD_INSTANT_CREDIT_OTOP_SUB_TITLE')}</p>
          </Col>
        </Row>
        <form method="post" name="OneTradeInOnePurchaseForm">
          <Row className="pad24 noSidePad">
            {singleDevice && singleDevice.dueMonthlyAfterCredit && singleDevice.deviceName &&
              <Col xs={10}>
                <RadioButton
                  name="OneTradeInOnePurchaseRadio"
                  id="OneTradeInOnePurchaseRadio_1"
                  value={singleDevice.instantCreditApplied}
                  labelClassName="verticalTop displayInlineBlock pad12 onlyLeftPad"
                  analyticstrack="select-entire-amount"
                  onChange={this.selectOption.bind(this, singleDevice.commerceItemId)}
                >
                  <div className="fontSize_4 bold"><span>Pay ${singleDevice.dueMonthlyAfterCredit}/mo. for your </span><span dangerouslySetInnerHTML={{ __html: singleDevice.deviceName }} /></div>
                  {singleDevice.instantCreditApplied &&
                    <div className="fontSize_4 pad10 noSidePad">{cqLabel.get('OD_INSTANT_CREDIT_OTOP_ENTIRE_CREDIT_1')}{singleDevice.instantCreditApplied}{cqLabel.get('OD_INSTANT_CREDIT_OTOP_ENTIRE_CREDIT_2')}</div>
                  }
                </RadioButton>
              </Col>
            }
            {singleDevice && singleDevice.dueMonthly && singleDevice.deviceName &&
              <Col xs={10}>
                <RadioButton
                  name="OneTradeInOnePurchaseRadio"
                  id="OneTradeInOnePurchaseRadio_2"
                  value="0.00"
                  labelClassName="verticalTop displayInlineBlock pad12 onlyLeftPad"
                  analyticstrack="select-offset-amount"
                  onChange={this.selectOption.bind(this, singleDevice.commerceItemId)}
                >
                  <div className="fontSize_4 bold"><span>Pay ${singleDevice.dueMonthly}/mo. for your </span><span dangerouslySetInnerHTML={{ __html: singleDevice.deviceName }} /></div>
                  {isTotalCredit && <div className="fontSize_4 pad10 noSidePad">{cqLabel.get('OD_INSTANT_CREDIT_OTOP_OFFSET_CREDIT_1')}{isTotalCredit}{cqLabel.get('OD_INSTANT_CREDIT_OTOP_OFFSET_CREDIT_2')}</div>}
                </RadioButton>
              </Col>
            }
          </Row>

          <Row>
            <Col xs={4}>
              <div className="textAlignLeft pad24 noSidePad margin30 onlyLeftMargin">
                <Button
                  type="button"
                  className="button primary width50"
                  role="button"
                  disabled={!this.state.selectedOption}
                  onClick={this.updateAllocation}
                  analyticstrack="instantCredit-selection-ctnBtn"
                >
                  {cqLabel.get('OD_INSTANT_CREDIT_NEXT_BTN')}
                </Button>
              </div>
            </Col>
          </Row>
          <p className="pad20 noSidePad margin30 onlyLeftMargin">{cqLabel.get('OD_INSTANT_CREDIT_OTOP_FOOTER_TEXT')}</p>
        </form>
      </div>
    );
  }
}
OneTradeInOnePurchase.propTypes = {
  isFetching: PropTypes.bool,
  cqLabel: PropTypes.object,
  cqHTML: PropTypes.object,
  tradeDeviceItems: PropTypes.array,
  isTotalCredit: PropTypes.string,
  addSelectedItem: PropTypes.func,
  saveURL: PropTypes.string,
  wasPrice: PropTypes.string,
  singleDevice: PropTypes.object,
  tradeInPerMonth: PropTypes.string,
};

export default reduxForm({
  // eslint-disable-line no-class-assign
  form: 'OneTradeInOnePurchaseForm',
  enableReinitialize: true,
})(OneTradeInOnePurchase);
