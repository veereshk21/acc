import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IMG from '../../common/Img/Img';

class FeatureSlide extends Component { // eslint-disable-line
  render() {
    const { feature } = this.props;
    return (
      <div className="pdpSlide background_FF pad10">
        <div className="pad20 noSidePad">
          <div className="featureImage_container margin10 onlyTopMargin positionRelative">
            <div className="featureImageWrap"><IMG src={feature.imageUrl} className="featureImage" alt={feature.title} srcSet={feature.imageUrl + '&wid=480&hei=480 2x'} /></div>
          </div>
        </div>
      </div>
    );
  }
}

export default FeatureSlide;

FeatureSlide.propTypes = {
  feature: PropTypes.object,
};
