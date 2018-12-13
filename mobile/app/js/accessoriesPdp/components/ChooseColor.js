import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import { history } from './../../store';

import PromoBadge from '../../common/PromoBadge/PromoBadge';
import Title from '../../common/Title/Title';
import Img from '../../common/Img/Img';
import Loader from '../../common/Loader/Loader';


/* eslint-disable react/prefer-stateless-function */
export default class ChooseColor extends Component {
  constructor(props) {
    super(props);
    this.colorChanged = this.colorChanged.bind(this);
    this.onNextClick = this.onNextClick.bind(this);
    this.state = {
      isFetching: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const colorSkus = _.uniqBy(this.props.skus, 'colorName');
    const selectedColorSku = colorSkus.filter((sku) => sku.skuId === nextProps.match.params.selectedSkuId)[0];
    const { params: { selectedSkuId } } = nextProps.match;
    if (selectedSkuId !== this.props.selectedSkuId) {
      this.props.changeColor(selectedColorSku.colorName, selectedColorSku.size, selectedColorSku.skuId, selectedColorSku.displayName);
    }
  }

  onNextClick(event) {
    this.setState({ isFetching: true });
    event.preventDefault();
    const capacitySkus = this.props.skuDetails.filter((sku) => (sku.colorName === this.props.selectedColor && sku.size !== ''));
    if (capacitySkus.length > 1) {
      history.push('/chooseCapacity/skuId=' + this.props.accSkuId);
    } else {
      const { accId, accSkuId, displayName } = this.props;
      // TODO:
      this.props.addAccessoryToCart(window.accessoriesPdpJSON.output.addToCartURL, accId, accSkuId, displayName);
      this.setState({ isFetching: false });
    }
  }

  colorChanged(colorName, size, accSkuId, displayName) {
    this.props.changeColor(colorName, size, accSkuId, displayName);
    history.push('/chooseColor/skuId=' + accSkuId);
  }

  render() {
    const availSelectedColorSkus = this.props.skuDetails.filter((sku) => sku.colorName === this.props.selectedColor && sku.inventoryStatus !== 1001);
    const isOutOfStock = (availSelectedColorSkus.length === 0);

    const { cqJSON } = this.props;
    // TODO:
    const selectedAccItem = this.props.selectedSkuDetails;
    return (
      <div className="configurator-wrapper positionRelative">
        {this.state.isFetching === true && <Loader />}
        <div className="pad18 noBottomPad">
          <Title className="textAlignCenter">{cqJSON.label.OD_ACCPDP_COLOR_TITLE}</Title>
          <div className="section group">
            <div className="col span_5_of_5 pad18 onlySidePad fontSize_4">
              {(selectedAccItem.discountedPrice !== null && selectedAccItem.discountedPrice > 0) ?
                <div className="textAlignCenter">
                  <span className="displayInlineBlock fontSize_4 color_959595 textDecLineThrough pad6 onlyRightPad">${selectedAccItem.retailPrice}</span>
                  <span className="displayInlineBlock fontSize_4 fontWeightBold">${selectedAccItem.discountedPrice}</span>
                  &nbsp;<span className="fontSize_3">{cqJSON.label.OD_ACCPDP_OPTIONS_PRICE_TEXT}</span>
                </div> :
                <div className="textAlignCenter">
                  <span className="displayInlineBlock fontSize_4 fontWeightBold">${selectedAccItem.retailPrice}</span>
                  <span className="fontSize_3 margin6 onlySideMargin">{cqJSON.label.OD_ACCPDP_OPTIONS_PRICE_TEXT}</span>
                </div>
              }

            </div>
          </div>
          {/* eslint-disable no-script-url */}
          {
            isOutOfStock &&
            <div className="section group">
              <a role="button" href="javascript:void(0)" className="fontSize_2 margin10 onlyTopMargin displayBlock center red">{cqJSON.label.OD_ACCPDP_CURRENTLY_UNAVAILABLE_TEXT}</a>
            </div>
          }
          <div className="section group pad12 onlyTopPad">
            <div className="col span_5_of_5">
              <div className="center">
                <Img src={`${this.props.ImageUrl}&hei=260`} alt={this.props.ImageName} />
              </div>
            </div>
          </div>
          <div className="section group">
            <div className="col span_5_of_5 textAlignCenter">
              <div className="smallText bold">
                {selectedAccItem.colorName}
              </div>
            </div>
          </div>
          <div className="section group pad6 noSidePad">
            <div className="col span_5_of_5">
              <div className="textAlignCenter overflowXAuto whiteSpaceNoWrap">
                {this.props.colorSkus.map((sku, index) => {
                  const bckgrdStyle = { backgroundColor: sku.colorStyle };
                  if (sku.colorStyle === '#ffffff') {
                    bckgrdStyle.color = '#000000';
                  }
                  const radioName = `colorSelectionRadio${index}`;
                  const selected = (sku.colorName === this.props.selectedColor);
                  return (
                    <div className="displayInlineBlock">
                      <input type="radio" name="colorSelection" id={radioName} className="colorSelector" value={sku.colorName} checked={selected} onChange={this.colorChanged.bind(null, sku.colorName, sku.size, sku.skuId, sku.displayName)} tabIndex={index} />
                      <label key={sku.colorName} htmlFor={radioName} title={sku.colorName} className={`colorSelector_label colorSelector_checkShadow ${selected ? 'is-selected' : ''}`} style={bckgrdStyle}>
                        <span aria-hidden="true" className="colorSelector_check" />
                        <div className="colorSelector_name displayInlineBlock" >{sku.colorName}</div>
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="section group pad12 noSidePad">
            <div className="col span_5_of_5 textAlignCenter">
              {
                isOutOfStock ? <button type="button" aria-label="This color is not available" className="large button primary disabled">{cqJSON.label.OD_ACCPDP_NEXT_BUTTON_TEXT}</button> :
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

ChooseColor.propTypes = {
  skuDetails: PropTypes.array,
  selectedColor: PropTypes.string,
  selectedSkuDetails: PropTypes.object,
  ImageUrl: PropTypes.string,
  ImageName: PropTypes.string,
  colorSkus: PropTypes.array,
  promoDetail: PropTypes.string,
  changeColor: PropTypes.func,
  cqJSON: PropTypes.object,
  addAccessoryToCart: PropTypes.func,
  accId: PropTypes.string,
  accSkuId: PropTypes.string,
  displayName: PropTypes.string,
  selectedSkuId: PropTypes.string,
  params: PropTypes.object,
  skus: PropTypes.array,
  match: PropTypes.object,
};
