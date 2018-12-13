import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { COST_CLARIFIER_AAL } from './Constants';
import CostClarifier from './CostClarifier';
import UpgradeHeader from './UpgradeHeader';

const headerContainer = {
  width: '100%',
  maxWidth: 1272,
  padding: '0 16px',
};
const upgraderHeaderDetails = (window.upgradeHeaderJSON && !isEmpty(window.upgradeHeaderJSON)) ? window.upgradeHeaderJSON : null;


class CostHeader extends React.PureComponent {
  static propTypes = {
    updateCostClarifier: PropTypes.object,
    getCostClarifierDetails: PropTypes.func,
    checkStatus: PropTypes.bool,
    show: PropTypes.bool,
    topHeight: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    const { getCostClarifierDetails } = this.props;
    const { ccEnabled, ccAjaxUrl } = upgraderHeaderDetails || {};
    if (ccEnabled) {
      getCostClarifierDetails(ccEnabled, ccAjaxUrl);
    }
  }

  render() {
    const {
      updateCostClarifier, checkStatus, show, topHeight,
    } = this.props;
    let updatedHeaderContainer = Object.assign({}, headerContainer);
    if (topHeight) {
      updatedHeaderContainer = Object.assign({}, updatedHeaderContainer, { marginTop: topHeight });
    }
    return (
      <div>
        {show === true && upgraderHeaderDetails &&
          <div
            className={`${upgraderHeaderDetails && upgraderHeaderDetails.ccEnabled ? 'height66' : ''} ${((upgraderHeaderDetails && upgraderHeaderDetails.flow !== COST_CLARIFIER_AAL) || updateCostClarifier) ? 'border_CC onlyBottomBorder margin12 onlyBottomMargin' : ''}`}
            style={updatedHeaderContainer}
            id="costHeader"
          >
            {!upgraderHeaderDetails.ccEnabled && upgraderHeaderDetails.flow !== COST_CLARIFIER_AAL
              && <UpgradeHeader upgraderHeaderDetails={upgraderHeaderDetails} />
            }
            {upgraderHeaderDetails.ccEnabled && (<CostClarifier updateCostClarifier={updateCostClarifier} checkStatus={checkStatus} />)}
          </div>}
      </div>
    );
  }
}

export default CostHeader;
