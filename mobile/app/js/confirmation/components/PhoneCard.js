import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable arrow-body-style  */
const PhoneCard = ({ title, subtitle }) => {
  return (
    <div className="centerBlock confirmationPhoneImage pad24">
      <div className="margin12 span_7_of_12">
        <h1
          className="red fontSize_6 outlineNone margin20 onlyTopMargin"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <div className="fontSize_2 fontTextBold margin18 onlyTopMargin">
          {subtitle}
        </div>
      </div>
    </div>
  );
};

PhoneCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default PhoneCard;
