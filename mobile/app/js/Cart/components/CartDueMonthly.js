/* eslint-disable jsx-a11y/tabindex-no-positive, no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { hashHistory } from './../../store';
import HeroPriceComponent from '../../common/HeroPrice/HeroPriceComponent';
// import Loader from '../../common/Loader/Loader';
import Title from '../../common/Title/Title';
import BackButton from '../../common/BackButton/BackButton';

export default class CartDueMonthly extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeProtection = this.onChangeProtection.bind(this);
    this.selectedMTN = null;
    this.state = { hasError: false };
  }

  componentDidMount() {
    // Accessibility focus fix for hash navigation
    const pageTitle = document.getElementById('section_title');
    if (pageTitle) {
      pageTitle.focus();
    }
  }
  componentWillReceiveProps(newProps) {
    if (!newProps.isFetching) {
      window.hideLoader();
    }
  }

  shouldComponentUpdate(nextProps) {
    const protectionFlag = nextProps.deviceProtectionList.fetched;
    if (protectionFlag && (protectionFlag !== this.props.deviceProtectionList.fetched)) {
      hashHistory.push('/protection?mdn=' + this.selectedMTN); // eslint-disable-line
      return false;
    }
    return true;
  }

  onChangeProtection(item) {
    this.selectedMTN = item.get('mtn');
    this.props.getProtectionOptions(item.get('flow'), item.get('mtn'), item.get('deviceSORId'));
  }
  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    console.log('Error:', error, '\n Info:', info);
    // You can also log the error to an error reporting service
  }
  /*
  *
  * Renders final price based on promo code entry
  * Added for CIS-28290
  * */
  _renderFinalPrice(item) {
    if (item.get('originalPrice') > item.get('price')) {
      return <span className="floatRight fontDisplayMedium"><span className="margin6 onlyRightMargin textDecLineThrough red">${item.get('originalPrice')}</span><span>${item.get('price')}</span></span>;
    }
    return <span className="floatRight fontDisplayMedium"><span>${item.get('price')}</span></span>;
  }
  renderProtectionChangeLink() {
    return (<input
      className="noTopBorder noSideBorder noBottomBorder noSidePad link fontDisplay fontSize_1_3 background_FF margin6 onlyTopMargin"
      style={{ background: 'none' }}
      type="submit"
      role="button"
      value={this.props.CQLabel.get('OD_CART_PROTECTION_CHANGE')}
    />);
  }

  render() {
    const items = this.props.items.toJS();
    const { cpc, plans, itemOnJaxPlan } = this.props;
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <div>Something went wrong.</div>;
    }
    // TODO: confirm selectedItem node
    return (
      <div className="pad12 onlyTopPad">

        <BackButton to="/">{this.props.CQLabel.get('OD_CART_BACK_CTA')}</BackButton>
        <div className="cartPage_dmBrkdwn pad18">
          <section className="section group pad18 onlyBottomPad textAlignCenter">
            <Title
              id="section_title"
              tabIndex="0"
              className="fontSize_7 textAlignCenter outlineNone outlineNone margin126 onlyBottomMargin"
            >
              {this.props.CQLabel.get('OD_CART_DEVICE_DUE_MONTHLY_TITLE')}
            </Title>
            <HeroPriceComponent displayPrice={this.props.overallDueMonthly} tabIndex="1" />
            {this.props.bicOfferMessage && <p className="width80 centerBlock textAlignCenter">{this.props.bicOfferMessage}</p>}
          </section>

          {/* -- Devices Section -- */}
          {this.props.items &&
            <div className="border_00 onlyBottomBorder">
              <h2 className="h3 pad6 onlyBottomPad">{this.props.CQLabel.get('OD_CART_DEVICES_SECTION_TITLE')}</h2>
            </div>}
          {this.props.items && this.props.items.map((item, i) => (

            <div className="dueMonthlyBreakdown border_grey onlyTopBorder pad12 noSidePad" key={i}>
              <div className="section group  margin12 onlyBottomMargin">
                <h3 className="fontSize_3">{item.get('deviceManufactureName')} <span
                  dangerouslySetInnerHTML={{ __html: item.get('deviceProductDisplayName') }}
                />
                </h3>
                <p className="fontSize_1_3">
                  <span>
                    {item.get('colorName') && <span>{item.get('colorName')}</span>}
                    {item.get('colorName') && item.get('capacity') && <span>, </span>}
                    {item.get('capacity') && <span>{item.get('capacity')}</span>}
                  </span>
                </p>
              </div>

              <div className="section group">
                <ul className="plainList cartList">
                  {(parseFloat(item.get('price'), 10) > 0 && !(item.get('contractTerm') === '0' || item.get('contractTerm') === '24')) &&
                    <li className="clearfix margin12 onlyBottomMargin">
                      <span className="floatLeft width70">
                        <span className="bold">{item.get('priceText')}</span>
                        {(item.get('bicOfferApplied') && (typeof item.bicMessage === 'object' && item.bicMessage !== null)) ?
                          <span className="color_666 fontSize_1_3 block">
                            <span dangerouslySetInnerHTML={{ __html: item.get('bicMessagetooltip') }} />
                          </span>
                          :
                          <span className="color_666 fontSize_1_3 block">
                            <span dangerouslySetInnerHTML={{ __html: item.get('priceSubTitle') }} />
                            {
                              parseFloat(item.get('fullRetailPrice'), 10) > parseFloat(item.get('discountedEdgeRetailPrice'), 10) &&
                              <span className="textDecLineThrough red"> ${item.get('fullRetailPrice')}</span>
                            }
                            <span> ${item.get('discountedEdgeRetailPrice')}</span>
                          </span>
                        }
                        {(item.get('sbdOffer') !== null) &&
                          <div className="fontSize_1">{item.get('sbdOffer').get('sbdPromoMsg')}</div>
                        }

                      </span>
                      {(item.get('sbdOffer') !== null && item.get('sbdOffer').get('itemStrikeThroughPrice') > 0) && item.get('sbdOffer').get('ignorePricing') === false ?
                        <div className="floatRight  ">
                          <span className="textDecLineThrough red margin6 onlyRightMargin">${item.get('sbdOffer').get('itemStrikeThroughPrice')}</span>
                          <span className="fontDisplayMedium">  ${item.get('sbdOffer').get('sbdItemMonthlyAmount')}</span>
                        </div>
                        :
                        item.get('hasReducedDueMonthly') ?
                          <span className="floatRight  ">
                            <div>${item.get('originalPrice')}</div>
                            <div className="textDecLineThrough">${item.get('price')}</div>
                          </span>
                          :
                          item.get('sbdOffer') !== null && item.get('sbdOffer').get('ignorePricing') === true ?
                            (this._renderFinalPrice(item))
                            :
                            ((item.get('bicOfferApplied')) ?
                              <span className="floatRight  ">
                                <span className="textDecLineThrough margin6 onlyRightMargin">${item.get('price')}</span>
                                <span className="fontDisplayMedium">${item.get('bicDiscountedContractPrice')}</span>
                              </span>
                              :
                              (this._renderFinalPrice(item)))}
                    </li>
                  }

                  {item.get('additionalFeatures') &&
                    item.get('additionalFeatures').map((_item, _i) => (
                      <li className="clearfix  margin12 onlyBottomMargin" key={`key-${_i}`}>
                        {_item.get('smartFamily') ?
                          <div className="floatLeft width70">
                            <p className="block bold" dangerouslySetInnerHTML={{ __html: _item.get('name') }} />
                            <p dangerouslySetInnerHTML={{ __html: _item.get('introText') }} />
                            <Link
                              to={_item.get('editUrl')}
                              className="fontSize_3 pad10 onlyTopPad displayBlock link"
                              role="link"
                              analyticstrack="edit-smart-family"
                            >Edit
                            </Link>
                          </div> :
                          <div className="floatLeft width70">
                            {/* <span className="bold">{this.props.CQLabel.get('OD_CART_CURRENT_FEATURES')}</span> */}
                            <p className="block">
                              <span>{_item.get('name')}</span>
                            </p>
                          </div>
                        }
                        {_item.get('freeTrial') ?
                          <p className="floatRight width30 fontDisplayMedium">
                            <p className="textAlignRight">${_item.get('price')}</p>
                            <p className="textAlignRight">after free 30-day trial</p>
                          </p> :
                          <span className="floatRight width30 fontDisplayMedium">${_item.get('price')}</span>
                        }
                      </li>
                    ))
                  }

                  {item.get('protectionOption') &&
                    <li className="clearfix margin12 onlyBottomMargin">
                      <form
                        name="protectionOptionForm"
                        id={'protectionOptionForm' + i}
                        method="POST"
                        action={this.props.protectionURL}
                      >
                        <div className="floatLeft width70">
                          <span className="fontDisplayMedium">{item.get('protectionOption').get('name')}</span>
                          <span className="block">
                            {(item.get('protectionOption').get('featureType') === 'SPO') ?
                              (<p className="color_959595 fontSize_1_3" dangerouslySetInnerHTML={{ __html: item.get('protectionOption').get('displayMsg') }} />)
                              :
                              (!item.get('protectionOption').get('hideEditProtection') &&
                                <input
                                  className="noTopBorder noSideBorder noBottomBorder noSidePad link fontDisplay fontSize_1_3 background_FF margin6 onlyTopMargin"
                                  style={{ background: 'none', padding: '5px 0' }}
                                  type="submit"
                                  role="button"
                                  value={this.props.CQLabel.get('OD_CART_PROTECTION_CHANGE')}
                                />
                              )}


                          </span>
                        </div>

                        {!(item.get('protectionOption').get('hideEditProtection')) &&
                          <div className="floatRight fontDisplayMedium">
                            {(item.get('protectionOption').get('price')) ?
                              <div>
                                {
                                  (parseFloat(item.get('protectionOption').get('originalPrice')) > parseFloat(item.get('protectionOption').get('price')))
                                  && <span className="color_red textDecLineThrough margin6 onlyRightMargin">${item.get('protectionOption').get('originalPrice')}</span>
                                }
                                <span>{'$' + (item.get('protectionOption').get('price'))}</span>
                              </div> : <span>-</span>}
                          </div>}
                        <input type="hidden" name="sfoskuId" value={item.get('protectionOption').get('sfoskuId')} />
                        <input type="hidden" name="deviceSkuId" value={item.get('deviceSkuId')} />
                        <input type="hidden" name="mtn" value={item.get('mtn')} />
                        <input type="hidden" name="upgradeDeviceMTN" value={item.get('mtn')} />
                        {item.get('flow') === 'AAL' ?
                          <input type="hidden" name="deviceSORId" value={item.get('deviceSORId')} />
                          :
                          <input type="hidden" name="upgradeDeviceSORId" value={item.get('deviceSORId')} />
                        }
                        <input type="hidden" name="editFlag" value="true" />
                        <input type="hidden" name="commerceItemId" value={item.get('commerceItemId')} />
                        <input type="hidden" name="flow" value={item.get('flow')} />
                      </form>
                    </li>
                  }

                  {item.get('flow') === 'NSO' && !item.get('protectionOption') && item.get('protectionInEligible') &&
                    <li className="clearfix margin12 onlyTopMargin pad10 onlyBottomPad">
                      <span>{this.props.CQLabel.get('OD_CART_PROTECTION_INELIGIBLE_MESSAGE')}</span>
                    </li>
                  }

                  {!cpc &&
                    <li className="clearfix margin12 onlyTopMargin ">
                      <span className="floatLeft width70 fontDisplayMedium">
                        {item.get('numberShareDevice') ?
                          (
                            <span>
                              <span>{this.props.CQLabel.get('OD_CART_NUM_LINE_ACCESS')}</span>
                            </span>
                          ) :
                          (item.get('lacText') ? item.get('lacText') : this.props.CQLabel.get('OD_CART_LAC_TITLE'))
                        }
                        {item.get('promoLACMessage') && <span className="displayBlock fontSize_2 color_666">{item.get('promoLACMessage')}</span>}
                      </span>
                      <span className="floatRight  fontDisplayMedium">${item.get('lacPrice')}</span>

                    </li>
                  }

                </ul>
              </div>
            </div>
          ))}
          {(cpc && plans) &&
            <div className="pad20 onlyTopPad">
              <div className="border_00 onlyBottomBorder ">
                <h2 className="h3 pad6 onlyBottomPad">Plan</h2>
              </div>
              <div className="clearfix">
                {plans.items.length > 0 && plans.items.map((plan, i) => (
                  <div key={`plan-${i}`} className="pad12 noSidePad clearfix">
                    <div className="floatLeft width70">
                      <div className="fontDisplayMedium fontSize_1_3">{plan.planDisplayName}</div>
                      <div className=" fontSize_1_3" dangerouslySetInnerHTML={{ __html: plan.planDescription }} />
                    </div>
                    <div className="floatRight fontDisplayBold">
                      {plan.accountAccess.hasEcpdDiscount ? (<p><span className="textDecLineThrough red fontDisplay block">${plan.accountAccess.planAmount}</span>${plan.accountAccess.originalPlanAmount}</p>) : `$${plan.accountAccess.planAmount}`}
                    </div>
                  </div>
                ))}

                <div className="margin18 onlyBottomMargin">
                  {!itemOnJaxPlan && <h3 className="fontSize_3 margin12 onlyBottomMargin border_grey onlyBottomBorder pad12 onlyBottomPad"> Line access</h3>}
                  {plans.newDevices && plans.newDevices.length > 0 &&
                    <div className="margin12 onlyBottomMargin">
                      <h4 className="fontSize_1_3">New Devices</h4>
                      {plans.newDevices.map((dev, i) => (
                        <div className="clearfix margin6 onlyBottomMargin" key={`newdev-${i}`}>
                          <div className="floatLeft width70" dangerouslySetInnerHTML={{ __html: dev.name }} />
                          <div className="floatRight" dangerouslySetInnerHTML={{ __html: `$${dev.price}` }} />
                        </div>))}
                    </div>
                  }
                  {plans.upgradeDevices && plans.upgradeDevices.length > 0 &&

                    <div className="margin12 onlyBottomMargin">
                      <h4 className="fontSize_1_3">Upgraded Devices</h4>
                      {plans.upgradeDevices.map((dev, i) => (
                        <div className="clearfix margin6 onlyBottomMargin" key={`upgdev-${i}`}>
                          <div className="floatLeft width70" dangerouslySetInnerHTML={{ __html: dev.name }} />
                          <div className="floatRight" dangerouslySetInnerHTML={{ __html: `$${dev.price}` }} />
                        </div>))}
                    </div>
                  }
                  {plans.existingDevices && plans.existingDevices.length > 0 &&
                    <div className="margin12 onlyBottomMargin">
                      <h4 className="fontSize_1_3">Existing Devices</h4>
                      {plans.existingDevices.map((dev, i) => (
                        <div className="clearfix margin6 onlyBottomMargin" key={`exstdev-${i}`}>
                          <div className="floatLeft width70" dangerouslySetInnerHTML={{ __html: dev.name }} />
                          <div className="floatRight" dangerouslySetInnerHTML={{ __html: `$${dev.price}` }} />
                        </div>))}
                    </div>
                  }
                </div>

              </div>
            </div>
          }
          {(this.props.anyLineFreeSPO && this.props.anyLineFreeSPO.anyLineFreeSPOAvailable) &&
            <div className="section group border_grey onlyTopBorder pad12 noSidePad">
              <p className="fontSize_1_3">
                <span>
                  {this.props.anyLineFreeSPO.spoDescription}
                </span>
                <span className="floatRight">
                  -${this.props.anyLineFreeSPO.spoCharge}
                </span>
              </p>
            </div>
          }
          {(this.props.tmpmd && this.props.tmpMdOptions) &&
            <form name="protectionOptionForm" id="protectionOptionForm" method="POST" action={this.props.protectionURL}>
              <div className="pad12 noSidePad group section">
                <h3 className="h3 pad12 noSidePad border_00 onlyBottomBorder">{this.props.CQLabel.get('OD_CART_DEVICE_PROTECTION_TITLE')}</h3>
                <div className="section group margin12 onlyTopMargin">
                  <p className="margin12 onlyBottomMargin">
                    <span className="fontDisplayBold">{this.props.CQLabel.get('OD_CART_TPMD_TITLE')}</span>
                    {(!this.props.tmpMdOptions.get('hideEditProtection') && <span className="floatRight">{(this.props.tmpMdOptions.get('price')) ? '$' + (this.props.tmpMdOptions.get('price')) : '-'} </span>)}
                  </p>
                  {this.props.tmpMdOptions.get('price') &&
                    <span className="fontSize_1_3 color_666 block">
                      ${this.props.tmpMdOptions.get('price')} {this.props.CQLabel.get('OD_CART_TPMD_MSG')}
                    </span>
                  }
                </div>
                {(!this.props.tmpMdOptions.get('hideEditProtection') && this.renderProtectionChangeLink())}
              </div>
              <input type="hidden" name="sfoskuId" value={this.props.tmpMdOptions.get('featureSkuId')} />
              <input type="hidden" name="deviceSkuId" value={items[0].deviceSkuId} />
              <input type="hidden" name="mtn" value={items[0].mtn} />
              <input type="hidden" name="upgradeDeviceMTN" value={items[0].mtn} />
              {items.flow === 'AAL' ?
                <input type="hidden" name="deviceSORId" value={items[0].deviceSORId} />
                :
                <input type="hidden" name="upgradeDeviceSORId" value={items[0].deviceSORId} />
              }
              <input type="hidden" name="editFlag" value="true" />
              <input type="hidden" name="commerceItemId" value={items[0].commerceItemId} />
              <input type="hidden" name="flow" value={items[0].flow} />
            </form>
          }
          {
            this.props.isTMP === true &&
            <div className="pad12 fontSize_1_3">
              <div dangerouslySetInnerHTML={{ __html: this.props.CQHtml.get('OD_PROTECTION_CRACKED_SCREEN_DISCLOSURE') }} />
            </div>
          }
        </div>
      </div>
    );
  }
}

CartDueMonthly.propTypes = {
  deviceProtectionList: PropTypes.object,
  getProtectionOptions: PropTypes.func,
  anyLineFreeSPO: PropTypes.object,
  tmpmd: PropTypes.bool,
  CQLabel: PropTypes.object,
  CQHtml: PropTypes.object,
  items: PropTypes.array,
  protectionURL: PropTypes.string,
  tmpMdOptions: PropTypes.object,
  overallDueMonthly: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  bicOfferMessage: PropTypes.any,
  isTMP: PropTypes.bool,
  cpc: PropTypes.bool,
  plans: PropTypes.object,
  itemOnJaxPlan: PropTypes.bool,
};
