import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import SelectListItem from '../../common/SelectListItem/';

export default class CartPriceBreakdown extends Component {
  constructor(props) {
    super(props);
    this.removePromoCode = this.removePromoCode.bind(this);
  }

  removePromoCode(promoCode, event) {
    event.stopPropagation();
    event.preventDefault();
    /** TODO:An ajax call to determine new prices */
    this.props.removePromoCode(promoCode);
  }

  togglePastDueMsg(event) {
    event.preventDefault();
    this.props.history.push('/cartPastDueMessage'); // eslint-disable-line
  }

  render() {
    const isEligibleAndNotTradedIn = (this.props.tradeInPromoEligible && this.props.tradeInPromoDetails === null);
    let tradeInValue = null;
    if (!this.props.tradeInCredit) tradeInValue = '$0.00';
    else if (this.props.tradeInCredit < 0) {
      /* Added for Defect CIS-15979 */
      tradeInValue = '-$' + parseFloat(-(this.props.tradeInCredit), 10).toFixed(2);
    } else {
      tradeInValue = '$' + this.props.tradeInCredit;
    }
    let promoCodeEnteredString = this.props.CQLabel.get('OD_CART_ADD_PROMO_TEXT');
    if (this.props.promoCodes && this.props.promoCodes.size) {
      promoCodeEnteredString = this.props.CQLabel.get('OD_CART_ADD_ANOTHER_PROMO_TEXT');
    }
    // standaloneAccessories: If order has only standalone Accessories,  hide few sections
    const {
      CQLabel, standaloneAccessories, overallDueMonthly, instantCreditOrder,
    } = this.props;

    return (
      <Row className="noSideMargin pad24 noTopPad margin12 onlyBottomMargin">
        <Col xs={12} className=" ensighten_priceBreakdown">

          {standaloneAccessories === false && parseFloat(this.props.pastDueBalance) > 0 &&
            <SelectListItem
              onClickMethod={this.togglePastDueMsg.bind(this)}
              title={this.props.CQLabel.get('OD_CART_DUE_TODAY_PAST_DUE_BALANCE')}
              value={'$' + this.props.pastDueBalance}
            />
          }
          <SelectListItem
            title={CQLabel.get('OD_CART_DEVICE_DUE_TODAY_TITLE')}
            to="/duetoday"
            value={'$' + this.props.totalDueToday}
          />
          {standaloneAccessories === false && <SelectListItem
            title={CQLabel.get('OD_CART_DEVICE_DUE_MONTHLY_TITLE')}
            to="/duemonthly"
            value={`$${overallDueMonthly}`}
          />}
          {/* standaloneAccessories === false && planDueMonthly && !lineLevelOpted &&
            <SelectListItem
              title={CQLabel.get('OD_CART_PLAN_DUE_MONTHLY_TITLE')}
              to="/planmonthly"
              value={'$' + this.props.plans.get('planOnlyDueMonthly')}
            />
          */}
          {(this.props.isAALFlow || this.props.isNSOFlow) && standaloneAccessories === false &&
            <SelectListItem
              title={this.props.CQLabel.get('OD_CART_DUE_TODAY_ACTIVATION_FEE')}
              to="/activationFee"
              value={'$' + this.props.totalActivationFee}
            />
          }
          {instantCreditOrder &&
            <SelectListItem
              title="Instant credit"
              value={`-$${this.props.totalInstantCredit}`}
              to="/instantCredit"
            />
          }
          {(standaloneAccessories === false && !this.props.isNSOFlow) && this.props.isTradeInEnabled && !instantCreditOrder &&
            <SelectListItem
              title={this.props.CQLabel.get('OD_CART_TRADE_IN_TITLE')}
              href={isEligibleAndNotTradedIn ? this.props.tradeInUrl : null}
              to={!isEligibleAndNotTradedIn ? '/tradeindetails' : null}
              value={!isEligibleAndNotTradedIn ? tradeInValue : null}
            />
          }

          {this.props.isPromoCodeEnabled && this.props.promotionList &&
            this.props.promotionList.map((item, i) => (<SelectListItem
              key={i}
              linkText={this.props.CQLabel.get('OD_CART__MAIN_REMOVE_CTA')}
              linkAction={item.get('barcode') ? this.removePromoCode.bind(null, item.get('barcode')) : null}
              subtext={item.get('promoMsg')}
              hideCTA
              title={this.props.CQLabel.get('OD_CART_PROMO_CODE')}
              value={item.get('barcode')}
            />))}

          {this.props.isPromoCodeEnabled ?
            <SelectListItem
              title={promoCodeEnteredString}
              to="/enterpromo"
            />
            :
            ''
          }
        </Col>
      </Row>
    );
  }
}

CartPriceBreakdown.defaultProps = {
  isPromoCodeEnabled: true,
  isTradeInEnabled: true,
};

CartPriceBreakdown.propTypes = {
  pastDueBalance: PropTypes.string,
  isAALFlow: PropTypes.bool,
  isNSOFlow: PropTypes.bool,
  totalActivationFee: PropTypes.string,
  CQLabel: PropTypes.object,
  promoCodes: PropTypes.array,
  promotionList: PropTypes.arrayOf(PropTypes.object),
  instantCreditOrder: PropTypes.bool,
  totalInstantCredit: PropTypes.string,
  tradeInCredit: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  overallDueMonthly: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  totalDueToday: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  tradeInPromoEligible: PropTypes.bool,
  tradeInPromoDetails: PropTypes.oneOfType([
    null,
    PropTypes.object,
  ]),
  tradeInUrl: PropTypes.string,
  removePromoCode: PropTypes.func,
  standaloneAccessories: PropTypes.bool,
  isPromoCodeEnabled: PropTypes.bool,
  isTradeInEnabled: PropTypes.bool,
};
