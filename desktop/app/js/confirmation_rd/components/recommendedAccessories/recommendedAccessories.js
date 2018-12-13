import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-flexbox-grid';

class RecommendedAccessories extends Component {
  constructor(props) {
    super(props);

    this.state = { isProductDetailsModalVisible: false };
    this.onShowAccessoryDetails = this.onShowAccessoryDetails.bind(this);
  }


  onShowAccessoryDetails() {
    const { pdpUrl } = this.props;
    window.location = pdpUrl;
  }

  render() {
    const { displayName, skuDetails } = this.props;
    const { price, discountedPrice, imageUrl } = skuDetails[0];
    return (
      <div onClick={this.onShowAccessoryDetails} style={{ cursor: 'pointer' }}>
        <Row className="height100">
          <Col xs={12}>
            <Row className="">
              <Col md={7} lg={7}>
                <Row>
                  <Col xs={12}>
                    <div className="accessoryTitle_left">
                      <span
                        className="bold block accessoryTitle_title fontSize_6 margin12 onlyBottomMargin"
                        dangerouslySetInnerHTML={{ __html: displayName }}
                        style={{ lineHeight: '19px' }}
                      />
                      <div className="accessory_price">
                        {(discountedPrice && price > discountedPrice) ? <div><span
                          className="bold fontSize_5"
                        >${discountedPrice}</span><br /><span
                          className="legal color_gray_six"
                        >was <span className="textDecLineThrough">${price}</span></span></div> : <div><span className="bold">${price}</span></div>}
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col md={5} lg={5} className="positionRelative">
                <div className="accessoryTitle_right">
                  <img
                    alt={displayName}
                    src={imageUrl}
                    itemProp="image"
                    className="textAlignCenter width100"
                  />
                </div>
              </Col>
            </Row>
            <div className="pad12 textAlignRight positionAbsolute width100" style={{ bottom: '0px' }}>
              <button
                className="button tertiary fontSize_5"
              />
            </div>
          </Col>
        </Row>
      </div>);
  }
}

RecommendedAccessories.propTypes = {
  displayName: PropTypes.string,
  skuDetails: PropTypes.array,
  pdpUrl: PropTypes.string,
};
export default RecommendedAccessories;
