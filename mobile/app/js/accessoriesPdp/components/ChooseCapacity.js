import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import { history } from './../../store';

import Title from '../../common/Title/Title';
import Img from '../../common/Img/Img';
import PromoBadge from '../../common/PromoBadge/PromoBadge';
import Loader from '../../common/Loader/Loader';

export default class ChooseCapacity extends Component {
  constructor(props) {
    super(props);
    this.capacityChanged = this.capacityChanged.bind(this);
    this.onNextClick = this.nextClick.bind(this);
  }

  componentDidMount() {
    // Accessibility focus fix for hash navigation
    const pageTitle = document.getElementById('page_title');
    if (pageTitle) {
      pageTitle.focus();
    }
  }

  capacityChanged(size, accSkuId, displayName) {
    this.props.changeCapacity(size, accSkuId, displayName);
    history.push('/chooseCapacity/skuId=' + accSkuId);
  }
  nextClick(event) {
    event.preventDefault();
    const { accId, accSkuId, displayName } = this.props;
    // TODO:
    this.props.addAccessoryToCart(window.accessoriesPdpJSON.output.addToCartURL, accId, accSkuId, displayName);
  }

  render() {
    const isOutOfStock = (this.props.selectedSkuDetails.inventoryStatus === 1001);
    // const isShipByDate = !!((typeof this.props.selectedSkuDetails.shippingDateLabel !== 'undefined' && this.props.selectedSkuDetails.shippingDateLabel !== null));
    const { cqJSON } = this.props;
    const customStyleTitle = {
      outline: 'none',
    };

    const skussArr = this.props.skus;
    const sortedSkus = _.orderBy(skussArr, ['sorSkuId'], ['desc']);

    return (
      <div className="pad18 noBottomPad configurator-wrapper positionRelative">
        {this.props.isFetching === true && <Loader />}
        <div>
          <Title className="textAlignCenter" id="page_title" tabIndex="0" style={customStyleTitle}>{cqJSON.label.OD_ACCPDP_SIZE_TITLE}</Title>
          <div className="section group">
            <div className="col span_5_of_5 pad18 onlySidePad fontSize_2">

              {(this.props.selectedSkuDetails.discountedPrice !== null && this.props.selectedSkuDetails.discountedPrice > 0) ?
                <div className="textAlignCenter">
                  <span className="displayInlineBlock fontSize_4 color_959595 textDecLineThrough pad6 onlyRightPad">${this.props.selectedSkuDetails.retailPrice}</span>
                  <span className="displayInlineBlock fontSize_4 fontWeightBold">${this.props.selectedSkuDetails.discountedPrice}</span>
                  &nbsp;<span className="fontSize_3">{cqJSON.label.OD_ACCPDP_OPTIONS_PRICE_TEXT}</span>
                </div> :
                <div className="textAlignCenter">
                  <span className="displayInlineBlock fontSize_4 fontWeightBold">${this.props.selectedSkuDetails.retailPrice}</span>
                  <span className="fontSize_3">{cqJSON.label.OD_ACCPDP_OPTIONS_PRICE_TEXT}</span>
                </div>
              }

            </div>
          </div>
          <div>
            <div className="section group pad12 onlyTopPad">
              <div className="col span_5_of_5">
                <div className="center">
                  <Img src={`${this.props.ImageUrl}&hei=260`} alt={this.props.ImageName} />
                </div>
              </div>
            </div>
            <div className="pad30 noSidePad textAlignCenter ">
              <form>
                {sortedSkus.map((sku, index) => {
                  const radioName = `colorSelectionRadio${index}`;
                  const selected = (sku.size === this.props.selectedCapacity);
                  return (
                    <p className="displayInlineBlock clearRight" key={sku.deviceSkuId}>
                      <input type="radio" name="colorSelection" id={radioName} className="colorSelector" value={sku.size} onChange={this.capacityChanged.bind(null, sku.size, sku.skuId, sku.displayName)} tabIndex={index} />
                      <label key={sku.size} htmlFor={radioName} title={sku.size} className={`sizeSelector_label  ${selected ? 'is-selected' : ''}`} tabIndex={index}>
                        <span aria-hidden="true" className="colorSelector_check" />
                        <div className="colorSelector_name displayInlineBlock" >{sku.sizeDisplayName}</div>
                        <span className="fontDisplayMedium">{sku.sizeDisplayName}</span>
                      </label>
                    </p>
                  );
                })}
              </form>
            </div>
          </div>
          <div className="section group">
            <div className="col span_5_of_5 noSidePad pad12 textAlignCenter no-gutter">
              {
                isOutOfStock ? <button type="button" aria-label="This size is not available" className="large button primary disabled">{cqJSON.label.OD_MF_NEXT_CTA}</button> :
                  <button type="button" className="large button primary" onClick={this.onNextClick}>{cqJSON.label.OD_ACCPDP_NEXT_BUTTON_TEXT}</button>
              }
            </div>
          </div>
        </div>
        {
          (this.props.promoDetail !== null && this.props.promoDetail !== '') ? <PromoBadge className="m-configurator positionRelative width100 bottom0" animated>{this.props.promoDetail}</PromoBadge> : ''
        }
      </div>
    );
  }
}

ChooseCapacity.propTypes = {
  changeCapacity: PropTypes.func,
  selectedSkuDetails: PropTypes.object,
  ImageUrl: PropTypes.string,
  promoDetail: PropTypes.object,
  ImageName: PropTypes.string,
  skus: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  selectedCapacity: PropTypes.string,
  cqJSON: PropTypes.object,
  accId: PropTypes.string,
  accSkuId: PropTypes.string,
  displayName: PropTypes.string,
  addAccessoryToCart: PropTypes.string,
  isFetching: PropTypes.bool,
};
