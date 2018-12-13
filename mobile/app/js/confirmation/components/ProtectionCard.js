import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable arrow-body-style  */
const ProtectionCard = ({ cq, protectionURL }) => {
  return (
    <div className="confirmationTAPImage pad24">
      <div className="margin12 span_5_of_12">
        <div className="color_959595 fontSize_1">{cq.label.OD_CONFIRMATION_ADD_PROTECTION_TEXT}</div>
        <h1 className="color_000 fontSize_5 margin6 onlyTopMargin outlineNone">{cq.label.OD_CONFIRMATION_TOTAL_MOBILE_PROTECTION_HEADER}</h1>
        <div className="fontSize_2 margin6 onlyTopMargin">{cq.label.OD_CONFIRMATION_TOTAL_MOBILE_PROTECTION_DESCRIPTION_TEXT}</div>
        <div className="margin12 onlyTopMargin">
          <a href={protectionURL} className="button secondary">{cq.label.OD_CONFIRMATION_VIEW_CTA_LABEL}</a>
        </div>
      </div>
    </div>
  );
};

ProtectionCard.propTypes = {
  cq: PropTypes.object.isRequired,
  protectionURL: PropTypes.string.isRequired,
};

export default ProtectionCard;
