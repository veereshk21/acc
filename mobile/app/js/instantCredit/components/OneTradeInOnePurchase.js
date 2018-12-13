/**
 * Created on 08/09/2018.
 */
import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { reduxForm } from 'redux-form/immutable';
import PropTypes from 'prop-types';
import RadioButton from '../../common/RadioButton/';
import HorizontalRule from '../../common/HorizontalRule';
import Loader from '../../common/Loader/Loader';

class OneTradeInOnePurchase extends React.PureComponent {
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
      cqLabel, isTotalCredit, singleDevice,
    } = this.props;

    return (
      <Grid className="pad32">
        {this.props.isFetching ? <Loader /> : ''}
        <Row>
          <Col xs={12}>
            <h1 className="outlineNone h2">{cqLabel.get('OD_INSTANT_CREDIT_OTOP_TITLE_1')}{isTotalCredit}{cqLabel.get('OD_INSTANT_CREDIT_OTOP_TITLE_2')}</h1>
            <p className="margin10 onlyTopMargin">{cqLabel.get('OD_INSTANT_CREDIT_OTOP_SUB_TITLE')}</p>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="margin30 onlyTopMargin">
            <p className="fontSize_2">{cqLabel.get('OD_INSTANT_CREDIT_OTOP_DESC')}</p>
            <HorizontalRule />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <form method="POST" name="OneTradeInForm">
              {singleDevice && singleDevice.dueMonthlyAfterCredit && singleDevice.deviceName &&
                <Row>
                  <Col xs={12}>
                    <div>
                      <RadioButton
                        analyticstrack="choose-entire-amount"
                        value={singleDevice.instantCreditApplied}
                        id="entireAmount"
                        name="OTOPOptions"
                        onChange={this.selectOption.bind(this, singleDevice.commerceItemId)}
                      >
                        <p className="boldText displayBlock fontSize_4" dangerouslySetInnerHTML={{ __html: 'Pay $' + singleDevice.dueMonthlyAfterCredit + '/mo. for your ' + singleDevice.deviceName }} />
                        {singleDevice.instantCreditApplied && <p className="block margin10 onlyTopMargin">{cqLabel.get('OD_INSTANT_CREDIT_OTOP_ENTIRE_CREDIT_1')}{singleDevice.instantCreditApplied}{cqLabel.get('OD_INSTANT_CREDIT_OTOP_ENTIRE_CREDIT_2')}</p>}
                      </RadioButton>
                      <HorizontalRule y={1} color="#D8DADA" />
                    </div>
                  </Col>
                </Row>
              }
              {singleDevice && singleDevice.dueMonthly && singleDevice.deviceName &&
                <Row>
                  <Col xs={12}>
                    <div>
                      <RadioButton
                        analyticstrack="choose-offset-amount"
                        value="0.00"
                        id="offsetAmount"
                        name="OTOPOptions"
                        onChange={this.selectOption.bind(this, singleDevice.commerceItemId)}
                      >
                        <p className="boldText displayBlock fontSize_4" dangerouslySetInnerHTML={{ __html: 'Pay $' + singleDevice.dueMonthly + '/mo. for your ' + singleDevice.deviceName }} />
                        {isTotalCredit && <p className="block margin10 onlyTopMargin">{cqLabel.get('OD_INSTANT_CREDIT_OTOP_OFFSET_CREDIT_1')}{isTotalCredit}{cqLabel.get('OD_INSTANT_CREDIT_OTOP_OFFSET_CREDIT_2')}</p>}
                      </RadioButton>
                    </div>
                  </Col>
                </Row>
              }
            </form>
          </Col>
        </Row>
        <Row className="margin72 onlyBottomMargin">
          <Col xs={12} className="fontSize_2">{cqLabel.get('OD_INSTANT_CREDIT_OTOP_FOOTER_TEXT')}</Col>
        </Row>
        <Row className="footerFixed">
          <Col xs={12} className="fontSize_2">
            <button type="button" className="button primary large" disabled={!this.state.selectedOption} onClick={this.updateAllocation}>{cqLabel.get('OD_INSTANT_CREDIT_OTOP_CONTINUE_CTA')}</button>
          </Col>
        </Row>
      </Grid>
    );
  }
}

OneTradeInOnePurchase.propTypes = {
  cqLabel: PropTypes.object,
  singleDevice: PropTypes.object,
  isTotalCredit: PropTypes.string,
  addSelectedItem: PropTypes.func,
  saveURL: PropTypes.string,
  isFetching: PropTypes.bool,
};

export default reduxForm({
  form: 'OneTradeInForm',
  enableReinitialize: true,
})(OneTradeInOnePurchase);
