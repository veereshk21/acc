import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Row, Col } from 'react-flexbox-grid';
import BackButton from '../../common/BackButton/BackButton';
import HorizontalRule from '../../common/HorizontalRule';
import HeroPriceComponent from '../../common/HeroPrice/';
import ItemBreakdown from '../../common/ItemBreakDown/';

const UpgradeFeeCharged = ({ item, label }) => {
  let isUpgradeFeeWaivedOffer = '';
  // console.log(props.item);
  item.devicePromotionList.length > 0 && item.devicePromotionList.map((promo) => { //eslint-disable-line
    if (promo.isUpgradeFeeWaivedOffer === true) isUpgradeFeeWaivedOffer = promo;
  });
  if ((!isUpgradeFeeWaivedOffer || !isUpgradeFeeWaivedOffer.isUpgradeFeeWaivedOffer) && !item.upgradeFeeWaived && !item.waivedUpgradeFeePromo) {
    return (<ItemBreakdown
      name={label}
      price={item.upgradeFee}
    />);
  }
  return null;
};

const isUpgradeFeeWaivedOff = (item) => {
  let isUpgradeFeeWaivedOffer = false;
  // console.log(props.item);
  item.devicePromotionList.length > 0 && item.devicePromotionList.map((promo) => { //eslint-disable-line
    if (promo.isUpgradeFeeWaivedOffer === true) isUpgradeFeeWaivedOffer = true;
  });
  return isUpgradeFeeWaivedOffer;
};

UpgradeFeeCharged.propTypes = {
  item: PropTypes.object,
  label: PropTypes.string,
};
class DueToday extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      totalDueToday, items, accessories, accessoriesBundle, taxDetails, CQLabel, lineLevelOpted, instantCreditEligible,
    } = this.props;

    return (
      <Grid className="pad12 noSidePad">
        <Row className="noSideMargin">
          <Col xs={12} className="noSidePad">
            <BackButton />
          </Col>
        </Row>
        <Row className="noSideMargin pad24">
          <Col xs={12}>
            <Row className="noSideMargin ">
              <Col xs={12} className="noSidePad">
                <h1 className=" noSidePad">{CQLabel.OD_CART_DEVICE_DUE_TODAY_TITLE}</h1>
                <HorizontalRule />
              </Col>
            </Row>
            <HeroPriceComponent margin="32px 0" className="noSidePad" displayPrice={totalDueToday} />
            {items && items.map((item, i) => (
              <div key={`item-${i}`}>
                {lineLevelOpted &&
                  <Row className="noSideMargin">
                    <Col xs={12} className="noSidePad" >
                      <h3 dangerouslySetInnerHTML={{ __html: item.nickName || item.deviceNickName }} />
                      <HorizontalRule y={1} margin="32px 0" color="#747676" />
                    </Col>
                  </Row>
                }
                <Row className="noSideMargin">
                  <Col xs={12} className="noSidePad" >
                    <h3 className="fontSize_1_3">
                      {item.deviceManufactureName}
                      <span
                        dangerouslySetInnerHTML={{ __html: item.deviceProductDisplayName }}
                      />
                    </h3>
                    <p className="fontSize_1_3  color_gray_six">
                      <span>
                        {item.colorName && <span>{item.colorName}</span>}
                        {item.colorName && item.capacity && <span>, </span>}
                        {item.capacity && <span>{item.capacity}</span>}
                      </span>
                    </p>
                    <p className="fontSize_1_3">
                      <span>
                        {item.displayMtn}
                      </span>
                    </p>

                    {instantCreditEligible &&
                      <Row>
                        <Col xs={10}>
                          {(item.contractTerm) &&
                            <div className="margin12 onlyTopMargin">
                              {(item.contractTerm === '24') ?
                                <p>
                                  <span>{CQLabel.DT_OD_CART_2YEAR_PRICE_TEXT}</span>
                                  <span className="">${item.priceForFullRetailPriceListID}</span>
                                </p> :
                                <p>
                                  <span>{CQLabel.DT_OD_CART_RETAIL_PRICE_TEXT}</span>
                                  <span className="">${item.priceForFullRetailPriceListID}</span>
                                </p>
                              }
                            </div>
                          }
                          {item.instantCreditAppliedInfo &&
                            <div
                              className="margin3 onlyTopMargin"
                              dangerouslySetInnerHTML={{ __html: item.instantCreditAppliedInfo }}
                            />
                          }
                          {(item.instantCreditAdjustedPrice && parseFloat(item.instantCreditAdjustedPrice, 10) > 0) &&
                              <p className="margin3 onlyTopMargin">
                                <span>{CQLabel.DT_OD_CART_ADJUSTED_PRICE}</span>
                                {(item.edgeDevice && parseFloat(item.instantCreditAdjustedPrice, 10) > 0) && <span>${item.instantCreditAdjustedPrice}</span>}
                              </p>
                          }
                        </Col>
                      </Row>
                    }

                    <HorizontalRule y={1} color="#747676" margin="32px 0" />
                  </Col>
                </Row>
                {(parseFloat(item.price, 10) > 0 && (item.contractTerm === '0' || item.contractTerm === '24')) &&
                  <ItemBreakdown
                    name={item.priceText}
                    price={item.price}
                    strikeoutprice={parseFloat(item.originalPrice, 10) > parseFloat(item.price, 10) ? item.originalPrice : null}
                  >
                    <span className="color_gray_six fontSize_2 block">{item.priceSubTitle}</span>
                  </ItemBreakdown>
                }

                {item.devicePromotionList && item.devicePromotionList.map((promo, idx) => (
                  (promo.promoAmount !== null && promo.promoAmount > 0) &&
                  <ItemBreakdown
                    key={`promo-${idx}`}
                    name={promo.isUpgradeFeeWaivedOffer ? 'Upgrade fee waived' : CQLabel.OD_CART_DISCOUNT_APPLIED_TEXT}
                    price={promo.isUpgradeFeeWaivedOffer ? item.upgradeFee : promo.promoAmount}
                    strikeoutprice={promo.isUpgradeFeeWaivedOffer ? item.originalUpgradeFee : null}
                  />
                ))}
                {item.flow === 'EUP' && <UpgradeFeeCharged item={item} label={CQLabel.OD_CART_DUE_TODAY_UPGRADE_FEE} />}
                {item.flow === 'EUP' && item.waivedUpgradeFeePromo &&
                  <ItemBreakdown
                    name={CQLabel.OD_CART_DUE_TODAY_UPGRADE_FEE}
                  >
                    <span className=" displayBlock color_gray_six fontSize_2">
                      {CQLabel.OD_CART_WAIVED_TITLE}
                      {CQLabel.OD_CART_DUE_TODAY_UPGRADE_FEE}
                    </span>
                  </ItemBreakdown>
                }
                {item.flow === 'EUP' && item.upgradeFeeWaived && !isUpgradeFeeWaivedOff(item) &&
                  <ItemBreakdown
                    name="Upgrade fee waived"
                    price={item.upgradeFee}
                  />
                }
                {parseFloat(item.edgeItemDownPaymentAmount, 0) > 0 &&
                  <ItemBreakdown
                    name={CQLabel.OD_CART_DUE_TODAY_DOWN_PAYMENT}
                    price={item.edgeItemDownPaymentAmount}
                  />
                }

                {parseFloat(item.deviceEdgeBuyOutAmount, 10) > 0 &&
                  <ItemBreakdown
                    name={CQLabel.OD_CART_DUE_TODAY_REMAINING_BALANCE}
                    price={item.deviceEdgeBuyOutAmount}
                  />
                }
                {parseFloat(item.deviceEdgeUpAmount, 10) > 0 &&
                  <ItemBreakdown
                    name={CQLabel.OD_CART_DUE_TODAY_EARLY_UPGRADE_BALANCE}
                    price={item.deviceEdgeUpAmount}
                  />
                }
              </div>
            ))}
            {((accessories && accessories.length > 0) || (accessoriesBundle && accessoriesBundle.length > 0)) &&
              <div>
                <Row className="noSideMargin">
                  <Col xs={12} className="noSidePad" >
                    <h3 dangerouslySetInnerHTML={{ __html: CQLabel.OD_CART_ACCESSORIES_SECTION_TITLE }} />
                    <HorizontalRule y={1} margin="32px 0" color="#747676" />
                  </Col>
                </Row>
                {(accessoriesBundle && accessoriesBundle.length > 0) &&
                  accessoriesBundle.map((acc, i) => (
                    <ItemBreakdown
                      name={<span className="fontDisplayMedium fontSize_1_3" dangerouslySetInnerHTML={{ __html: acc.displayName }} />}
                      price={acc.discounted ? acc.discountedPrice : acc.regularPrice}
                      strikeoutprice={acc.discounted ? acc.regularPrice : null}
                      key={`acc-${i}`}
                    >
                      {(parseFloat(acc.discountPercentage, 10) > 0) &&
                        <span className="displayBlock color_666 pad10 onlyTopPad">
                          <span>{parseFloat(acc.discountPercentage, 10)}</span>
                          <span>{CQLabel.OD_DUE_TODAY_OFF_SALE}</span>
                        </span>
                      }
                    </ItemBreakdown>
                  ))
                }
                {(accessories && accessories.length > 0) &&
                  accessories.map((acc, i) => (
                    <ItemBreakdown
                      name={
                        <p className="fontDisplayMedium fontSize_1_3">
                          <span dangerouslySetInnerHTML={{ __html: acc.name }} />
                          <span dangerouslySetInnerHTML={{ __html: acc.deviceProductDisplayName }} />
                        </p>
                      }
                      price={acc.price}
                      strikeoutprice={acc.discounted ? acc.wasPrice : null}
                      key={`acc-${i}`}
                    >
                      <p className="fontSize_1_3 color_666">
                        {acc.color && <span>{acc.color}</span>}
                        {acc.color && acc.size && <span>, </span>}
                        {acc.size && <span>{acc.size}</span>}
                      </p>

                      {instantCreditEligible &&
                        <Row>
                          <Col xs={10}>
                            <p>
                              <span>{CQLabel.DT_OD_CART_RETAIL_PRICE_TEXT}</span>
                              <span className="">${acc.discounted ? acc.wasPrice : acc.price}</span>
                            </p>
                            {acc.instantCreditAppliedInfo &&
                              <div
                                className="margin3 onlyTopMargin"
                                dangerouslySetInnerHTML={{ __html: acc.instantCreditAppliedInfo }}
                              />
                            }
                            {acc.instantCreditAdjustedPrice &&
                                <p className="margin3 onlyTopMargin">
                                  <span>{CQLabel.DT_OD_CART_ADJUSTED_PRICE}</span>
                                  {(acc.edgeDevice && parseFloat(acc.instantCreditAdjustedPrice, 10) > 0) && <span>${acc.instantCreditAdjustedPrice}</span>}
                                </p>
                            }
                          </Col>
                        </Row>
                      }

                      <span className="fontSize_1_3">
                        {(acc.discountPercentage > 0) && (
                          <span className="displayBlock color_666 pad10 onlyTopPad">
                            <span>{parseFloat(acc.discountPercentage, 10)}</span>
                            <span>{CQLabel.OD_DUE_TODAY_OFF_SALE}</span>
                          </span>
                        )}
                      </span>
                    </ItemBreakdown>
                  ))
                }
              </div>
            }
            {taxDetails &&
              <div>
                <Row className="noSideMargin">
                  <Col xs={12} className="noSidePad" >
                    <h3 dangerouslySetInnerHTML={{ __html: CQLabel.OD_CART_DUE_TODAY_ADDITIONAL_CHARGES }} />
                    <HorizontalRule y={1} margin="32px 0" color="#747676" />
                  </Col>
                </Row>
                <ItemBreakdown
                  name={<span className="fontDisplayMedium">{CQLabel.OD_CART_DUE_TODAY_EST_GOV_SALES_TAX}</span>}
                  price={taxDetails.taxPrice}
                >
                  <p>
                    <span className="block">{taxDetails.stateTaxLabel}</span>
                    <span className="block color_333 fontSize_2"> {taxDetails.cityStateString}</span>
                  </p>
                  {taxDetails.instantCreditAppliedOnSaleTax &&
                    <p className="margin10 onlyTopMargin">
                      <span className="block">{CQLabel.OD_CART_ESTIMATED_SALES_TAX}${taxDetails.totalSalesTax}</span>
                      <span className="block">{CQLabel.OD_CART_IC_APPLIED_SALES_TAX} -${taxDetails.instantCreditAppliedOnSaleTax}</span>
                    </p>
                  }
                  {taxDetails.instantCreditDescription &&
                        <div
                          className="margin12 onlyTopMargin"
                          dangerouslySetInnerHTML={{ __html: taxDetails.instantCreditDescription }}
                        />
                  }
                </ItemBreakdown>
              </div>
            }
          </Col>
        </Row>
      </Grid>
    );
  }
}

DueToday.propTypes = {
  totalDueToday: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  items: PropTypes.array,
  accessories: PropTypes.array,
  accessoriesBundle: PropTypes.array,
  taxDetails: PropTypes.object,
  CQLabel: PropTypes.object,
  lineLevelOpted: PropTypes.bool,
  instantCreditEligible: PropTypes.bool,
};

DueToday.defaultProps = {};

export default DueToday;
