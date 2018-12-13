import React from 'react';
import PropTypes from 'prop-types';
import {
  Col,
  Row,
} from 'react-flexbox-grid';
import Anchor from './../../common/A/A';

const CartCTA = ({ cartSaved, accountMember, onToggleContinueShopping, emptyCartFlag, onToggleClearCart, cqContent, standaloneAccessories, shopMoreLink }) => (<Row>
  <Col md={7} lg={7}>
    {!cartSaved && !accountMember &&
    <Anchor
      tabIndex="0"
      onClick={onToggleContinueShopping}
      role="button"
      className="color_333"
      href={standaloneAccessories ? shopMoreLink : '#'}
      analyticstrack="continue-shopping-link"
    >
      {cqContent.label.DT_OD_CART_CONTINUE_SHOP_LINK}</Anchor>}
  </Col>
  <Col md={5} lg={5} className="textAlignRight">
    {/* <Anchor href="javascript:void(0)"  onClick={this.saveCart} className="color_333 bold fontSize_4 margin18 onlyLeftMargin pad12 onlyLeftPad border_black onlyLeftBorder"><span>{cq.label.DT_OD_CART_SAVE_CART_LINK}</span></Anchor> */}
    {emptyCartFlag === false &&
    <Anchor
      tabIndex="0"
      onClick={onToggleClearCart}
      role="button"
      className="color_333"
      href="#"
      analyticstrack="clear-cart-link"
    >
      {cqContent.label.DT_OD_CART_CLEAR_CART_LINK}</Anchor>}
  </Col>
</Row>);


CartCTA.propTypes = {
  cartSaved: PropTypes.bool,
  accountMember: PropTypes.bool,
  onToggleContinueShopping: PropTypes.func,
  emptyCartFlag: PropTypes.bool,
  onToggleClearCart: PropTypes.func,
  cqContent: PropTypes.object,
  standaloneAccessories: PropTypes.bool,
  shopMoreLink: PropTypes.string,
};

export default CartCTA;
