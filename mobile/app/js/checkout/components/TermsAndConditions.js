import React from 'react';
import PropTypes from 'prop-types';
import renderHTML from 'react-render-html';
import BackButton from '../../common/BackButton/BackButton';

const TermsAndConditions = (props) => {
  const { cqContent, eppAgreement } = props;
  return (
    <div className="pad12 onlyTopPad">
      <BackButton to="/">{cqContent.label.OD_CHECKOUT_BACK_TEXT}</BackButton>
      <div className="pad20">
        <h2 className="textAlignCenter">{cqContent.label.OD_CHECKOUT_EPP_TERMS_AND_CONDITIONS_REVIEW_HEADING_TEXT}</h2>
        <div className="margin36 onlyTopMargin" dangerouslySetInnerHTML={{ __html: renderHTML(eppAgreement.eppTermsAndConditions) }} />
      </div>
    </div>
  );
};

TermsAndConditions.propTypes = {
  cqContent: PropTypes.object,
  eppAgreement: PropTypes.object,
};

export default TermsAndConditions;
