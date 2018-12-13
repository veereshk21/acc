import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
/* Common components */
import Title from '../../common/Title/Title';
import Loader from '../../common/Loader/Loader';
import Button from '../../common/Button/Button';
import BackButton from '../../common/BackButton/BackButton';
import HorizontalRule from '../../common/HorizontalRule/';

/* Page sepcific components */
import Accessory from './Accessory';
/**
 * AccessoriesPage Component
 * @class AccessoriesPage
 * @extends {Component}
 */
/* eslint-disable react/prefer-stateless-function */
class BundleAccessoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {// nothing to do with application state!!!!!
      skuIndex: 0, // received form mapStateToProps
    };
    this.onClickNextCTA = this.onClickNextCTA.bind(this);
    this.onClickAddToCart = this.onClickAddToCart.bind(this);
  }
  /**
   * function : onClickNextCTA
   * @param: null
   * return : redirects to new window
   * @memberof AccessoriesPage
   */
  onClickNextCTA() {
    this.props.asyncFetch();
    window.location.href = this.props.nextCTALink + '?ts=' + (new Date()).getTime();
  }
  /**
   * function: onClickAddToCart
   * @param {sting} productId
   * @param {string} accSkuId
   * @param {string} accName
   * @memberof AccessoriesPage
   */
  onClickAddToCart() {
    const { skuID, displayName } = this.props.selectedAccessory;
    this.props.addAccessoryBundleToCart(this.props.addToCartUrl, skuID, displayName);
  }

  getskuDetails(details) {
    const skuDetails = [];
    details.map((skuDetail) => {
      if (skuDetail.skuDetails.length === 1) {
        skuDetails.push({ skuID: skuDetail.skuDetails[0].id });
      }
      if (skuDetail.skuDetails.length > 1) {
        skuDetails.push({ skuID: skuDetail.skuDetails[this.state.skuIndex].id });
      }
      return skuDetails;
    });
    return skuDetails;
  }
  /**
   * render method
   * @returns Component
   * @memberof AccessoriesPage
   */
  render() {
    const {
      recommendedAccessories, isFetching, asyncFetch, selectedAccessory, cqContent,
    } = this.props;
    const accesoryLen = recommendedAccessories.length ? recommendedAccessories.length - 1 : 0;
    return (
      <Grid className="pad12 onlyTopPad">
        <BackButton to="/">{cqContent.label.OD_ACCESSORIES_BACK_TEXT}</BackButton>
        {isFetching === true && <Loader />}
        <Row className="pad32 noBottomPad">
          <Col xs={12}>
            <Title>{selectedAccessory.displayName}</Title>
            <p className="fontSize_1_3">
              ${selectedAccessory.discountedPrice}
              {
                (selectedAccessory.savedPrice !== null && selectedAccessory.savedPrice > 0) && <span className="color_666"> Save ${selectedAccessory.savedPrice}</span>
              }
            </p>
            <HorizontalRule />

          </Col>
          <Col xs={12}>
            {recommendedAccessories.map((accessoryDetail, index) =>
              (
                <Accessory
                  key={`accWrap${index}`}
                  asyncFetch={asyncFetch}
                  cqLabel={cqContent}
                  details={accessoryDetail}
                  onColorChange={(i) => this.setState({ skuIndex: i })}
                  isLastElem={(index === accesoryLen)}
                />
              ))}
          </Col>
          <Col xs={12} className="footerFixed">
            <Button className="button secondary margin6 width40" onClick={this.onClickNextCTA} analyticstrack="acc-bundle-no-thanks">{cqContent.label.OD_ACCESSORIES_NO_THANKS}</Button>
            <Button className="button primary margin6 width40" onClick={this.onClickAddToCart} analyticstrack="acc-bundle-add-to-cart">{cqContent.label.OD_ACCESSORIES_ADD_TO_CART_CTA_TEXT}</Button>
          </Col>
        </Row>
      </Grid>
    );
  }
}

BundleAccessoryList.defaultProps = {
  recommendedAccessories: [],
  isFetching: false,
};

BundleAccessoryList.propTypes = {
  recommendedAccessories: PropTypes.array,
  addToCartUrl: PropTypes.string.isRequired,
  nextCTALink: PropTypes.string.isRequired,
  addAccessoryBundleToCart: PropTypes.func,
  selectedAccessory: PropTypes.object,
  cqContent: PropTypes.object,
  isFetching: PropTypes.bool,
  asyncFetch: PropTypes.func,
};

export default BundleAccessoryList;
