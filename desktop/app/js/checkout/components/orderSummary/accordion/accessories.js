import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import SummaryRow from './summaryRow';

const Accessories = (props) => {
  const {
    accessories, accessoriesBundle, cqContent,
  } = props;

  return (
    <div>
      {/* Accessories and Bundled Accessories */}
      {((accessories && accessories.length > 0) || (accessoriesBundle && accessoriesBundle.length > 0)) &&
        <div>
          {props.instantCreditOrder && <hr className="border_black" />}
          <Row>
            <Col xs={6}>
              <p className="bold fontSize_5">{cqContent.label.DT_OD_CHECKOUT_SUMMARY_ACCESSORIES}</p>
            </Col>
          </Row>
          <div>
            {accessories.map((accessory, index) => (
              <div key={`accessory-${index}`}>
                {accessory.instantCreditApplied ?
                  <SummaryRow
                    description={<div>
                      <p dangerouslySetInnerHTML={{ __html: accessory.name }} />
                      <div>
                        {accessory.discounted &&
                          <p>{cqContent.label.DT_OD_CHECKOUT_INSTANT_CREDIT_ACCESSORY_RETAIL_PRICE.replace('$AMOUNT$', accessory.wasPrice)}</p>
                        }
                        <p>{cqContent.label.DT_OD_CHECKOUT_INSTANT_CREDIT_ACCESSORY_APPLIED.replace('$AMOUNT$', accessory.instantCreditApplied)}</p>
                        {accessory.discounted &&
                          <p><span>{cqContent.label.DT_OD_CHECKOUT_SUMMARY_STANDALONE_ACCESSORY_IC_PROMO_MESSAGE.replace('$PERCENTAGE$', accessory.discountPercentage)}</span>: -${accessory.discountPrice.toFixed(2)}</p>
                        }
                        <p>{cqContent.label.DT_OD_CHECKOUT_INSTANT_CREDIT_ACCESSORY_ADJUSTED}</p>
                      </div>
                    </div>
                    }
                    dueToday={<span className="positionAbsolute" style={{ bottom: 0, right: 8 }}>${accessory.price}</span>}
                  />
                  :
                  (<SummaryRow
                    description={<div>
                      <p dangerouslySetInnerHTML={{ __html: accessory.name }} />
                      {(accessory.color || accessory.size) &&
                        <p className="fontSize_3">
                          {accessory.size &&
                            <span>{accessory.size}</span>
                          }
                          {accessory.size && accessory.color &&
                            <span>, </span>
                          }
                          {accessory.color &&
                            <span>{accessory.color}</span>
                          }
                        </p>
                      }
                    </div>
                    }
                    dueToday={`$${accessory.price}`}
                    dueTodayDiscounted={accessory.discounted}
                    dueTodayOriginal={<strong>${accessory.wasPrice}</strong>}
                    promoMessage={
                      accessory.discounted &&
                      <div className="margin-6 onlyLeftMargin positionRelative">
                        <p className="margin6 onlyTopMargin">
                          <span className="font-icon_tag pad24 onlyRightPad" />
                          <span>{cqContent.label.DT_OD_CHECKOUT_SUMMARY_STANDALONE_ACCESSORY_PROMO_MESSAGE.replace('$PERCENTAGE$', accessory.discountPercentage)}</span>
                        </p>
                      </div>}
                  />)
                }
              </div>
            ))}
            {accessoriesBundle && accessoriesBundle.map((accessory, index) => (
              <div key={`accessoryBundle-${index}`}>

                {accessory.instantCreditApplied ?
                  <SummaryRow
                    description={<div>
                      <p dangerouslySetInnerHTML={{ __html: accessory.name }} />
                      {accessory.discounted ?
                        <div>
                          <p className="margin6 onlyTopMargin">{cqContent.label.DT_OD_CHECKOUT_SUMMARY_STANDALONE_ACCESSORY_PROMO_MESSAGE.replace('$PERCENTAGE$', accessory.discountPercentage)}</p>
                          <p><span className="textDecLineThrough">${accessory.wasPrice}</span>&nbsp;<span>${accessory.price}</span></p>
                          <p>{cqContent.label.DT_OD_CHECKOUT_INSTANT_CREDIT_ACCESSORY_PROMO_APPLIED.replace('$AMOUNT$', accessory.instantCreditApplied)}</p>
                          <p>{cqContent.label.DT_OD_CHECKOUT_INSTANT_CREDIT_ACCESSORY_PROMO_ADJUSTED}</p>
                        </div>
                        :
                        <div>
                          <p>{cqContent.label.DT_OD_CHECKOUT_INSTANT_CREDIT_ACCESSORY_APPLIED.replace('$AMOUNT$', accessory.instantCreditApplied)}</p>
                          <p>{cqContent.label.DT_OD_CHECKOUT_INSTANT_CREDIT_ACCESSORY_ADJUSTED}</p>
                        </div>
                      }
                    </div>
                    }
                    dueToday={<span className="positionAbsolute" style={{ bottom: 0, right: 8 }}>${accessory.discounted ? accessory.discountedPrice : accessory.regularPrice}</span>}
                  />
                  :
                  (<SummaryRow
                    description={<p dangerouslySetInnerHTML={{ __html: accessory.displayName }} />}
                    dueToday={`$${accessory.discounted ? accessory.discountedPrice : accessory.regularPrice}`}
                    dueTodayDiscounted={accessory.discounted}
                    dueTodayOriginal={<strong>${accessory.regularPrice}</strong>}
                    promoMessage={
                      accessory.discounted &&
                      <div className="margin-6 onlyLeftMargin positionRelative">
                        <p className="margin6 onlyTopMargin">
                          <span className="font-icon_tag pad24 onlyRightPad" />
                          <span>{cqContent.label.DT_OD_CHECKOUT_SUMMARY_STANDALONE_ACCESSORY_PROMO_MESSAGE.replace('$PERCENTAGE$', accessory.discountPercentage)}</span>
                        </p>
                      </div>
                    }
                  />)
                }
              </div>
            ))}
          </div>
        </div>}
    </div>
  );
};

Accessories.propTypes = {
  accessories: PropTypes.array,
  accessoriesBundle: PropTypes.array,
  cqContent: PropTypes.object,
  instantCreditOrder: PropTypes.bool,
};

export default Accessories;
