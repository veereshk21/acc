/**
 * Created by hmahad on 5/16/2017.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PastDueBalance extends Component {
  onButtonClick() {
    // this.props.onButtonClick(`${this.props.inEligibleDetails.cancelPlanChangeURL}`);
  }

  render() {
    const { cqContent, pastDueData } = this.props;
    const pastDueHeader = cqContent.html.DT_OD_PAST_DUE_BALANCE_TITLE.replace('%pastDuePrice%', pastDueData.pastDueAmount);
    return (
      <div className="grid pad20 noSidePad">
        <div>
          <div className="pad20">
            <h1 className="fontSize_10 positionRelative">
              <span className="bold" dangerouslySetInnerHTML={{ __html: pastDueHeader }} />
            </h1>
          </div>
          <div className="margin20 onlyLeftMargin">
            <p className="fontSize_2">{cqContent.label.DT_OD_PAST_DUE_BALANCE_TEXT_ONE}</p>
            <p className="fontSize_2" dangerouslySetInnerHTML={{ __html: cqContent.label.DT_OD_PAST_DUE_BALANCE_TEXT_SECOND }} />
          </div>
        </div>
        <div className="margin20">
          <a className="button large margin12 onlyRightMargin" analyticstrack="pay-balance-cta" href={pastDueData.nextLink}>{cqContent.label.DT_OD_PAST_DUE_BALANCE_PROCEED_CTA}</a>
          <a className="button large" analyticstrack="no-thanks-cta" href={pastDueData.noThanksLink}>{cqContent.label.DT_OD_PAST_DUE_BALANCE_CANCEL_CTA}</a>
        </div>
      </div>
    );
  }
}


PastDueBalance.propTypes = {
  cqContent: PropTypes.object,
  pastDueData: PropTypes.object,
};
