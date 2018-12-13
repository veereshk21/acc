import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Bundles from './Bundles';
/* Common components */
import Title from '../../common/Title/Title';
import Loader from '../../common/Loader/Loader';
import Button from '../../common/Button/Button';
import HorizontalRule from '../../common/HorizontalRule';

/* Page sepcific components */
import Accessory from './Accessory';
/**
 * AccessoriesPage Component
 * @class AccessoriesPage
 * @extends {Component}
 */
/* eslint-disable react/prefer-stateless-function */
class AccessoriesPage extends Component {
  constructor(props) {
    super(props);
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
  onClickAddToCart(productId, accSkuId, accName) {
    this.props.addAccessoryToCart(this.props.addToCartUrl, productId, accSkuId, accName);
  }


  /**
   * render method
   * @returns Component
   * @memberof AccessoriesPage
   */
  render() {
    const {
      selectedDeviceName, recommendedAccessories, cqContent, asyncFetch, isFetching, bundledAccessories,
    } = this.props;
    const accesoryLen = recommendedAccessories.length ? recommendedAccessories.length - 1 : 0;
    return (
      <Grid className="pad32">
        {isFetching && <Loader />}
        <Title>{cqContent.label.OD_ACCESSORIES_PAGE_TITLE}</Title>
        <Row>
          <Col xs={12} >
            <p className="pad16 onlyTopPad" dangerouslySetInnerHTML={{ __html: `${cqContent.label.OD_ACCESSORIES_PAGE_DESC_PREFIX_TEXT} ${selectedDeviceName}.` }} />
            <HorizontalRule />
          </Col>

        </Row>
        {bundledAccessories && <Bundles bundledAccessories={bundledAccessories} cqContent={cqContent} recommendedAccessories={recommendedAccessories} />}
        {recommendedAccessories.map((accessoryDetail, index) =>
          (accessoryDetail.skuDetails !== null &&
            <Accessory
              inlineAccessory
              asyncFetch={asyncFetch}
              details={accessoryDetail}
              cqLabel={cqContent}
              onClickAddToCart={this.onClickAddToCart}
              onColorChange={(i) => this.setState({ skuIndex: i })}
              isLastElem={(index === accesoryLen)}
              bundledAccessories={bundledAccessories}
            />))}
        <div className=" footerFixed">
          <Button onClick={this.onClickNextCTA} className="large button primary centerBlock" analyticstrack="acc-go-next-page">{cqContent.label.OD_ACCESSORIES_NEXT_CTA_TEXT}</Button>
        </div>
      </Grid>
    );
  }
}

AccessoriesPage.defaultProps = {
  bundledAccessories: [],
  recommendedAccessories: [],
  cqContent: {
    label: {
      OD_ACCESSORIES_PAGE_TITLE: '',
      OD_ACCESSORIES_PAGE_DESC_PREFIX_TEXT: '',
      OD_ACCESSORIES_ADD_TO_CART_CTA_TEXT: '',
      OD_ACCESSORIES_LEARN_MORE_LINK_TEXT: '',
      OD_ACCESSORIES_NEXT_CTA_TEXT: '',
    },
  },
  isFetching: false,
};

AccessoriesPage.propTypes = {
  selectedDeviceName: PropTypes.string,
  recommendedAccessories: PropTypes.array,
  bundledAccessories: PropTypes.array,
  addToCartUrl: PropTypes.string,
  nextCTALink: PropTypes.string,
  cqContent: PropTypes.object,
  addAccessoryToCart: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  asyncFetch: PropTypes.func,
};

export default AccessoriesPage;
