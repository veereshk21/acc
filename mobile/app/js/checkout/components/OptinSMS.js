import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form/immutable';
import { Row, Col } from 'react-flexbox-grid';

import Checkbox from '../../common/Checkbox/';
import HorizontalRule from '../../common/HorizontalRule';
import MSelect from '../../common/Select';


const formatPhoneNumber = (s) => {
  const s2 = ('' + s).replace(/\D/g, '');
  const m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
  return (!m) ? null : m[1] + '-' + m[2] + '-' + m[3];
};
class OptinSMS extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputChecked: true,
    };
  }
  handleOnChange = (e) => {
    this.props.updateOptInSmsNumber(e.target.value);
  }
  handleSmsOptin = (evt) => {
    this.setState({
      inputChecked: evt.target.checked,
    });
    this.props.smsOptin(evt.target.checked);
    console.log(this);
    this.props.updateOptInSmsNumber(this.optinMtn.value);
  }
  render() {
    const { cqContent, mtnList } = this.props;
    if (!mtnList || mtnList.length === 0) return null;
    return (
      <div >
        <form>
          <Row className="pad24 noBottomPad">
            <Col xs={12} className="margin24 onlyBottomMargin">
              <Checkbox
                name="optIN"
                id="optIN"
                component="input"
                type="checkbox"
                checked={this.state.inputChecked}
                tabIndex="-1"
                onChange={this.handleSmsOptin}
                aria-hidden
                analyticstrack="optin-sms"
              >
                <div className="pad24 onlyLeftPad" aria-label={`${cqContent.label.OD_CHECKOUT_SHIPPING_STATUS_TEXT} ${cqContent.label.OD_CHECKOUT_SHIPPING_STATUS_SELECT_NUMBER}`}>
                  <span>{cqContent.label.OD_CHECKOUT_SHIPPING_STATUS_TEXT}</span>

                  <div >
                    <MSelect
                      aria-label="Expiry Month"
                      label={cqContent.label.OD_CHECKOUT_SHIPPING_STATUS_SELECT_NUMBER}
                      labelClassName="fontDisplayMedium fontSize_1_3"
                      labelStyle={{ marginTop: '-35px' }}
                      marginTopValue={36}
                      name="smsOptin"
                      id="smsOptin"
                      disabled={!this.state.inputChecked}
                      onChange={this.handleOnChange}
                      borderStyle
                      ref={(mtn) => { this.optinMtn = mtn; }}
                      analyticstrack="choose-optin-sms"
                    >
                      {mtnList.map((optionLabel, id) => (<option key={id} value={optionLabel}>{formatPhoneNumber(optionLabel)}</option>))}
                    </MSelect>
                  </div>
                </div>
              </Checkbox>


            </Col>
            <Col xs={12}>
              <HorizontalRule y={1} margin={0} color="#D8DADA" />
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}

OptinSMS.propTypes = {
  cqContent: PropTypes.object,
  mtnList: PropTypes.array,
  updateOptInSmsNumber: PropTypes.func,
  smsOptin: PropTypes.func,
};

OptinSMS.defaultProps = {

};

export default reduxForm({
  form: 'agreementForm',
})(OptinSMS);
// export default ;
