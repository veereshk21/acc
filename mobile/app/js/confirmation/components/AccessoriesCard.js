import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable arrow-body-style  */
const AccessoriesCard = ({ cq, accessoriesURL }) => {
  return (
    <div className="confirmationAccImage pad24 clearfix">
      <div style={{ maxWidth: 500 }}>
        <div className="margin20 noRightMargin span_5_of_12 floatRight">
          <h1 className="color_000 fontSize_5 margin12 onlyTopMargin outlineNone">
            {cq.label.OD_CONFIRMATION_ACCESSORIES_HEADER}
          </h1>
          <div className="fontSize_2 margin6 onlyTopMargin">
            {cq.label.OD_CONFIRMATION_ACCESSORIES_DESCRIPTION_TEXT}
          </div>
          <div className="margin12 onlyTopMargin">
            <a href={accessoriesURL} className="button secondary">
              {cq.label.OD_CONFIRMATION_VIEW_CTA_LABEL}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

AccessoriesCard.propTypes = {
  cq: PropTypes.object.isRequired,
  accessoriesURL: PropTypes.string.isRequired,
};

export default AccessoriesCard;
