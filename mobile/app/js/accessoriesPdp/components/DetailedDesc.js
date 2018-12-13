/**
* DetailedDesc.js
* renders Detailed description

*
* */


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BackButton from '../../common/BackButton/BackButton';

/* eslint-disable react/prefer-stateless-function */
class DetailedDesc extends Component {
/* eslint-enable */
  render() {
    const { productDetails, cqKeys, description } = this.props;

    return (
      <div className="pad12 onlyTopPad">
        <BackButton to="/" >{cqKeys.label.OD_ACCPDP_BACK_BUTTON_TEXT}</BackButton>
        <div className="pad36">
          <h4>
            <span className="displayBlock fontSize_3" dangerouslySetInnerHTML={{ __html: productDetails.brandName }} />
            <span className="displayBlock h2" dangerouslySetInnerHTML={{ __html: productDetails.displayName }} />
          </h4>
          <div />
          <div className="pad18 noSidePad" dangerouslySetInnerHTML={{ __html: description }} />
        </div>
      </div>
    );
  }
}

DetailedDesc.defaultProps = {
  cqKeys: {
    label: {
      OD_ACCPDP_BACK_BUTTON_TEXT: '',
      OD_ACCPDP_PRICE_FROM_TEXT: '',
    },
  },
};

DetailedDesc.propTypes = {
  cqKeys: PropTypes.shape({
    label: PropTypes.shape({
      OD_ACCPDP_BACK_BUTTON_TEXT: PropTypes.string,
      OD_ACCPDP_PRICE_FROM_TEXT: PropTypes.string,
    }),
  }),
};

export default DetailedDesc;
DetailedDesc.propTypes = {
  productDetails: PropTypes.object,
  description: PropTypes.node,
};
