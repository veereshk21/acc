/**
 * Created by hmahad on 12/26/2016.
 */
/* eslint-disable jsx-a11y/href-no-hash, react/no-unused-state */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import CartHeader from './CartHeader';
import CartDeviceDetails from '../containers/CartDeviceDetails';
import CartPriceBreakDown from '../containers/CartPriceBreakdown';
import CartEmpty from './CartEmpty';
import Button from '../../common/Button/Button';
import { clickToCallUpdate } from './../actions';
import HorizontalRule from './../../common/HorizontalRule';
import PromoBadge from '../../common/PromoBadge/PromoBadge';
import ToolTip from '../../common/ToolTip/';


export default class CartComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {// nothing to do with application state!!!!!
      isCartEmpty: props.emptyCartFlag, // received form mapStateToProps
      cartView: props.cartView,
      isEmptyModal: false,
      hasError: false,
    };

    this._emptyCart = this._emptyCart.bind(this);
    this._onCheckout = this._onCheckout.bind(this);
    this._updateCartCount = this._updateCartCount.bind(this);
  }

  componentDidMount() {
    this._updateCartCount(this.props.cartItemCount);
    if (!this.props.instantCreditRemovedMsg && !this.props.cartReadyforCheckout && this.props.cartMessages) {
      let infoText = this.props.cartMessages.get('message');
      if (this.props.emailResponse.cartSaved && this.props.emailResponse.cartSavedMessage !== '') {
        infoText = this.props.emailResponse.cartSavedMessage;
      }
      if (infoText) {
        this.props.showInfoNotification(infoText);
      }
    } else if (this.props.instantCreditRemovedMsg) {
      this.props.showInfoNotification(this.props.instantCreditRemovedMsg);
    }
    if (!this.props.c2cFlag) {
      clickToCallUpdate('false');
      this.props.setC2CFlag();
    }
    const c2cElement = document.getElementsByClassName('c2c_container_mobile');
    if (c2cElement && c2cElement.length > 0) {
      c2cElement[0].addEventListener('click', (e) => {
        e.preventDefault();
        clickToCallUpdate('true');
      });
    }
    if (this.props.instantCreditOrder && !window.hideInstantCreditNotification) {
      this.props.showInfoNotification(this.props.CQLabel.get('OD_CART_INSTANT_CREDIT_APPLIED_MESSAGE'));
    }
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.isFetching) {
      window.hideLoader();
    }
    if (this.props.cartItemCount !== newProps.cartItemCount) {
      this._updateCartCount(newProps.cartItemCount);
    }
    this.setState({ isCartEmpty: newProps.isCartEmpty });
  }
  getBogoPromo(promo, idx) {
    if (promo.placement === 'CONTENT-HEADER' && (!promo.badgeImage || promo.badgeImage !== this.props.CQLabel.get('DT_OD_CART_APPLE_MUSIC'))) {
      return (
        <Row>
          <Col xs={12}>
            <PromoBadge className="background_blue_one margin12 noSideMargin">
              <div key={`promo-${idx}`}>
                {promo.badgeText}
                {promo.badgeToolTip &&
                    <ToolTip
                      id="globalPromo-tooltip"
                      className="margin3 onlyLeftMargin white"
                      ariaLabel="Upgrade fee information tooltip"
                      text={promo.badgeToolTip}
                      noRenderHTML
                      relative=""
                    />
                }
                {promo.badgeToolTipUrl &&
                  <a role="button" aria-label="View Promo Details" className="margin6 link_white" onClick={() => { this.props.history.push('/promoModal/globalPromo/' + idx); }} analyticstrack="view-global-promo-details">
                    {promo.contentUrlText || 'Learn more'}
                  </a>}
              </div>
            </PromoBadge>
          </Col>
        </Row>
      );
    }
    return null;
  }

  getApplePromo(promo, idx) {
    if (promo.badgeImage && promo.badgeImage === this.props.CQLabel.get('DT_OD_CART_APPLE_MUSIC')) {
      return (
        <div className="background_00 onlyTopMargin margin18">
          {console.log('asd')}
          {this.props.mmplanEnabled &&
            <div className="fontSize_1 onlySidePad noTopMargin noBottomMargin positionRelative textAlignLeft">
              <p className="fontDisplay fontSize_2 pad10 color_FFF noSideMargin ">
                <span className="font-icon_apple onlyRightMargin margin3" />
                <span>MUSIC</span><br />
                <span className="pad10 noSidePad">{promo.badgeText}</span>
                {promo.badgeToolTipUrl &&
                  <a role="button" aria-label="View Promo Details" className="margin6 link_white" onClick={() => { this.props.history.push('/promoModal/globalPromo/' + idx); }} analyticstrack="view-global-promo-details">
                    {promo.contentUrlText || 'Learn more'}
                  </a>
                }
              </p>
            </div>
          }
        </div>
      );
    }
    return null;
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    console.log('Error:', error, '\n Info:', info);
    // You can also log the error to an error reporting service
  }

  _shopMore(event) {
    event.preventDefault();
    window.location = this.props.shopMoreLink;
    // window.location = this.props.CQLabel.get('OD_CART_SHOP_MORE');
  }

  _onCheckout(event) {
    event.preventDefault();
    const {
      authenticated, standaloneAccessories, guestCheckoutSignInURL, accGuestCheckoutEnabled,
    } = this.props;
    if (accGuestCheckoutEnabled && standaloneAccessories && !authenticated) {
      window.location.href = guestCheckoutSignInURL;
    } else {
      this.props.initiateCheckout();
    }
  }

  _onEmailCart(event) {
    event.preventDefault();
    this.props.history.push('/emailCart'); // eslint-disable-line
  }
  _emptyCart(event) {
    event.preventDefault();
    /* TODO: Confirm if we are going to use custom overlays on mobile */
    const result = confirm(this.props.CQLabel.get('OD_CART_EMPTY_YOUR_CART_SUBTITLE')); // eslint-disable-line
    if (result) {
      this.props.clearCart();
    }
    // this.setState({isEmptyModal:true});
  }

  _clearCart(event) {
    event.preventDefault();
    this.props.clearCart();
    this.setState({ isEmptyModal: false });
  }

  _closeModal(event) {
    event.preventDefault();
    this.setState({ isEmptyModal: false });
  }

  _updateCartCount(cartCount) {
    const cartElem = document.getElementsByClassName('cartCount')[0];
    if (!cartElem) {
      return;
    }
    if (cartCount > 0) {
      cartElem.innerHTML = cartCount;
      cartElem.style.display = 'block';
      cartElem.parentElement.setAttribute('aria-label', 'cart with ' + cartCount + ' item');
    } else {
      cartElem.innerHTML = '';
      cartElem.style.display = 'none';
      cartElem.parentElement.setAttribute('aria-label', 'cart');
    }
  }

  render() { // eslint-disable-line

    const {
      isCartEmpty, isAccountMember, emailResponse, cartSubText, mainCartNextDayShippingMessage, lonelyCartMessage, lonelyCartSubMessage, globalPromotion, mmplanEnabled,
    } = this.props;
    const coDisabled = !(this.props.cartReadyforCheckout && this.props.cartReadyforCheckout !== null && this.props.cartReadyforCheckout !== '');
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <div>Something went wrong.</div>;
    }
    if (isCartEmpty) {
      return (
        <div>
          <CartEmpty
            shopbtn={this.props.CQLabel.get('OD_CART_EMPTY_CART_SHOP_CTA')}
            lonelyCartSub={(lonelyCartMessage !== null && lonelyCartSubMessage !== null) ? lonelyCartSubMessage : this.props.CQLabel.get('OD_CART_EMPTY_CART_SUBTITLE')}
            lonelyCartHeading={(lonelyCartMessage !== null && lonelyCartSubMessage !== null) ? lonelyCartMessage : this.props.CQLabel.get('OD_CART_EMPTY_CART_TITLE')}
            shopMoreLink={this.props.shopMoreLink}
            hideNotification={this.props.hideNotification}
          />
        </div>);
    }
    return (
      <div>
        <Grid className="cartpage noSidePad pad24">
          <CartHeader
            title={this.props.CQLabel.get('OD_CART_HEADER_TITLE')}
            subText={cartSubText}
            nextDayShippingMessage={mainCartNextDayShippingMessage}
          />
          <form method="GET" name="cartform" action={this.props.checkoutButtonURL}>
            <div className="ensighten_topButtons">
              <Row className="noSideMargin pad24 onlySidePad" >
                <Col xs={12} >
                  <Row className="pad24 noSidePad">
                    <Col xs={6}>
                      <Button
                        type="button"
                        onClick={this._shopMore.bind(this)}
                        role="button"
                        disabled={isAccountMember}
                        className="button secondary width100 "
                        analyticstrack="cart-shop-more"
                      >
                        {this.props.CQLabel.get('OD_CART_SHOPMORE_BTN')}
                      </Button>
                    </Col>
                    {isAccountMember ?
                      <Col xs={6}>
                        <Button
                          type="button"
                          role="button"
                          disabled={(!coDisabled || emailResponse.cartSaved)}
                          className="button primary width100 "
                          onClick={this._onEmailCart.bind(this)}
                          analyticstrack="cart-email-cart"
                        >{this.props.CQLabel.get('OD_CART_EMAIL_CTA')}
                        </Button>
                      </Col>
                      :
                      <Col xs={6}>
                        <Button
                          type="button"
                          role="button"
                          disabled={coDisabled}
                          className="button primary width100"
                          onClick={this._onCheckout}
                          analyticstrack="trigger-checkout"
                        >{this.props.CQLabel.get('OD_CART_CHECKOUT_CTA')}
                        </Button>
                      </Col>
                    }
                  </Row>
                  <HorizontalRule y={4} margin="0" />
                </Col>
              </Row>
            </div>

            {(globalPromotion && globalPromotion.length > 0) && globalPromotion.map((promo, idx) => this.getBogoPromo(promo, idx))}

            <CartDeviceDetails />

            <CartPriceBreakDown />

            <Row className="ensighten_bottomButtons noSideMargin pad24 marin12 onlyTopMargin onlySidePad">

              <Col xs={6}>
                <Button
                  type="button"
                  onClick={this._shopMore.bind(this)}
                  disabled={isAccountMember}
                  role="button"
                  className="button secondary large width100"
                  analyticstrack="cart-shop-more"
                >{this.props.CQLabel.get('OD_CART_SHOPMORE_BTN')}
                </Button>
              </Col>
              <Col xs={6}>
                {isAccountMember ?
                  <Button
                    type="button"
                    role="button"
                    disabled={(!coDisabled || emailResponse.cartSaved)}
                    className="button primary large width100"
                    onClick={this._onEmailCart.bind(this)}
                    analyticstrack="cart-email-cart"
                  >{this.props.CQLabel.get('OD_CART_EMAIL_CTA')}
                  </Button>
                  :
                  <Button
                    type="button"
                    role="button"
                    disabled={coDisabled}
                    className="button primary large width100"
                    onClick={this._onCheckout}
                    analyticstrack="trigger-checkout"
                  >{this.props.CQLabel.get('OD_CART_CHECKOUT_CTA')}
                  </Button>
                }
              </Col>

            </Row>
            <Row className="noSideMargin pad32">
              <Col
                xs={12}
                className="ensighten_emptyCart noSidePad"
              > {this.props.CQLabel.get('OD_CART_FOOTER_TEXT')}
                <a role="button" className="link margin6 onlyLeftMargin" onClick={this._emptyCart} analyticstrack="empty-cart">
                  {this.props.CQLabel.get('OD_CART_EMPTY_CART_CTA')}
                </a>
              </Col>
            </Row>

            <input type="hidden" name="orderId" value={this.props.orderId} />
          </form>
          {(mmplanEnabled && globalPromotion.length > 0) && globalPromotion.map((promo, idx) => this.getApplePromo(promo, idx))}
        </Grid>
      </div >
    );
  }
}
CartComponent.defaultProps = {
  // guestCheckoutSignInURL: '/od/cust/checkout/sign_in',
};
CartComponent.propTypes = {
  CQLabel: PropTypes.object,
  orderId: PropTypes.string,
  cartItemCount: PropTypes.number,
  checkoutButtonURL: PropTypes.string,
  isCartEmpty: PropTypes.bool,
  isAccountMember: PropTypes.bool,
  emptyCartFlag: PropTypes.bool,
  cartView: PropTypes.bool,
  initiateCheckout: PropTypes.func,
  clearCart: PropTypes.func,
  hideNotification: PropTypes.func,
  cartReadyforCheckout: PropTypes.bool,
  emailResponse: PropTypes.object,
  cartMessages: PropTypes.any,
  instantCreditRemovedMsg: PropTypes.string,
  showInfoNotification: PropTypes.func,
  shopMoreLink: PropTypes.string,
  cartSubText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  mainCartNextDayShippingMessage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  lonelyCartMessage: PropTypes.string,
  lonelyCartSubMessage: PropTypes.string,
  setC2CFlag: PropTypes.func,
  c2cFlag: PropTypes.bool,
  authenticated: PropTypes.bool,
  standaloneAccessories: PropTypes.bool,
  guestCheckoutSignInURL: PropTypes.string,
  accGuestCheckoutEnabled: PropTypes.bool,
  globalPromotion: PropTypes.array,
  instantCreditOrder: PropTypes.bool,
  history: PropTypes.object,
  mmplanEnabled: PropTypes.bool,
};
