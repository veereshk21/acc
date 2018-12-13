/* eslint-disable react/no-string-refs */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import Title from '../../common/Title/Title';

class AddDeviceOffer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSku: props.selectedSku,
      capacitySkus: props.capacitySkus,
      isSizeAvailable: props.capacitySkus.filter((sku) => sku.size).length,
      selectedContract: props.selectedContract,
    };
  }
  onAvailOffer = () => {
    const { selectedSku } = this.state;
    const { pageJSON } = this.props;
    const selectedContract = selectedSku.paymentOptions && selectedSku.paymentOptions[0].contractTerm;
    const formData = {
      deviceSorId: selectedSku.deviceSorId,
      deviceSkuId: selectedSku.skuId,
      contractTerm: selectedContract,
      action: 'ADD',
      edit: false,
      inventoryStatus: selectedSku.inventoryStatus,
      deviceType: pageJSON.deviceType,
      deviceProdId: pageJSON.productId,
    };
    window.location.href = pageJSON.primaryCTAURL + '?' + qs.stringify(formData);
    // submitAction(formData, pageJSON.primaryCTAURL);
  };
  updatePaymentOptions = () => {
    const { skus } = this.props.pageJSON;
    const selectedColor = skus.filter((sku) => sku.colorCode === this.color.value);
    const selectedSku = this.size ? selectedColor.filter((sku) => sku.size === this.size.value)[0] : selectedColor[0];
    this.setState({
      selectedSku,
    });
  };
  render() {
    const { pageJSON } = this.props;
    const { selectedSku } = this.state;
    const deviceTitle = pageJSON.brandName + ' ' + pageJSON.displayName;
    return (
      <div>
        <div className="pad24">
          <div className="vh70">
            <Title className="fontSize_6 textAlignCenter outlineNone">{pageJSON.offerTitle} </Title>
            <div className="flexContent_offerPage">
              <p className="flexTitle_offerPage flexDescription_offerPage" dangerouslySetInnerHTML={{ __html: pageJSON.offerDescription }} />
              <p className="flexTitle_offerPage">
                <img src={`${selectedSku.deviceImage}&hei=200`} alt={pageJSON.displayName} />
              </p>
              <h2 className="fontSize_5 color_000 flexTitle_offerPage" dangerouslySetInnerHTML={{ __html: deviceTitle }} />
            </div>
          </div>
          <div className="clearfix textAlignCenter">
            <a href={pageJSON.secondaryCTAURL} className="button secondary margin12 large" analyticstrack="skip-offer">{pageJSON.secondaryCTA}</a>
            <input type="button" value={pageJSON.primaryCTA} className="primary button margin12 large" onClick={this.onAvailOffer} analyticstrack="avail-offer" />
          </div>
          <div className="legalFinePrint pad12">
            {pageJSON.legalCopy}
          </div>
        </div>
      </div>
    );
  }
}

AddDeviceOffer.propTypes = {
  pageJSON: PropTypes.object,
  selectedSku: PropTypes.object,
  capacitySkus: PropTypes.array,
  selectedContract: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
};

export default AddDeviceOffer;
