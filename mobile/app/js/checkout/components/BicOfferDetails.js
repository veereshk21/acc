import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BackButton from '../../common/BackButton/BackButton';

class BicOfferDetail extends Component { // eslint-disable-line

  render() {
    const { currentDevice, cqContent } = this.props;
    return (
      <div className="pad12 onlyTopPad">
        <BackButton to="/" >
          {cqContent.label.OD_CHECKOUT_BACK_TEXT}
        </BackButton>
        <div className="pad36 onlySidePad">
          <h5 className="red margin12 onlyTopMargin width80 textAlignCenter centerBlock ">Offer Details</h5>
          {currentDevice.bicMessageMap !== null &&
            <div>
              <div className="pad24 noSidePad">{currentDevice.bicMessageMap.message}</div>
              <div>{currentDevice.bicMessageMap.tooltip}</div>
            </div>
          }
        </div>
      </div>
    );
  }
}
BicOfferDetail.propTypes = {
  cqContent: PropTypes.object,
  currentDevice: PropTypes.object,
};

export default BicOfferDetail;
