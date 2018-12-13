import { reduxForm } from 'redux-form/immutable';
import PropTypes from 'prop-types';
import React from 'react';

import * as Constants from '../constants';
import RadioButton from './../../common/RadioButton/index';
import AsyncComponent from '../../common/AsyncComponent';
const ToolTip = AsyncComponent(() => import('./../../common/ToolTip/index'));

class DppAgreementOptions extends React.Component { // eslint-disable-line
  render() {
    const dispData = this.props.selectedMDN && this.props.selectedMDN.loanInfo && this.props.selectedMDN.loanInfo.deviceMismatchText;
    if (this.props.selectedOption === Constants.DPP_BUYOUT_ONLY) {
      return (<span className="color_666">{this.props.selectedMDN.loanInfo.keepOptionDescription}</span>);
    }
    return (
      <form action="">
        {(dispData || (this.props.selectedMDN.loanInfo.edgeUpRequiredPercentage < 100 && this.props.selectedMDN.loanInfo.displayReturnOption)) &&
          <div className="pad36 noSidePad clearfix">
            <div className={`margin20 onlyRightMargin floatLeft ${(dispData) && 'disableFieldItem'}`}>
              <RadioButton
                id={Constants.DPP_RETURN}
                name="dppOption"
                value={Constants.DPP_RETURN}
                analyticstrack="select-dppOptionReturn-radio"
                disabled={!!dispData}
              />
            </div>
            <div className="floatLeft span_10_of_12">
              <span
                className={`bold fontSize_7 displayBlock ${(dispData) && 'disableFieldItem'}`}
              >{dispData ? this.props.cqContent.label.DT_OD_MDN_RETURN_OPTIONS_TRADEIN_TEXT : this.props.selectedMDN.loanInfo.returnOptionTitle}
              </span>
              {dispData ?
                <div>
                  <span className="pad3 onlyTopPad disableFieldItem">{this.props.cqContent.label.DT_OD_MDN_RETURN_OPTIONS_TRADEIN_MSG_NEW}</span>
                  <ToolTip
                    id="return-tradein-tooltip"
                    className="margin3 onlyLeftMargin displayInlineBlock"
                    ariaLabel="transfer upgrade information tooltip"
                    text={this.props.cqContent.label.DT_OD_MDN_RETURN_OPTIONS_TRADEIN_TOOLTIP_MSG}
                    noRenderHTML
                  />
                </div>
                :
                <div>
                  <span className="pad3 onlyTopPad block">{this.props.selectedMDN.loanInfo.returnOptionDescription}</span>
                  <span className="pad3 onlyTopPad block">{this.props.cqContent.label.DT_OD_MDN_RETURN_OPTIONS_TRADEIN_MSG}</span>
                </div>
              }
            </div>
          </div>
        }
        <div className="pad36 noSidePad clearfix border_grayThree onlyTopBorder">
          <div className="margin20 onlyRightMargin floatLeft">
            <RadioButton
              id={Constants.DPP_KEEP}
              name="dppOption"
              value={Constants.DPP_KEEP}
              analyticstrack="select-dppOption-keep-radio"
            />
          </div>
          <div className="floatLeft span_10_of_12">
            <span
              className="bold fontSize_7 displayBlock"
            >{this.props.selectedMDN.loanInfo.keepOptionTitle || (this.props.cqContent.label.DT_OD_MDN_KEEP_TEXT_LBL + this.props.selectedMDN.loanInfo.keepOptionAmt)}
            </span>
            <span className="pad3 onlyTopPad block">
              {this.props.cqContent.label.DT_OD_MDN_REMAINING_BALANCE}
            </span>
            <span className="pad3 onlyTopPad block">
              {this.props.cqContent.label.DT_OD_MDN_KEEP_OPTIONS_TRADEIN_MSG}
            </span>
          </div>
        </div>
      </form>
    );
  }
}

DppAgreementOptions.propTypes = {
  selectedMDN: PropTypes.object,
  cqContent: PropTypes.object,
  edgeUpRequiredPercentage: PropTypes.number,
  selectedOption: PropTypes.string,
};

export default reduxForm({
  form: 'dppOption',
})(DppAgreementOptions);
