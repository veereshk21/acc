import React from 'react';
import PropTypes from 'prop-types';

const FreeShippingModal = (props) => {
  const { cqContent } = props;
  return (
    <div id="FreeShippingModal" className="pad20">
      <h2 className="margin12 noSideMargin">{cqContent.label.DT_OD_CHECKOUT_FREE_SHIPPING_TITLE}</h2>
      <div dangerouslySetInnerHTML={{ __html: cqContent.html.DT_OD_CHECKOUT_FREE_SHIPPING_DESCRIPTION }} />
    </div>
  );
};

FreeShippingModal.propTypes = {
  cqContent: PropTypes.object,
};
export default FreeShippingModal;
