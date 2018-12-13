import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-flexbox-grid';

const ComboNotificationICModal = (props) => {
  const { cqContent, allowEUP, allowAAL, lastIntent, instantCreditEligible, onToggleComboICModal, flow, redirectionHandler } = props;
  return (<section>
    <div className="height200 border_black borderSize_2 onlyBottomBorder margin15 onlyBottomMargin">
      <h2 className="fontSize_7 width70" dangerouslySetInnerHTML={{ __html: cqContent.label.OD_CART_INSTANT_CREDIT_MODAL_TITLE }} />
    </div>
    <div className="height200">
      <p className="fontSize_4 lineHeight18">
        {allowAAL === true && ((instantCreditEligible && lastIntent === 'Added') || (!instantCreditEligible)) && cqContent.label.DT_OD_CART_EUP_TEXT}
        {allowEUP === true && ((instantCreditEligible && lastIntent === 'Upgraded') || (!instantCreditEligible)) && cqContent.label.DT_OD_CART_AAL_TEXT}
      </p>
    </div>
    <Row>
      <Col xs={6}>
        <button
          className="primary bold button pad10 onlyRightPad width100 floatLeft"
          analyticstrack="goto-unlimitedPlan-CTA"
          onClick={() => { redirectionHandler(flow); }}
        >{cqContent.label.OD_CART_INSTANT_CREDIT_GOT_IT}
        </button>
      </Col>
      <Col xs={6}>
        <button
          className="secondary bold button pad5 onlyLeftPad width100 floatRight"
          analyticstrack="goto-currentPlan-CTA"
          onClick={() => { onToggleComboICModal(); }}
        >{cqContent.label.OD_CART_INSTANT_CREDIT_GO_BACK}
        </button>
      </Col>
    </Row>
  </section>
  );
};
ComboNotificationICModal.propTypes = {
  cqContent: PropTypes.object,
  allowAAL: PropTypes.bool,
  instantCreditEligible: PropTypes.bool,
  allowEUP: PropTypes.bool,
  lastIntent: PropTypes.string,
  onToggleComboICModal: PropTypes.func,
  redirectionHandler: PropTypes.func,
  flow: PropTypes.string,
};
export default ComboNotificationICModal;
