/**
 * Created by gautam on 2/5/2017.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Common Components */
import Button from '../../common/Button/Button';
import PayPalIcon from '../../../images/paypal.png';
/* Page Components */
import SmallDescription from './SmallDescription';

/* Page Containers */
import PageTitleContainer from '../containers/PageTitleContainer';
import EstimatedDeliveryContainer from '../containers/EstimatedDeliveryContainer';
import DeviceImageContainer from '../containers/DeviceImageContainer';
import OrderInfoContainer from '../containers/OrderInfoContainer';
import RecommendedAccessories from '../containers/RecommendedAccessoriesContainer';
// import PhoneCardContainer from '../containers/PhoneCardContainer';
// import ProtectionCardContainer from '../containers/ProtectionCardContainer';
// import AccessoriesCardContainer from '../containers/AccessoriesCardContainer';

/* eslint-disable react/prefer-stateless-function */
class Confirmation extends Component {
  componentDidMount() {
    /*
     FETCH RECOMMENDED ACCESSORIES
     */
    if (this.props.accessoryGWURL) this.props.getRecommendedAcc(this.props.accessoryGWURL);
  }

  onButtonClick = (event) => {
    window.location.href = event.target.value;
  }

  buildActionButtons(tradeInStatus) {
    const {
      doneButtonText,
      notNowButtonText,
      notNowButtonLink,
      learnHowButtonText,
      learnHowButtonLink,
      doneButtonLink,
    } = this.props;

    if (!tradeInStatus) {
      return (
        <div className="section group">
          <div className="col span_5_of_5 textAlignCenter pad20 onlyTopPad">
            <Button
              value={doneButtonLink}
              className="large button primary"
              onClick={this.onButtonClick}
              analyticstrack="comfirm-done"
            >
              {doneButtonText}
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="section group">
        <div className="col span_5_of_5 center pad20 onlyTopPad">
          <Button
            value={notNowButtonLink}
            className="large button secondary margin10 onlySideMargin"
            onClick={this.onButtonClick}
            analyticstrack="comfirm-not-nw-trade-in"
          >
            {notNowButtonText}
          </Button>
          <Button
            value={learnHowButtonLink}
            className="large button primary"
            onClick={this.onButtonClick}
            analyticstrack="comfirm-learnmore-trade-in"
          >
            {learnHowButtonText}
          </Button>
        </div>
      </div>
    );
  }

  render() {
    const {
      tradeInStatus,
      confirmationMessage,
      userNote,
      cjmTagUrl,
      pepperJamTagUrl,
      offerText,
      selectedPaymentMode,
      recommendedAccessories,
    } = this.props;
    const { isFetching, error, data } = recommendedAccessories;
    return (
      <div className="pad20 onlyTopPad">
        <PageTitleContainer />
        <EstimatedDeliveryContainer />
        {tradeInStatus ?
          <div className="pad42 onlySidePad">
            <SmallDescription text={confirmationMessage} />
          </div> : ''
        }
        <DeviceImageContainer className="confirmationProdImage" />
        {tradeInStatus ?
          <div>
            <OrderInfoContainer />
            <div className="pad42 onlySidePad">
              <SmallDescription text={userNote} />
            </div>
          </div> :
          <div>
            <div className="pad42 onlySidePad">
              <SmallDescription text={confirmationMessage} />
            </div>
            {offerText &&
              <div className="pad42 onlySidePad" dangerouslySetInnerHTML={{ __html: offerText }} />
            }
            <div className="pad10 onlyTopPad">
              <OrderInfoContainer />
            </div>
          </div>
        }
        {selectedPaymentMode === 'payPal' &&
          <div className="pad6 onlyTopPad fontTextBold textAlignCenter fontSize_2">
            Payment method<img src={PayPalIcon} className="margin6 onlyLeftMargin" alt="paypal" height="15px" width="60px" />
          </div>
        }
        {selectedPaymentMode === 'masterpass' &&
          <div className="pad6 onlyTopPad fontTextBold textAlignCenter fontSize_2">
            <span className="pad10 onlyBottomPad displayInlineBlock verticalAlignMiddle">Payment method </span> <img src="https://static.masterpass.com/dyn/img/acc/global/mp_mark_hor_blk.svg" alt="masterpass" height="16px" />
          </div>
        }
        {this.buildActionButtons(tradeInStatus)}
        {this.props.isHLLPlanInOrder &&
          <div className="pad42 onlySidePad margin20 noSideMargin">
            <p><span dangerouslySetInnerHTML={{ __html: this.props.militaryDiscInfoText }} /> <a className="link" href={this.props.militaryInfoURL}>{this.props.cqJSON.label.DT_OD_CONFIRMATION_MILITARY_DISCOUNT_READ_MORE}</a></p>
          </div>
        }
        {(isFetching === false && Object.keys(data).length > 0 && (data.output.recommendedAccessoriesDetails && data.output.recommendedAccessoriesDetails.length > 0)) && error === false &&
          <RecommendedAccessories />
        }
        <div className="affliates">
          <img src={cjmTagUrl} alt="Hidden Affliate" height="1" width="1" style={{ display: 'none' }} />
          <iframe src={pepperJamTagUrl} title="pepperJamTagUrl" width="1" height="1" frameBorder="0" style={{ display: 'none' }} />
        </div>
      </div>
    );
  }
}

Confirmation.defaultProps = {
  userNote: '',
  doneButtonText: null,
  notNowButtonText: null,
  notNowButtonLink: null,
  learnHowButtonText: null,
  learnHowButtonLink: null,
};

Confirmation.propTypes = {
  doneButtonLink: PropTypes.string,
  tradeInStatus: PropTypes.bool.isRequired,
  confirmationMessage: PropTypes.string.isRequired,
  userNote: PropTypes.string,
  doneButtonText: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  notNowButtonText: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  notNowButtonLink: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  learnHowButtonText: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  learnHowButtonLink: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  cjmTagUrl: PropTypes.string,
  pepperJamTagUrl: PropTypes.string,
  offerText: PropTypes.string,
  selectedPaymentMode: PropTypes.string,
  accessoryGWURL: PropTypes.string,
  getRecommendedAcc: PropTypes.func,
  recommendedAccessories: PropTypes.object,
  isHLLPlanInOrder: PropTypes.bool,
  militaryDiscInfoText: PropTypes.string,
  militaryInfoURL: PropTypes.string,
  cqJSON: PropTypes.object,
};

export default Confirmation;
