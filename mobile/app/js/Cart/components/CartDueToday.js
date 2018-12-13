/**
 * Created by hmahad on 1/6/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import Title from '../../common/Title/Title';
import BackButton from '../../common/BackButton/BackButton';


import HeroPriceComponent from '../../common/HeroPrice/HeroPriceComponent';

/** TODO: JSON to be changed to allow conditional rendering of prices.
 * TODO: How does one find out which price item to display?
 * TODO:Should price be in numbers? */
export default class CartDueToday extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    this.onChangeLocation = this.onChangeLocation.bind(this);
  }

  componentDidMount() {
    // Accessibility focus fix for hash navigation
    const pageTitle = document.getElementById('section_title');
    if (pageTitle) {
      pageTitle.focus();
    }
  }

  onChangeLocation(event) {
    event.preventDefault();
    this.props.push('/enterZip'); // eslint-disable-line
  }
  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    console.log('Error:', error, '\n Info:', info);
    // You can also log the error to an error reporting service
  }
  renderAccessorySection = () => (
    this.props.accessories.map((item, i) => {
      const accessoriesItems = [];
      for (let j = 0; j < item.get('quantity'); j++) {
        accessoriesItems.push(<div key={i + '' + j + 'accessory'} className="dueTodayBreakDown">
          <section className="section group pad12 noSidePad border_grey onlyBottomBorder">
            <div className="col span_4_of_5">
              <p className="fontSize_3 fontDisplayMedium">
                <span dangerouslySetInnerHTML={{ __html: item.get('name') }} />
                <span dangerouslySetInnerHTML={{ __html: item.get('deviceProductDisplayName') }} />
              </p>
              <p className="fontSize_2 color_666">
                {item.get('color') && <span>{item.get('color')}</span>}
                {item.get('color') && item.get('size') && <span>, </span>}
                {item.get('size') && <span>{item.get('size')}</span>}
              </p>
              <span className="col ">
                {(item.get('discountPercentage') > 0) ? (
                  <span className="displayBlock color_666 pad10 onlyTopPad">
                    <span>{parseFloat(item.get('discountPercentage'), 10)}</span>
                    <span>{this.props.CQLabel.get('OD_DUE_TODAY_OFF_SALE')}</span>
                  </span>
                ) : ''}
              </span>
            </div>
            <div className="col span_1_of_5">
              <div className="textAlignRight">
                {item.get('discounted') ?
                  <span>
                    <span className="color_red textDecLineThrough">${item.get('wasPrice')}</span>
                    <span className="displayBlock  color_666 pad10 onlyTopPad fontDisplayMedium">${item.get('price')}</span>
                  </span>
                  :
                  <span className="fontDisplayMedium">${item.get('price')}</span>
                }
              </div>
            </div>
          </section>
        </div>);
      }
      return accessoriesItems.map((accessories) => (
        <div>{accessories}</div>));
    }));

  renderAccessoriesBundleOptions = () => {
    const { accessoriesBundle } = this.props;
    const renderedOptions = accessoriesBundle.map((item, index) => (
      <section key={index} className="section group pad12 noSidePad border_grey onlyBottomBorder">
        <ul className=" plainList cartList background_FF">
          <li className="clearfix" role="row">
            <div className="col width70">
              <p className="fontSize_3 fontDisplayMedium">
                <span dangerouslySetInnerHTML={{ __html: item.displayName }} />
              </p>
              <span className="col ">
                {(item.discountPercentage > 0) &&
                  <span className="displayBlock color_666 pad10 onlyTopPad">
                    <span>{parseFloat(item.discountPercentage, 10)}</span>
                    <span>{this.props.CQLabel.get('OD_DUE_TODAY_OFF_SALE')}</span>
                  </span>
                }
              </span>
            </div>
            <div className="floatRight">
              {(item.discountedPrice === item.regularPrice) ?
                <p className="fontDisplayMedium">${item.regularPrice}</p>
                :
                <div><p className="textDecLineThrough red">${item.regularPrice}</p><p className="fontDisplayMedium">${item.discountedPrice}</p></div>
              }
            </div>
          </li>
        </ul>
      </section>
    ));
    return renderedOptions;
  }

  renderDevicePriceBreakdown = (item) => {
    // console.log(item.toJS());
    let sectionItemsCount = 0;
    let isUpgradeFeeWaivedOffer = '';
    if (item.get('flow') === 'EUP' || item.get('flow') === 'AAL') {
      sectionItemsCount += 1;
    }
    if (item.get('edgeItemDownPaymentAmount') > 0) {
      sectionItemsCount += 1;
    }
    if ((parseFloat(item.get('price'), 10) > 0 && item.get('contractTerm') === '0')) {
      sectionItemsCount += 1;
    }
    if (item.get('deviceEdgeBuyOutAmount') > 0) {
      sectionItemsCount += 1;
    }
    if (item.get('deviceEdgeUpAmount') > 0) {
      sectionItemsCount += 1;
    }

    if (sectionItemsCount < 1) {
      return ('');
    }

    item.get('devicePromotionList').map((promo) => { //eslint-disable-line
      if (promo.get('isUpgradeFeeWaivedOffer') === true) isUpgradeFeeWaivedOffer = promo;
    });

    const cartSection = (
      <div>
        <ul className=" plainList cartList background_FF">

          {item.get('flow') === 'EUP' &&
            <li className="clearfix margin6 onlyTopMargin" role="row" aria-label={item.get('waivedUpgradeFeePromo') ? `${this.props.CQLabel.get('OD_CART_DUE_TODAY_UPGRADE_FEE')} ${this.props.CQLabel.get('OD_CART_WAIVED_TITLE')} ${this.props.CQLabel.get('OD_CART_DUE_TODAY_UPGRADE_FEE')}` : `${this.props.CQLabel.get('OD_CART_DUE_TODAY_UPGRADE_FEE')} $${item.get('upgradeFee')}`}>
              {item.get('waivedUpgradeFeePromo') &&
                <span className="col span_4_of_5">
                  {this.props.CQLabel.get('OD_CART_DUE_TODAY_UPGRADE_FEE')}
                  <span className=" displayBlock color_666 fontSize_2">
                    {this.props.CQLabel.get('OD_CART_WAIVED_TITLE')}
                    {this.props.CQLabel.get('OD_CART_DUE_TODAY_UPGRADE_FEE')}
                  </span>
                </span>
              }
              {(!isUpgradeFeeWaivedOffer || !isUpgradeFeeWaivedOffer.get('isUpgradeFeeWaivedOffer')) && !item.get('upgradeFeeWaived') &&
                <span>
                  <span className="col span_4_of_5">{this.props.CQLabel.get('OD_CART_DUE_TODAY_UPGRADE_FEE')}</span>
                  <span className="col span_1_of_5 textAlignRight fontDisplayMedium">${item.get('upgradeFee')}</span>
                </span>
              }
            </li>}
          {item.get('edgeItemDownPaymentAmount') > 0 &&
            <li className="clearfix margin6 onlyTopMargin" role="row" aria-label={`${this.props.CQLabel.get('OD_CART_DUE_TODAY_DOWN_PAYMENT')} $${item.get('edgeItemDownPaymentAmount')}`}>
              <span className="col span_4_of_5">{this.props.CQLabel.get('OD_CART_DUE_TODAY_DOWN_PAYMENT')}</span>
              <span className="col span_1_of_5 textAlignRight fontDisplayMedium">${item.get('edgeItemDownPaymentAmount')}</span>
            </li>
          }


          {(parseFloat(item.get('price'), 10) > 0 && (item.get('contractTerm') === '0' || item.get('contractTerm') === '24')) &&
            <li className="clearfix margin6 onlyTopMargin" role="row" aria-label={`${item.get('priceSubTitle')} $${item.get('price')}`}>
              <span className="floatLeft width60">{item.get('priceText')}
                <span className="color_333 fontSize_2 block">{item.get('priceSubTitle')}</span>
              </span>
              {(item.get('originalPrice') > item.get('price')) ?
                <span className="floatRight"><span className="margin6 red textDecLineThrough">${item.get('originalPrice')}</span><span className="fontDisplayMedium">${item.get('price')}</span></span>
                :
                <span className="floatRight fontDisplayMedium">${item.get('price')}</span>
              }
            </li>}

          {item.get('deviceEdgeBuyOutAmount') > 0 &&
            <li className="clearfix margin6 onlyTopMargin" role="row" aria-label={`${this.props.CQLabel.get('OD_CART_DUE_TODAY_REMAINING_BALANCE')} $${item.get('deviceEdgeBuyOutAmount')}`}>
              <span className="col span_4_of_5">{this.props.CQLabel.get('OD_CART_DUE_TODAY_REMAINING_BALANCE')}</span>
              <span className="col span_1_of_5 textAlignRight fontDisplayMedium">${item.get('deviceEdgeBuyOutAmount')}</span>
            </li>
          }
          {item.get('deviceEdgeUpAmount') > 0 &&
            <li className="clearfix margin6 onlyTopMargin" role="row" aria-label={`${this.props.CQLabel.get('OD_CART_DUE_TODAY_EARLY_UPGRADE_BALANCE')} $${item.get('deviceEdgeUpAmount')}`}>
              <span className="col span_4_of_5">{this.props.CQLabel.get('OD_CART_DUE_TODAY_EARLY_UPGRADE_BALANCE')}</span>
              <span className="col span_1_of_5 textAlignRight fontDisplayMedium">${item.get('deviceEdgeUpAmount')}</span>
            </li>
          }
        </ul>
        {item.get('upgradeFeeWaived') && !isUpgradeFeeWaivedOffer &&
          <div className="pad6 noSidePad clearfix">
            <span className="floatLeft width60">Upgrade fee waived:</span>
            <span className="floatRight"><span className="margin6 red textDecLineThrough">${item.get('originalUpgradeFee')}</span> <span className="fontDisplayMedium">${item.get('upgradeFee')}</span></span>
          </div>
        }
      </div>
    );
    const hasChildren = cartSection.props.children.filter((child) => {
      if (!child && child !== '') { return null; }
      return child;
    });
    // console.log(hasChildren);
    return (hasChildren.length > 0 && cartSection) || null;
  }

  render() {
    const { items } = this.props;
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <div>Something went wrong.</div>;
    }
    return (
      <div className="pad12 onlyTopPad">
        <BackButton to="/" aria-label="Go Back" >
          {this.props.CQLabel.get('OD_CART_BACK_CTA')}
        </BackButton>
        <div className="cartPage_dmBrkdwn pad20 onlySidePad">
          <section className="section group pad18 onlyBottomPad margin12 onlyTopMargin textAlignCenter">
            <Title
              id="section_title"
              tabIndex="0"
              className="fontSize_7 textAlignCenter pad18 onlySidePad outlineNone outlineNone "
            >
              {this.props.CQLabel.get('OD_CART_DEVICE_DUE_TODAY_TITLE')}
            </Title>
            <HeroPriceComponent displayPrice={this.props.totalDueToday}>{this.props.totalDueToday}</HeroPriceComponent>
          </section>
          <div >
            {items &&
              <div className="border_00 onlyBottomBorder pad12 onlyBottomPad">
                <h2 className="h3">{this.props.CQLabel.get('OD_CART_DEVICES_SECTION_TITLE')}</h2>
              </div>
            }
            {items && items.map((item, i) => (
              <div key={i} className="pad12 noSidePad dueTodayBreakDown border_grey onlyBottomBorder">
                <section className="section group">
                  <h3 className="bold fontSize_3">
                    {item.get('deviceManufactureName')} <span dangerouslySetInnerHTML={{ __html: item.get('deviceProductDisplayName') }} />
                  </h3>
                  <p className="fontSize_2">{item.get('colorName') !== null && item.get('colorName')} {(item.get('colorName') && item.get('capacity')) ? ',' : ''} {item.get('capacity') !== null && item.get('capacity')}</p>
                </section>
                {this.renderDevicePriceBreakdown(item) !== null &&
                  <section className="section group">
                    {this.renderDevicePriceBreakdown(item)}
                  </section>}
                {item.get('devicePromotionList') && item.get('devicePromotionList').map((promo, index) => (
                  <div key={`promo-${index}`} >
                    {
                      promo.get('isUpgradeFeeWaivedOffer') &&
                      <div className="pad6 noSidePad clearfix">
                        <span className="floatLeft width70">Upgrade fee waived:</span>
                        <span className="floatRight  "><span className="margin6 red textDecLineThrough">${item.get('originalUpgradeFee')}</span> <span>${item.get('upgradeFee')}</span></span>
                      </div>
                    }
                    {item.get('contractTerm') !== '99' && !promo.get('isUpgradeFeeWaivedOffer') && (promo.get('promoAmount') !== null && parseFloat(promo.get('promoAmount'), 10) > 0) &&
                      <div className="pad6 noSidePad clearfix">
                        <span className="floatLeft width70">{this.props.CQLabel.get('OD_CART_DISCOUNT_APPLIED_TEXT')}</span>
                        <span className="floatRight  ">${promo.get('promoAmount')}</span>
                      </div>}
                  </div>
                ))}

                {/* item.get('devicePromotionList') && item.get('devicePromotionList').map((promo, index) => (
                  (promo.get('promoAmount') !== null && parseFloat(promo.get('promoAmount'), 10) > 0) &&
                  <div key={`key-${index}`} className="clearfix margin12 onlyTopMargin">
                    <span className="floatLeft width70">{promo.get('isUpgradeFeeWaivedOffer')
                      ? 'Upgrade fee waived'
                      : this.props.CQLabel.get('OD_CART_DISCOUNT_APPLIED_TEXT')}
                    </span>
                    <span className="floatRight  "> {promo.get('isUpgradeFeeWaivedOffer') ? <span><span className="margin6 red textDecLineThrough">${item.get('originalUpgradeFee')}</span> <span>${item.get('upgradeFee')}</span></span> : `$${promo.get('promoAmount')}`}</span>
                  </div>
                )) */}
              </div>
            ))}

            {/* -- Accessories and Bundle Builder Section --*/}
            <div className="pad24 onlyTopPad">
              {((this.props.accessories && this.props.accessories.size > 0) || (this.props.accessoriesBundle && this.props.accessoriesBundle.length > 0)) &&
                <div className="border_00 onlyBottomBorder pad12 onlyBottomPad">
                  <h2 className="h3" id="Accessories_title" tab-index="0"> {this.props.CQLabel.get('OD_CART_ACCESSORIES_SECTION_TITLE')}</h2>
                </div>
              }

              {(this.props.accessoriesBundle && this.props.accessoriesBundle.length > 0) &&
                this.renderAccessoriesBundleOptions()
              }

              {this.props.accessories &&
                this.renderAccessorySection()
              }
            </div>

            {/* -- Additional Charges Section --*/}
            {this.props.authenticated && (this.props.taxDetails || this.props.pastDueBalance > 0) &&

              <section className="section group pad24 onlyTopPad">
                <div className="border_00 onlyBottomBorder pad12 onlyBottomPad">
                  <h2 className="h3" id="Accessories_title">{this.props.CQLabel.get('OD_CART_DUE_TODAY_ADDITIONAL_CHARGES')}</h2>
                </div>
                <ul className="plainList cartList background_FF">
                  {this.props.taxDetails &&
                    <li className="clearfix pad12 noSidePad border_grey onlyBottomBorder" role="row" aria-label={`${this.props.CQLabel.get('OD_CART_DUE_TODAY_EST_GOV_SALES_TAX')} ${this.props.taxDetails.get('stateTaxLabel')} ${this.props.taxDetails.get('cityStateString')} $${this.props.taxDetails.get('taxPrice')}`}>
                      <p className="floatLeft width70">
                        <span className="block">{this.props.CQLabel.get('OD_CART_DUE_TODAY_EST_GOV_SALES_TAX')}</span>
                        <span className="block">{this.props.taxDetails.get('stateTaxLabel')}</span>
                        <span className="block color_333 fontSize_2"> {this.props.taxDetails.get('cityStateString')}</span>
                      </p>
                      <span className="floatRight  fontDisplayMedium">${this.props.taxDetails.get('taxPrice')}</span>
                    </li>
                  }
                </ul>
              </section>
            }

          </div>
        </div>
        {(this.props.standaloneAccessories && !this.props.authenticated) &&
          <div className="pad24">
            <div>
              <p className="margin12 onlyTopMargin">{this.props.CQLabel.get('OD_CART_STANDALONE_GUEST_PREORDER_DISCLAIMER')}</p>
              <p className="margin12 onlyTopMargin">{this.props.CQLabel.get('OD_CART_STANDALONE_GUEST_TAXINFO_DISCLAIMER')}</p>
              <p className="margin12 onlyTopMargin">{this.props.CQLabel.get('OD_CART_STANDALONE_GUEST_ACCURECY_DISCLAIMER')}</p>
            </div>
          </div>
        }
      </div>);
  }
}

CartDueToday.propTypes = {
  pastDueBalance: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  CQLabel: PropTypes.object,
  taxDetails: PropTypes.object,
  accessoriesBundle: PropTypes.array,
  accessories: PropTypes.array,
  items: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  totalDueToday: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  authenticated: PropTypes.bool,
  standaloneAccessories: PropTypes.bool,
  // promotionList: PropTypes.array,
};
