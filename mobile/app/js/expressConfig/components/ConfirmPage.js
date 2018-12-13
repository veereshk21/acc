/**
 * Created by santhra  on 6/15/2017.
 */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/no-did-mount-set-state */
import React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import A from '../../common/A/A';
import Img from '../../common/Img/Img';
// import CountdownClock from './CountdownClock';
import PreOrderInterstrial from './../../common/PreOrder';

class ExpressConfigComponent extends React.Component {
  constructor(props) {
    super(props);
    const expressConfigData = props.expressConfigData;
    let selectedIndex = 0;
    const filteredSku = expressConfigData.devices.map((sku) => (sku.skus.filter((skuDetails) => skuDetails.id === props.defaultSkuId)[0]));
    let getDefaultSku = null;
    filteredSku.forEach((sku, index) => {
      if (typeof sku !== 'undefined') {
        getDefaultSku = sku;
        selectedIndex = index;
      }
    });
    this.state = {
      selectedModelIndex: selectedIndex,
      selectedModelName: expressConfigData.devices[selectedIndex].model,
      selectedColor: (getDefaultSku !== null) ? getDefaultSku.color : _.uniqBy(expressConfigData.devices[0].skus, 'color')[0].color,
      selectedCapacity: (getDefaultSku !== null) ? getDefaultSku.capacity : _.uniqBy(props.expressConfigData.devices[0].skus, 'capacity')[0].capacity,
      isTradeIn: false,
      selectedPriceInfoIndex: 0,
      isCountDownCompleted: props.enableFlow ? false : this.calculateTimeRemaining(),
      queryParam: '',
    };
  }

  componentDidMount() {
    const urlStr = window.location.href;
    const urlSplit = urlStr.split('&');
    const urlqueryparam = urlStr.split('?');

    if (urlSplit) {
      this.setState({ queryParam: urlqueryparam[1] });
      const tradeinSelected = urlSplit.find((item) => item.indexOf('tradeinSelected') >= 0);

      if (tradeinSelected) {
        this.setState({ isTradeIn: (tradeinSelected.split('=')[1].split('#')[0] !== 'false') });
      }
      const contractTerm = urlSplit.find((item) => item.indexOf('contractTerm') >= 0);

      if (contractTerm) {
        const contrVal = contractTerm.split('=')[1];
        this.setState({ selectedPriceInfoIndex: (contrVal === 0) ? 1 : 0 });
      }
    }
  }

  onCountDownComplete = () => {
    if (this.state.isCountDownCompleted) {
      this.setState({ isCountDownCompleted: false });
      this.props.getPageJSONAPI(this);
    }
  }

  calculateTimeRemaining = () => {
    const formattedGivenDate = new Date(this.props.expressConfigData.givenDate);
    console.log(this.props.expressConfigData.givenDate);
    console.log(formattedGivenDate);
    const today = new Date();
    const msDiff = typeof window.duration !== 'undefined' ? window.duration : (formattedGivenDate - today);
    console.log(msDiff);
    return !((msDiff < 0));
  }

  render() {
    const { expressConfigData, inventoryData } = this.props;
    const currentdeviceSKUArr = expressConfigData.devices[this.state.selectedModelIndex].skus;
    const skuID = currentdeviceSKUArr.filter((sku) => (sku.color === this.state.selectedColor && sku.capacity === this.state.selectedCapacity))[0].id;
    const imageURL = currentdeviceSKUArr.filter((sku) => sku.color === this.state.selectedColor)[0].image;
    const princeInfo = (!this.state.isTradeIn) ? currentdeviceSKUArr.filter((sku) => sku.id === skuID)[0].notradein : currentdeviceSKUArr.filter((sku) => sku.id === skuID)[0].tradein;
    const priceArr = princeInfo.filter((item, index) => index === this.state.selectedPriceInfoIndex)[0].priceMsg;
    return (
      <div>
        {
          (this.state.isCountDownCompleted && expressConfigData.enableCountdown) ?
            <PreOrderInterstrial image={expressConfigData.defaultImage} title={expressConfigData.counterTitle} enableCountdown={this.state.isCountDownCompleted} onCountDownComplete={this.onCountDownComplete} ButtonMap={expressConfigData.ButtonMap} givenDate={expressConfigData.givenDate} subTitle={expressConfigData.subtitle} />
            : <div>
              <h1 className="fontSize_6 margin6 onlySidePad onlyTopMargin outlineNone pad18 red textAlignCenter">{expressConfigData.confirmationTitle}</h1>
              <p
                className="pad6 textAlignCenter noSidePad fontSize_2"
              >{(typeof inventoryData[skuID] !== 'undefined') ? inventoryData[skuID].availableDate : ''}
              </p>
              <div className="noSidePad pad18" >
                <div className="margin100 noSideMargin textAlignCenter pad12" >
                  <Img src={`${imageURL}?$png8alpha256$&hei=180`} alt={imageURL} />
                </div>
              </div>
              <div>
                <h3 className="textAlignCenter h5">{this.state.selectedModelName}</h3>
                <div className="textAlignCenter fontSize_2 pad6 noSidePad" >{`${this.state.selectedColor}, ${this.state.selectedCapacity}`} </div>
                <div className="textAlignCenter fontSize_2">{priceArr}</div>
              </div>
              <div className="textAlignCenter clearBoth width100 pad36 noSidePad">
                {(typeof expressConfigData.ButtonMap.ConfirmationSecondaryButton !== 'undefined' && expressConfigData.ButtonMap.ConfirmationSecondaryButton !== null) &&
                  <A
                    href={`${expressConfigData.ButtonMap.ConfirmationSecondaryButton.actionURL}&${this.state.queryParam}`}
                    className="large button secondary margin18 onlyRightMargin"
                  >
                    {expressConfigData.ButtonMap.ConfirmationSecondaryButton.title}
                  </A>
                }
                <A
                  className="large button primary"
                  href={`${expressConfigData.ButtonMap.ConfirmationPrimaryButton.actionURL}&${this.state.queryParam}`}
                >
                  {expressConfigData.ButtonMap.ConfirmationPrimaryButton.title}
                </A>
              </div>
            </div>
        }
      </div>
    );
  }
}

ExpressConfigComponent.propTypes = {
  expressConfigData: PropTypes.object,
  defaultSkuId: PropTypes.string,
  enableFlow: PropTypes.bool,
  getPageJSONAPI: PropTypes.func,
  inventoryData: PropTypes.object,
};

export default ExpressConfigComponent;

