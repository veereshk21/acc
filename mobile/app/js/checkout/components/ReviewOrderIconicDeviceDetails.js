import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import PromoBadge from '../../common/PromoBadge/PromoBadge';
import ReviewOrderImage from './ReviewOrderImage';
import A from '../../common/A/A';
import { hashHistory } from './../../store';
import HorizontalRule from '../../common/HorizontalRule/';
import ReviewOrderPlanDetails from './ReviewOrderPlanDetails';

const ReviewOrderIconicDeviceDetails = (props) => {
  const {
    devices, accessories, accessoriesBundle, lineLevelOpted, plans, bicRepresentationChangeEnabled,
  } = props;
  return (

    <Row className="ensighten_deviceDetails noSideMargin">
      <Col xs={12} className=" noSidePad">

        {
          devices && devices.items !== null && devices.items.map((device, id) => (
            <div>
              <div
                key={id}
              >

                <Row className="pad32 noBottomPad ">
                  <Col xs={12} >
                    <Row className="noSideMargin">
                      {lineLevelOpted &&
                        <Col xs={12} className="noSidePad" >
                          <h3 dangerouslySetInnerHTML={{ __html: device.nickName || `Line ${id + 1}` }} />
                          <HorizontalRule y={1} margin="16px 0 " />
                        </Col>
                      }
                      <Col xs={7} className="noSidePad" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                        <h2 className="fontSize_1_3 fontDisplayMedium">
                          <span dangerouslySetInnerHTML={{ __html: device.manufactureName }} />&nbsp;
                          <span dangerouslySetInnerHTML={{ __html: device.displayName }} />
                        </h2>
                        {!device.humCarDetails ?
                          <p
                            className="fontSize_1_3 margin6 onlyBottomMargin color_gray_six"
                            dangerouslySetInnerHTML={{ __html: (device.color ? device.color : '') + ((device.color && device.size) ? ', ' : '') + (device.size ? device.size : '') }}
                          /> :
                          <p className="fontSize_1_3 margin6 onlyBottomMargin color_gray_six" >
                            <span className="" dangerouslySetInnerHTML={{ __html: device.humCarDetails.year }} />
                            <span className="pad3  onlyLeftPad" dangerouslySetInnerHTML={{ __html: device.humCarDetails.make }} />
                            <span className="pad3  onlyLeftPad" dangerouslySetInnerHTML={{ __html: device.humCarDetails.model }} />
                            <span className="pad3  onlyLeftPad">-</span>
                            <span className="pad3  onlyLeftPad" dangerouslySetInnerHTML={{ __html: device.humCarDetails.color }} />
                          </p>
                        }
                        {device.displayMtn}
                        {device.numberShareDevice &&
                          <div className="margin6 onlyBottomMargin">
                            <p className="pad6 onlyRightPad">Paired with <span dangerouslySetInnerHTML={{ __html: device.nickName }} /> <span>{device.numberSharedMtn}</span></p>
                          </div>
                        }
                        {device.flow === 'NSO' && <p className="fontSize_1_3 margin6 onlyBottomMargin color_gray_six" >Device ID ending in {device.displayImeiId}</p>}
                        {device.devicePromotionList.map((promo) => (
                          <div>
                            {promo.isUpgradeFeeWaivedOffer &&
                              <Row className="fontSize_1_3 " >
                                <Col xs={8} className="fontDisplayMedium">Upgrade fee waived:</Col>
                                <Col xs={4} className="noSidePad"><span className="block">${device.upgradeFee}</span><span className="color_gray_six textDecLineThrough">${device.originalUpgradeFee}</span> </Col>
                              </Row>}
                            {!promo.isUpgradeFeeWaivedOffer && (promo.promoAmount !== null && promo.promoAmount > 0) &&
                              <Row className="fontSize_1_3 " >
                                <Col xs={8} className="fontDisplayMedium ">Discount Applied:</Col>
                                <Col xs={4} className="noSidePad">${promo.promoAmount}</Col>
                              </Row>
                            }
                          </div>
                        ))}
                      </Col>
                      <Col xs={5} className="noSidePad">
                        <ReviewOrderImage device={device} itemCount={id} />
                      </Col>
                    </Row>
                    <HorizontalRule y={1} color="#D8DADA" margin="24px 0 0" />
                    {device.simDetails &&
                      <div className="onlyTopPad pad18">

                        <Row className="noSideMargin ">
                          <Col xs={6} >
                            <h3 className="fontSize_1_3 fontDisplayMedium">
                              {device.simDetails.newSim && <span >Free</span>}
                              <span
                                className="margin6 noSideMargin block"
                                dangerouslySetInnerHTML={{ __html: device.simDetails.displayName }}
                              />
                            </h3>
                            <p className="fontSize_1_3 margin6 onlyBottomMargin">For Device ID ending in {device.displayImeiId}</p>
                          </Col>
                          <Col xs={6}>
                            <img src={`${device.simDetails.imageUrl}&scl=0.9&wid=70&hei=100`} srcSet={`${device.simDetails.imageUrl}&scl=0.9&wid=140&hei=200 2x`} alt={device.simDetails.displayName} />
                          </Col>
                        </Row>
                        <HorizontalRule y={1} color="#D8DADA" margin="24px 0 16px" />
                      </div>
                    }
                    {lineLevelOpted && plans.items.map((plan) => (plan.planCommerceItemId === device.planCommerceItemId &&
                      <ReviewOrderPlanDetails inline inlinePlan={[plan]} device />
                    ))}

                  </Col>
                </Row>
                <div>
                  {device.devicePromotionList.map((devicePromo, i) => (
                    (devicePromo.promoName !== null && (!(bicRepresentationChangeEnabled && device.bicOfferApplied) || devicePromo.isUpgradeFeeWaivedOffer)) &&
                    <PromoBadge badgeTextClass="fontSize_1_3">
                      <span>
                        {devicePromo.promoName}
                        {(devicePromo.promoContentText !== null) &&
                          <A
                            role="button"
                            aria-label="View Promo Details"
                            className="margin6 link"
                            onClick={() => { hashHistory.push('/promoModal?index=' + i); }}
                            analyticstrack="view-promo-details"
                          >
                            View Details
                          </A>
                        }
                      </span>
                    </PromoBadge>))
                  }
                  {device.sbdHeaderMsg && !(bicRepresentationChangeEnabled && device.bicOfferApplied) &&
                    <PromoBadge badgeTextClass="fontSize_1_3">
                      <p>{device.sbdHeaderMsg}</p>
                    </PromoBadge>
                  }
                </div>
              </div>

            </div>
          ))
        }
        {lineLevelOpted && (plans.existingDevices && plans.existingDevices.length > 0)
          && plans.existingDevices.map((device) => (
            <Row className="pad32 noBottomPad" >
              <Col xs={12} >
                <h3 className="margin18 onlyTopMargin" dangerouslySetInnerHTML={{ __html: device.nickName }} />
                <HorizontalRule y={1} />
                {plans.items.map((plan) => (plan.planCommerceItemId === device.planCommerceItemId && <ReviewOrderPlanDetails inline inlinePlan={[plan]} />))}
              </Col>
            </Row>
          ))}
        {accessoriesBundle.length > 0 && accessoriesBundle.map((acc, index) => (
          <Row className="pad24 noBottomPad noSideMargin" key={`accBdl-${index}`}>
            <Col xs={12} >
              <Row className="noSideMargin">

                <Col xs={6} className="noSidePad" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                  <h2 className="fontDisplayMedium fontSize_1_3" dangerouslySetInnerHTML={{ __html: acc.displayName }} />
                </Col>
                <Col xs={6} className="textAlignRight noSidePad">
                  <img src={`${acc.imgUrl}&wid=100&hei=150`} srcSet={`${acc.imgUrl}&wid=200&hei=300 2x`} alt={acc.displayName} />
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <HorizontalRule y={1} color={accessoriesBundle.length === index + 1 ? '#000000' : '#D8DADA'} margin="24px 0 0" />
                </Col>
              </Row>
            </Col>
          </Row>
        ))}
        {accessories.length > 0 && accessories.map((acc, i) => (
          <Row className="pad24 noBottomPad noSideMargin" key={`acc-${i}`}>
            <Col xs={12} >
              <Row className="noSideMargin">

                <Col xs={6} className="noSidePad" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                  <h2 className="fontDisplayMedium fontSize_1_3" dangerouslySetInnerHTML={{ __html: acc.name }} />
                  <p
                    className="fontSize_1_3 margin6 onlyTopMargin color_gray_six"
                    dangerouslySetInnerHTML={{ __html: (acc.color ? acc.color : '') + ((acc.color && acc.size) ? ', ' : '') + (acc.size ? acc.size : '') }}
                  />
                </Col>
                <Col xs={6} className="textAlignRight noSidePad">
                  <img src={`${acc.imageUrl}&wid=100&hei=150`} srcSet={`${acc.imageUrl}&wid=200&hei=300 2x`} alt={acc.name} />
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <HorizontalRule y={1} color={accessories.length === i + 1 ? '#000000' : '#D8DADA'} margin="24px 0 0" />
                </Col>
              </Row>
            </Col>
          </Row>
        ))}
      </Col>
    </Row>

  );
};

ReviewOrderIconicDeviceDetails.propTypes = {
  devices: PropTypes.object.isRequired,
  accessories: PropTypes.array,
  accessoriesBundle: PropTypes.array,
  lineLevelOpted: PropTypes.bool,
  plans: PropTypes.array,
  bicRepresentationChangeEnabled: PropTypes.bool,
};
export default ReviewOrderIconicDeviceDetails;
