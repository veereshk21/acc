import React from 'react';
import PropTypes from 'prop-types';

const LimitExceeded = (props) => {
  const { inEligibilityCode } = props;
  const { cqJSON } = props;
  let _limitContentHeader = '';
  let _limitContent = '';
  let url = '';
  let linkText = '';
  if (inEligibilityCode === 'ACCT_LINE_LIMIT' || inEligibilityCode === 'DEVICE_CAP') {
    _limitContentHeader = cqJSON.label.DT_OD_MDN_ACCT_LINE_LIMIT_TITLE;
    _limitContent = cqJSON.label.DT_OD_MDN_ACCT_LINE_LIMIT_CONTENT;
    url = cqJSON.label.DT_OD_MDN_ACCT_LINE_LIMIT_URL;
    linkText = cqJSON.label.DT_OD_MDN_ACCT_LINE_LIMIT_LINK_TXT;
  } else if (inEligibilityCode === 'MIXED_CART') {
    _limitContentHeader = cqJSON.label.DT_OD_MDN_MIXED_CART_CONTENT_HEADER;
    _limitContent = cqJSON.label.DT_OD_MDN_MIXED_CART_CONTENT;
    url = cqJSON.label.DT_OD_MDN_MIXED_CART_LINK_TXT;
    linkText = cqJSON.label.DT_OD_MDN_CART_DEVICE_LIMIT_LINK;
  } else if (inEligibilityCode === 'CART_DEVICE_MAX_LIMIT_REACHED') {
    _limitContentHeader = cqJSON.label.DT_OD_MDN_CART_DEVICE_LIMIT_CONTENT_HEADER;
    _limitContent = cqJSON.label.DT_OD_MDN_CART_DEVICE_LIMIT_CONTENT;
    url = cqJSON.label.DT_OD_MDN_CART_DEVICE_LIMIT_TXT;
    linkText = cqJSON.label.DT_OD_MDN_CART_DEVICE_LIMIT_LINK;
  } else if (inEligibilityCode === 'TVPSL_SMARTPHONE_MAX_LIMIT_EXCEEDED') {
    _limitContentHeader = cqJSON.label.DT_OD_MDN_CART_DEVICE_LIMIT_CONTENT_TVPSL_HEADER;
    _limitContent = cqJSON.label.DT_OD_MDN_CART_DEVICE_LIMIT_CONTENT;
    url = cqJSON.label.DT_OD_MDN_CART_DEVICE_LIMIT_TXT;
    linkText = cqJSON.label.DT_OD_MDN_CART_DEVICE_LIMIT_LINK;
  } else if (inEligibilityCode === 'TVPSL_DEVICE_NOT_SUPPORED') {
    _limitContentHeader = cqJSON.label.OD_MDN_ACCT_LINE_LIMIT_CONTENT_TVPSL_HEADER;
    _limitContent = cqJSON.label.DT_OD_MDN_CART_DEVICE_LIMIT_TVPSL_CONTENT;
    url = cqJSON.label.DT_OD_MDN_CART_DEVICE_LIMIT_TVPSL_LINK;
    linkText = cqJSON.label.DT_OD_MDN_CART_DEVICE_LIMIT_TVPSL_TXT;
  } else if (inEligibilityCode === 'CASH_ONLY') {
    _limitContentHeader = cqJSON.label.DT_OD_MDN_USER_BLOCKED;
    _limitContent = cqJSON.label.DT_OD_MDN_USER_BLOCKED_TXT;
  }
  const message = (
    <div className="section group grid vh60">
      <div className="pad30 onlySidePad">
        <div className="pad48 noSidePad">
          <h1 className="pad20 noLeftPad">{_limitContentHeader}</h1>
          <p className="fontSize_4">{_limitContent}</p>
        </div>
      </div>
      {linkText !== '' && <div className="pad30 onlySidePad">
        <a className="button large" href={url} analyticstrack="select-limitExceeded-details-link">{linkText}</a>
      </div>}
    </div>
  );

  return (
    <div>
      {message}
    </div>
  );
};

LimitExceeded.propTypes = {
  inEligibilityCode: PropTypes.string,
  cqJSON: PropTypes.object,
};

export default LimitExceeded;
