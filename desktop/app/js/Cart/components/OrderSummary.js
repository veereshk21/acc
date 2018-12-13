import React, { Component } from 'react';
import PropTypes from 'prop-types';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import PayPalCheckout from './../containers/PayPalCheckout';
import MasterPassCheckout from './../containers/MasterPassCheckout';
import DeviceDelivery from './DeviceDelivery';
import CartCTA from './CartCTA';
import AsyncComponent from '../../common/AsyncComponent';

const DevicePromotionCode = AsyncComponent(() => import('./../containers/DevicePromotionCode'));
const DevicePrice = AsyncComponent(() => import('./../containers/DevicePrice'));

class OrderSummary extends Component {
  static propTypes = {
    cartData: PropTypes.object.isRequired,
    cq: PropTypes.object.isRequired,
    saveCart: PropTypes.func,
    toggleModal: PropTypes.func,
    emailResponse: PropTypes.object,
    accountMember: PropTypes.bool,
  };

  // material-ui specific method
  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  onToggleContinueShopping = () => {
    if (this.props.standaloneAccessories) {
      window.location = this.props.shopMoreLink;
    } else {
      this.props.toggleModal('ContinueShopping');
    }
  };
  onToggleClearCartModal = () => {
    this.props.toggleModal('ClearCart');
  };
  _handleKeyPressCont = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      this.onToggleContinueShopping();
    }
  };
  _handleKeyPressClear = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      this.onToggleClearCartModal();
    }
  };
  saveCart = (event) => {
    event.preventDefault();
    this.props.saveCart();
  };

  render() {
    const {
      cartData, cq, emailResponse, accountMember, standaloneAccessories, shopMoreLink,
    } = this.props;
    // const coDisabled = !(cartReadyforCheckout && cartReadyforCheckout !== null && cartReadyforCheckout !== '');
    return (
      <div id="cartAsideBar">
        <div className="cartbtnLinks">
          <CartCTA
            cartSaved={emailResponse.cartSaved} accountMember={accountMember} onToggleContinueShopping={this.onToggleContinueShopping} _handleKeyPressCont={this._handleKeyPressCont}
            emptyCartFlag={cartData.output.emptyCartFlag} onToggleClearCart={this.onToggleClearCartModal} cqContent={cq} _handleKeyPressClear={this._handleKeyPressClear}
            standaloneAccessories={standaloneAccessories}
            shopMoreLink={shopMoreLink}
          />
        </div>
        <PayPalCheckout title="payPalCheckout" data={cartData} cq={cq} />
        <MasterPassCheckout title="masterPassCheckout" data={cartData} cq={cq} />
        {cartData.output.targetter && <DeviceDelivery title="DeviceDelivery" data={cartData} cq={cq} />}
        <DevicePromotionCode title="DevicePromotion" data={cartData} cq={cq} />
        <DevicePrice title="DevicePrice" data={cartData} cq={cq} />
        <PayPalCheckout title="payPalCheckout" data={cartData} cq={cq} />
        <MasterPassCheckout title="masterPassCheckout" data={cartData} cq={cq} />

        <div className="cartbtnLinks">
          <CartCTA
            cartSaved={emailResponse.cartSaved} accountMember={accountMember} onToggleContinueShopping={this.onToggleContinueShopping} _handleKeyPressCont={this._handleKeyPressCont}
            emptyCartFlag={cartData.output.emptyCartFlag} onToggleClearCart={this.onToggleClearCartModal} cqContent={cq} _handleKeyPressClear={this._handleKeyPressClear}
            standaloneAccessories={standaloneAccessories}
            shopMoreLink={shopMoreLink}
          />
        </div>
      </div>
    );
  }
}

OrderSummary.childContextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

OrderSummary.propTypes = {
  standaloneAccessories: PropTypes.bool,
  shopMoreLink: PropTypes.string,
};

export default OrderSummary;
