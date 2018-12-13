import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hashHistory } from './../../store';

import Title from '../../common/Title/Title';
import Loader from '../../common/Loader/Loader';


export default class ChoosePrice extends Component {
  constructor(props) {
    super(props);
    this.selectedPriceOption = null;
    this.state = {
      isFormValid: false,
      selectedPriceOption: props.devicePrice.filter((devicePrice) => devicePrice.contractSelected === true)[0] ? props.devicePrice.filter((devicePrice) => devicePrice.contractSelected === true)[0].contractTerm : null,
    };
  }

  componentDidMount() {
    // this.props.invalidateAsyncFetch();
    // Accessibility focus fix for hash navigation
    const pageTitle = document.getElementById('page_title');
    if (pageTitle) {
      pageTitle.focus();
    }
  }


  priceChanged = (self, contractTerm) => {
    this.setState({
      isFormValid: true,
      selectedPriceOption: contractTerm,
    });
  }

  proceedToEmail = () => {
    this.props.setSelectedDetails({ contractTerm: this.state.selectedPriceOption });
    hashHistory.push('/chooseEmail');
  }

  proceedToChooseCar = () => {
    this.props.setSelectedDetails({ contractTerm: this.state.selectedPriceOption });
    hashHistory.push('/chooseCar');
  }

  render() {
    const { cqJSON, devicePrice } = this.props;
    // const inStorePickUpUrl = humConfigData.actionURLs.inStorePickUpUrl;
    let isPreSelected = false;
    // const self = this;

    return (
      <div>
        {this.props.isFetching && <Loader />}
        <div className="pad18">
          <Title id="page_title" className="noSidePad" tabIndex="0">{cqJSON.label.OD_HUM_PRICE_TITLE}</Title>

          <div className="min_vh50 pad18 onlyTopPad">
            <form>
              {devicePrice.map((price, index) => {
                const radioName = `paymentOptionRadio${index}`;
                const selected = !!(price.contractSelected);

                if (selected) {
                  isPreSelected = true;
                }

                const priceSpan = price.discountedPrice && price.discountedPrice > 0 ?
                  <span><span className="margin6 onlyRightMargin textDecLineThrough">${price.originalPrice}</span><span>${parseFloat(price.discountedPrice).toFixed(2)}</span></span> :
                  <span>${price.originalPrice}</span>;

                return (
                  <div className="section group pad18 noSidePad border_grey onlyBottomBorder">
                    <input
                      id={radioName}
                      className="radioCustom"
                      name="paymentOption"
                      defaultChecked={selected}
                      value={price.contractTerm}
                      tabIndex="0"
                      onChange={() => this.priceChanged(this, price.contractTerm, index)}
                      analyticstrack="select-payment-option-radio"
                    />
                    <label htmlFor={radioName} className="fontTextBold radioCustom_label" >
                      <span className="block">
                        {priceSpan} {price.contractDetail} {price.edgeDownpayment > 0 ? `with ${parseFloat(price.edgeDownpayment).toFixed(2)} down` : price.contractName}
                      </span>
                      <span className="block pad6 onlyTopPad">{price.contractTitle}</span>

                      {price.edgeDownpayment > 0 &&
                      <a
                        role="link"
                        onClick={this.showDownPaymentModal}
                        analyticstrack="show-down-payment-modal-link"
                      >{cqJSON.label.OD_MF_DOWN_PAYMENT_LINK}
                      </a>}
                    </label>

                  </div>
                );
              })}
              <div className="section group pad12 noSidePad">
                <div className="col span_5_of_5 textAlignCenter">
                  <button
                    disabled={(this.state.isFormValid || isPreSelected ? '' : 'disabled')}
                    type="button"
                    className="large button primary"
                    onClick={() => this.proceedToChooseCar()}
                    analyticstrack="proceed-to-choose-car-cta"
                  >
                    {cqJSON.label.OD_HUM_PAGE_CTA}
                  </button>
                  {/* <a
                    href={inStorePickUpUrl}
                    className="displayBlock margin20 onlyTopMargin"
                  >
                    {cqJSON.label.OD_HUM_ISPU_LINK}
                  </a> */}
                </div>
              </div>
            </form>
          </div>


        </div>
      </div>
    );
  }
}

ChoosePrice.propTypes = {
  cqJSON: PropTypes.object,
  isFetching: PropTypes.bool,
  // humConfigData: PropTypes.object,
  devicePrice: PropTypes.array,
  setSelectedDetails: PropTypes.func,
};
