import React from 'react';
import PropTypes from 'prop-types';

const ClearCartModal = (props) => {
  const { cqContent, onClearCart, onToggleClearCartModal } = props;

  const onClearCartHandler = () => {
    onToggleClearCartModal();
    onClearCart();
  };

  return (<div className="">
    <h2>{cqContent.label.DT_OD_CART_CLEAR_CART_MODAL_TITLE}</h2>
    <p>{cqContent.label.DT_OD_CART_CLEAR_CART_MODAL_SUBTEXT}</p>
    <div className="textAlignRight">
      <button className="button primary margin24 onlyTopMargin" analyticstrack="clear-cart-confirm-cta" onClick={() => { onClearCartHandler(); }}>{cqContent.label.DT_OD_CART_CLEAR_CART_MODAL_CTA_TEXT}</button>
    </div>
  </div>);
};
ClearCartModal.propTypes = {
  cqContent: PropTypes.object,
  onClearCart: PropTypes.func,
  onToggleClearCartModal: PropTypes.func,
};
export default ClearCartModal;
