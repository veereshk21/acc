import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './../../common/Button/Button';

export default class LimitExceeded extends Component { // eslint-disable-line

  render() {
    const { cqContent, skipUpgradeURL } = this.props;
    let skipUpgradePlanUrl;


    if (skipUpgradeURL) {
      skipUpgradePlanUrl = skipUpgradeURL;
    } else {
      skipUpgradePlanUrl = cqContent.label.OD_SKIP_UPGRADE_PLAN_BUTTON_LINK;
    }

    return (
      <div>
        <div>
          <div className="textAlignCenter">
            <div className="vh80 ">
              <div className="pad48 ">
                <div className="pad60 onlyTopPad">
                  <i className="f-icon_sad" />
                </div>
                <h2 className="fontSize_5 pad20">{cqContent.label.OD_SKIP_UPGRADE_PLAN_HEADER}</h2>
                <p>{cqContent.label.OD_SKIP_UPGRADE_PLAN_TXT}</p>
              </div>
            </div>
            <div>
              <Button className="primary large margin12 onlyLeftMargin" type="button" onClick={() => this.props.onClickToRedirectUrl(skipUpgradePlanUrl)} analyticstrack="skip-upgrade">
                {cqContent.label.OD_SKIP_UPGRADE_PLAN_BUTTON_TXT}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LimitExceeded.propTypes = {
  cqContent: PropTypes.object,
  onClickToRedirectUrl: PropTypes.func,
  skipUpgradeURL: PropTypes.string,
};
