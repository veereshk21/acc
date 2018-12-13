import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'react-flexbox-grid';
import { history } from './../../store';
import A from '../../common/A/A';
import Button from '../../common/Button/Button';
import * as Constants from '../constants';
import PromoBadge from '../../common/PromoBadge/PromoBadge';

export default class MDNDetails extends React.Component {
  constructor(props) {
    super(props);
    this.upgradeCheck = this.upgradeCheck.bind(this);
    this.showSummaryView = this.showSummaryView.bind(this);
    this.state = {
      isFetching: false,
    };
  }


  shouldComponentUpdate(nextProps) {
    if (typeof nextProps.preOrderResponse !== typeof undefined && nextProps.preOrderResponse !== null && nextProps.preOrderResponse !== this.props.preOrderResponse) {
      /**
       * Added to prevent multiple async calls to submit order.
       * */
      if (this.props.mdnDetails.get('mtn') === nextProps.preOrderResponse.mtnDetailsList[0].mtn) {
        this.showSummaryView(nextProps.selectedMDN);
      }
      return false;
    }
    return true;
  }


  /* --- Event Handlers --- */
  /**
   * Event handler for when the user clicks on upgrade
   * It will take the user to either the next page in flow (trade in,device config, etc) or the DPP Agreement route
   */

  upgradeCheck() {
    // Set this mdn as the selected one
    this.setState({
      isFetching: true,
    });

    // User has a device payment plan (dpp) loan and is eligible for upgrade
    const { accountLevelInEligibleDetails, ajaxCallSelectedMTN, getLoanInfoPreOrder } = this.props;
    const mdnDetails = this.props.mdnDetails.toJS();
    if (((mdnDetails.inEligibleCode === '08' || mdnDetails.inEligibleCode === '10' || mdnDetails.inEligibleCode === '11' || mdnDetails.inEligibleCode === '12' || mdnDetails.inEligibleCode === 'PENDING_SWITCH_ORDER' || mdnDetails.inEligibleCode === 'PENDING_ORDER') && mdnDetails.inEligibleDetails) || (accountLevelInEligibleDetails && accountLevelInEligibleDetails.accountLevelEUPInEligibleDetails)) {
      history.push(`/pendingOrder?mdn=${mdnDetails.mtn}`);
    } else if (typeof ajaxCallSelectedMTN !== 'undefined' && ajaxCallSelectedMTN !== null) {
      /* conditions swapped for iconic, if inEligibleDetails are present show pending order , else make the async call */
      getLoanInfoPreOrder(mdnDetails.encryptedMTN, ajaxCallSelectedMTN);
    } else {
      this.props.changeSelectedMDN(mdnDetails);
      if (mdnDetails.annualUpgradeWarning) {
        history.push(`/annualUpgrade?mdn=${mdnDetails.mtn}`);
      } else {
        this.showSummaryView();
      }
    }
  }

  showSummaryView(selectedMDN) {
    const mdnDetails = (typeof selectedMDN !== 'undefined' && selectedMDN !== null) ? selectedMDN : this.props.mdnDetails.toJS();
    if (mdnDetails.annualUpgradeWarning) {
      history.push(`/annualUpgrade?mdn=${mdnDetails.mtn}`);
    } else if (mdnDetails.loanInfo) {
      // this.props.changeMDNSelectionView(Constants.DPP_VIEW);
      history.push(`/dppAgreement?mdn=${mdnDetails.mtn}`);
    } else if (mdnDetails.alwaysEligibleForUpgrade) {
      // this.props.changeMDNSelectionView(Constants.ALWAYS_ELIGIBLE_VIEW);
      history.push(`/alwaysEligible?mdn=${mdnDetails.mtn}`);
    } else if (mdnDetails.twoYearContract) {
      // this.props.changeMDNSelectionView(Constants.TWO_YEAR_VIEW);
      history.push(`/earlyTwoYear?mdn=${mdnDetails.mtn}`);
    } else {
      this.props.onMTNUpgrade(mdnDetails.mtn, Constants.UPGRADE, mdnDetails.deviceType, mdnDetails.brand, mdnDetails.deviceId, this.props.ajaxCallUrl);
    }
  }


  render() {
    const { accountLevelInEligibleDetails } = this.props;
    const mdnDetails = this.props.mdnDetails.toJS();
    const isLineLevelEligible = mdnDetails.upgradeEligbile === true || (mdnDetails.inEligibleCode === '08' || mdnDetails.inEligibleCode === '12' || mdnDetails.inEligibleCode === '11' || mdnDetails.inEligibleCode === '10');
    const isAccLevelEligible = (accountLevelInEligibleDetails === null || (accountLevelInEligibleDetails.accountLevelEUPInEligibleDetails !== null && (accountLevelInEligibleDetails.accountLevelEUPInEligibleDetails.accountLevelInEligibleCode === '12' || accountLevelInEligibleDetails.accountLevelEUPInEligibleDetails.accountLevelInEligibleCode === '08' || accountLevelInEligibleDetails.accountLevelEUPInEligibleDetails.accountLevelInEligibleCode === 'PENDING_SWITCH_ORDER' || accountLevelInEligibleDetails.accountLevelEUPInEligibleDetails.accountLevelInEligibleCode === 'PENDING_ORDER')) || (accountLevelInEligibleDetails.accountLevelAALInEligibleDetails !== null && (accountLevelInEligibleDetails.accountLevelAALInEligibleDetails.accountLevelInEligibleCode === '12' || accountLevelInEligibleDetails.accountLevelAALInEligibleDetails.accountLevelInEligibleCode === '08' || accountLevelInEligibleDetails.accountLevelAALInEligibleDetails.accountLevelInEligibleCode === 'PENDING_ORDER' || accountLevelInEligibleDetails.accountLevelAALInEligibleDetails.accountLevelInEligibleCode === 'PENDING_SWITCH_ORDER')));
    const upgradeEligbile = isAccLevelEligible && isLineLevelEligible;
    const { buyoutRestrictedForEdge } = mdnDetails;

    const disableClass = (upgradeEligbile && !buyoutRestrictedForEdge) ? '' : 'disabled';
    const buttonAttr = (upgradeEligbile && !buyoutRestrictedForEdge) ? {} : { disabled: true };

    const { cqJSON } = this.props;
    const deviceName = mdnDetails.brand + (mdnDetails.displayDeviceName && mdnDetails.displayDeviceName.split('&reg;').concat(''));
    return (
      <Col xs={6} className="mtnWrapper">
        <Row>
          <Col xs={12} className="margin6 onlyBottomMargin fontDisplayMedium">
            {mdnDetails.nickname}
          </Col>
          <Col xs={12} className="margin6 onlyBottomMargin">
            {mdnDetails.displayMtn}
          </Col>
          <Col xs={12} className="margin24 noSideMargin">
            <img src={`${mdnDetails.imageUrl}&wid=80&hei=120`} srcSet={`${mdnDetails.imageUrl}&wid=160&hei=240 2x`} alt={deviceName} />
          </Col>

          <Col xs={12} className="margin6 onlyBottomMargin">
            {(mdnDetails.mtnAddedToTheCart) ?
              <A
                href={this.props.cartRedirect}
                className="button secondary tertiary"
                analyticstrack="redirect-to-cart"
              >{cqJSON.label.OD_MDN_CART_LINE_LIMIT_VIEW_CART_BUTTON_TEXT}
              </A> :
              <Button
                type="button"
                className={'button secondary tertiary ' + disableClass}
                {...buttonAttr}
                analyticstrack="upgrade-device"
                onClick={this.upgradeCheck}
              >{cqJSON.label.OD_MDN_UPGRADE_CTA}
              </Button>}
          </Col>
          <Col xs={12} className="margin6 onlyBottomMargin">
            {mdnDetails.upgradeMessage}
          </Col>
          <Col xs={12}>
            {
              (typeof mdnDetails.myOffersPromoText !== 'undefined' && mdnDetails.myOffersPromoText !== null) &&
              <PromoBadge className="m-configurator positionRelative width100 bottom0">
                <span dangerouslySetInnerHTML={{ __html: mdnDetails.myOffersPromoText }} />
              </PromoBadge>
            }
          </Col>
        </Row>
      </Col>
    );
  }
}

MDNDetails.propTypes = {
  cqJSON: PropTypes.object,
  mdnDetails: PropTypes.object,
  cartRedirect: PropTypes.string,
  ajaxCallSelectedMTN: PropTypes.string,
  getLoanInfoPreOrder: PropTypes.func,
  onMTNUpgrade: PropTypes.func,
  ajaxCallUrl: PropTypes.string,
  changeSelectedMDN: PropTypes.func,
  accountLevelInEligibleDetails: PropTypes.object,
  preOrderResponse: PropTypes.object,
};
