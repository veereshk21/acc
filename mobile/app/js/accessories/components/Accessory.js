import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import HorizontalRule from '../../common/HorizontalRule';
/* Common components */
import Img from '../../common/Img/Img';


import Button from '../../common/Button/Button';

/**
 * Accessory Component
 * @class Accessory
 * @extends {Component}
 */
/* eslint-disable react/prefer-stateless-function */
class Accessory extends Component {
  /**
   * Creates an instance of Accessory.
   * @param {any} props
   * @memberof Accessory
   */
  constructor(props) {
    super(props);
    this.state = {
      // nothing to do with application state!!!!!
      selectedSKU: 0, // received form mapStateToProps
    };
    this.addAccessoryToCart = this.addAccessoryToCart.bind(this);
  }
  /**
   * function addAccessoryToCart
   * @param {any} event
   * @returns
   * @memberof Accessory
   */
  addAccessoryToCart(event) {
    event.preventDefault();

    const { details, asyncFetch } = this.props;
    const selectedAccessory = details.skuDetails[this.state.selectedSKU];

    asyncFetch();

    if (details.connectedDevice === true) {
      window.location.href = `/od/cust/auth/mtnDetail?ignoreCache=false&deviceProdId=${
        details.productID
      }&deviceSkuId=${selectedAccessory.id}&connectedDevice=true`;
    } else {
      // if Sizes are available, redirect to PDP pg
      if (selectedAccessory.sizeAvailable) {
        window.location.href = selectedAccessory.pdpUrl;
        return;
      }
      this.props.onClickAddToCart(
        details.productID,
        selectedAccessory.id,
        details.displayName
      );
    }
  }
  /**
   * function selectedIndex
   * @param {any} selectedIndex
   * @memberof Accessory
   */
  colorChanged(selectedIndex) {
    this.setState({ selectedSKU: selectedIndex });
    this.props.onColorChange(selectedIndex);
  }

  render() {
    const { details, isLastElem, cqLabel } = this.props;
    const selectedAccessory = details.skuDetails[this.state.selectedSKU];
    const imgUrlsuffix = selectedAccessory.imageUrl.indexOf('?') >= 0 ? '&' : '?';
    return (
      <Row>

        <Col xs={6}>
          <div className="pad32 noSidePad">
            <h3 className="h5">
              {this.props.inlineAccessory ? (
                <a
                  href={details.pdpUrl}
                  className="color_000"
                  analyticstrack="view-acc-details"
                >
                  <span dangerouslySetInnerHTML={{ __html: details.displayName }} />
                </a>
              ) : <span dangerouslySetInnerHTML={{ __html: details.displayName }} />
              }
            </h3>
            <p className="fontSize_4 margin12 noSideMargin">
              {selectedAccessory.discountedPrice !== null &&
                selectedAccessory.discountedPrice > 0 ? (
                  <span>
                    <span>${selectedAccessory.discountedPrice}</span>
                    <span className="color_666 textDecLineThrough displayInlineBlock margin6 onlyLeftMargin">
                      ${selectedAccessory.price}
                    </span>
                  </span>
                ) : (
                  <span>${selectedAccessory.price}</span>
                )}
            </p>
            {this.props.inlineAccessory && (
              <Button
                className="button secondary tertiary"
                onClick={this.addAccessoryToCart.bind(this)}
                analyticstrack="acc-add-to-cart"
              >
                {selectedAccessory.sizeAvailable
                  ? cqLabel.label.OD_ACCESSORIES_CHOOSE_SIZE_CTA_TEXT
                  : cqLabel.label.OD_ACCESSORIES_ADD_TO_CART_CTA_TEXT}
              </Button>
            )}
            {this.props.inlineAccessory && (
              <div>
                <a
                  href={details.pdpUrl}
                  className="pad12 onlyTopPad link displayInlineBlock"
                  analyticstrack="view-acc-details"
                >
                  Learn more
                </a>
              </div>
            )}
          </div>
        </Col>
        <Col xs={6}>
          <div className="pad32 noSidePad textAlignCenter">
            {
              <a href={this.props.inlineAccessory ? details.pdpUrl : '#'} analyticstrack="view-acc-details">
                <Img
                  src={`${selectedAccessory.imageUrl}${imgUrlsuffix}wid=75&hei=135`}
                  srcSet={`${selectedAccessory.imageUrl}${imgUrlsuffix}wid=150&hei=270 2x`}
                  alt={selectedAccessory.name}
                />
              </a>
            }
          </div>
        </Col>
        <Col xs={12}>
          {details.skuDetails.map((skuDetail, index) => {
            const bckgrdStyle =
              skuDetail.color && skuDetail.colorCodes
                ? { backgroundColor: skuDetail.colorCodes[0] }
                : { backgroundColor: '#ffffff' };
            if (skuDetail.name === '#ffffff') {
              bckgrdStyle.color = '#000000';
            }
            const radioName = `colorSelectionRadio${skuDetail.id}`;
            const selected = index === this.state.selectedSKU;

            return (
              <div key={`accColor${index}`} className="displayInlineBlock">
                {skuDetail.color && skuDetail.colorCodes && (
                  <div className="displayInlineBlock">
                    <input
                      type="radio"
                      name="colorSelection"
                      id={radioName}
                      defaultChecked={selected}
                      className="colorSelector"
                      value={skuDetail.name}
                      tabIndex={index}
                      onChange={this.colorChanged.bind(this, index)}
                    />
                    <label
                      htmlFor={radioName}
                      key={skuDetail.name}
                      title={skuDetail.name}
                      className={`colorSelector_label m_acc colorSelector_checkShadow ${
                        selected ? 'is-selected' : ''
                      }`}

                    >
                      <span className="block" style={bckgrdStyle} />
                      <div className="colorSelector_name displayInlineBlock">
                        {skuDetail.name}
                      </div>
                    </label>
                  </div>
                )}
              </div>
            );
          })}
          <HorizontalRule y={1} margin={isLastElem ? '18px 0 100px 0' : '18px 0'} color={!isLastElem && '#D8DADA'} />
        </Col>
      </Row>
    );
  }
}

Accessory.defaultProps = {
  cqLabel: {
    OD_ACCESSORIES_ADD_TO_CART_CTA_TEXT: 'Add to cart',
  },
};

Accessory.propTypes = {
  details: PropTypes.object.isRequired,
  cqLabel: PropTypes.object,
  isLastElem: PropTypes.bool,
  onClickAddToCart: PropTypes.func,
  onColorChange: PropTypes.func,
  asyncFetch: PropTypes.func,
  inlineAccessory: PropTypes.any,
};

export default Accessory;
