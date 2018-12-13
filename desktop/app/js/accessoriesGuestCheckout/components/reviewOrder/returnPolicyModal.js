import React from 'react';
import PropTypes from 'prop-types';

const ReturnPolicyModal = (props) => {
  const { cqContent } = props;
  return (
    <div id="ReturnPolicyModal" className="pad20">
      <h2 className="margin12 noSideMargin">{cqContent.label.DT_OD_CHECKOUT_RETURN_POLICY_TITLE}</h2>
      <p className="margin18 noSideMargin">{cqContent.label.DT_OD_CHECKOUT_RETURN_POLICY_DESCRIPTION}</p>
      <h3 className="margin12 noSideMargin">{cqContent.label.DT_OD_CHECKOUT_RETURN_POLICY_EXCHANGE_TITLE}</h3>
      <p className="margin12 noSideMargin">{cqContent.label.DT_OD_CHECKOUT_RETURN_POLICY_EXCHANGE_DESCRIPTION}</p>
    </div>
  );
};

ReturnPolicyModal.propTypes = {
  cqContent: PropTypes.object,
};
export default ReturnPolicyModal;
