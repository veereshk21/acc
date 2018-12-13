import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import * as Constants from '../constants';
import RadioButton from '../../common/RadioButton/';
import HorizontalRule from '../../common/HorizontalRule';

export default class DPPAgreementOptions extends React.Component { // eslint-disable-line
  render() {
    const { edgeUpRequiredPercentage } = this.props;
    if (this.props.selectedOption === Constants.DPP_BUYOUT_ONLY) {
      return (<span className="color_666">{this.props.selectedMDN.loanInfo.keepOptionDescription}</span>);
    }
    return (
      <Row>
        <form action="">
          {edgeUpRequiredPercentage < 100 && this.props.selectedMDN.loanInfo.displayReturnOption &&
            <Col xs={12}>
              <RadioButton
                name="dppOption"
                value={Constants.DPP_RETURN}
                id={Constants.DPP_RETURN}
                onChange={this.props.dppOptionChange}
                analyticstrack="choose-dpp-return"
              >
                <p className="fontSize_1_3 fontDisplayMedium" dangerouslySetInnerHTML={{ __html: this.props.selectedMDN.loanInfo.returnOptionTitle }} />
                <div className="color_gray_six fontSize_1_3">
                  <p className="margin6 onlyBottomMargin">{this.props.selectedMDN.loanInfo.returnOptionDescription}</p>
                  {this.props.selectedMDN.loanInfo.returnOptionLegal &&
                    <p className="margin6 onlyBottomMargin">{this.props.selectedMDN.loanInfo.returnOptionLegal}</p>
                  }
                </div>
              </RadioButton>
              <HorizontalRule y={1} color="#D8DADA" />
            </Col>}
          <Col xs={12}>
            <RadioButton
              name="dppOption"
              value={Constants.DPP_KEEP}
              id={Constants.DPP_KEEP}
              onChange={this.props.dppOptionChange}
              analyticstrack="choose-dpp-keep"
            >
              <p className="fontSize_1_3 fontDisplayMedium" dangerouslySetInnerHTML={{ __html: this.props.selectedMDN.loanInfo.keepOptionTitle }} />
              <div className="color_gray_six fontSize_1_3">
                <p className="margin6 onlyBottomMargin">{this.props.selectedMDN.loanInfo.keepOptionDescription}</p>
                {this.props.selectedMDN.loanInfo.keepOptionLegal &&
                  <p className="margin6 onlyBottomMargin">{this.props.selectedMDN.loanInfo.keepOptionLegal}</p>
                }
              </div>
            </RadioButton>
            <HorizontalRule y={1} color="#D8DADA" />
          </Col>
        </form>
      </Row>
    );
  }
}

DPPAgreementOptions.propTypes = {
  selectedMDN: PropTypes.object,
  selectedOption: PropTypes.string,
  dppOptionChange: PropTypes.func,
  edgeUpRequiredPercentage: PropTypes.number,
};
