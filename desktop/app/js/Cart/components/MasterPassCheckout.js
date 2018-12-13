import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MasterPassWrapper extends Component {
  constructor(props) {
    super(props);
    this.masterpassPaymentMethod = this.masterpassPaymentMethod.bind(this);
  }
    masterpassPaymentMethod = () => {
      const { cartData, initiateCheckout, cq } = this.props;
      initiateCheckout(false, cartData.masterpassEnabled, cq.label.DT_OD_CHECKOUT_PAYMENT_MASTERPASS_GENERIC_ERROR);
    };
    render() {
      const { cq, cartData, isAccountMember } = this.props;

      const guestCheckout = (this.props.standaloneAccessories && !this.props.authenticated && this.props.accGuestCheckoutEnabled);

      return (
        <div className="masterpassWrapper">
          {(!guestCheckout && cartData.masterpassEnabled && cartData.masterpassConfigInfo && !isAccountMember)
            ? <div className="margin20 noSideMargin">
              <button
                type="submit"
                className="border_black pad3 masterpassButton background_transparent"
                onClick={this.masterpassPaymentMethod.bind(this)}
                analyticstrack="masterpass-checkout-cta"
              >
                <img src="https://static.masterpass.com/dyn/img/acc/global/mp_mark_hor_blk.svg" alt={cq.label.DT_OD_CHECKOUT_PAYMENT_MASTERPASS_IMG_ALT} />
              </button>
            </div> : ''
          }
        </div>
      );
    }
}

MasterPassWrapper.propTypes = {
  cq: PropTypes.object,
  cartData: PropTypes.object,
  isAccountMember: PropTypes.bool,
  initiateCheckout: PropTypes.func,
  authenticated: PropTypes.bool,
  standaloneAccessories: PropTypes.bool,
  accGuestCheckoutEnabled: PropTypes.bool,
};

export default MasterPassWrapper;
