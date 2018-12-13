import React from 'react';
import PropTypes from 'prop-types';

const GiveOwnNumberModal = ({ cqContent, nonNumberShareLineAccessCharge, onSelectHaveOwnNumber, onToggleModal }) => (<section>
  <h2 dangerouslySetInnerHTML={{ __html: cqContent.label.DT_OD_NS_OWN_NO_TITLE }} />
  {!!nonNumberShareLineAccessCharge &&
    <div className="bold">
      <span dangerouslySetInnerHTML={{ __html: cqContent.label.DT_OD_NS_LINE_ACCESS }} />
      <span className="pad5 onlyLeftPad">${nonNumberShareLineAccessCharge}</span>
    </div>
  }
  <p className="margin20 noSideMargin" dangerouslySetInnerHTML={{ __html: cqContent.label.DT_OD_NS_OWN_NO_DESC }} />
  <div className="clearfix margin40 onlyTopMargin">
    <button
      type="button"
      className="button bold large  margin20 onlyRightMargin  "
      dangerouslySetInnerHTML={{ __html: cqContent.label.DT_OD_NS_OWN_NO_ACCEPT }}
      onClick={onSelectHaveOwnNumber}
    />
    <button
      className="button bold large  secondary "
      dangerouslySetInnerHTML={{ __html: cqContent.label.DT_OD_NS_OWN_NO_DECLINE }}
      onClick={() => {
        onToggleModal({ isDisplay: false });
      }
      }
    />
  </div>
</section>);

GiveOwnNumberModal.propTypes = {
  cqContent: PropTypes.object,
  nonNumberShareLineAccessCharge: PropTypes.string,
  onSelectHaveOwnNumber: PropTypes.func,
  onToggleModal: PropTypes.func,
};

export default GiveOwnNumberModal;
