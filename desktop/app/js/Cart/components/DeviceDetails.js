import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import ItemHeader from './ItemHeader';
import TradeInDevice from './TradeInDevice';
import TradeInPromoDetails from './TradeInPromoDetails';
import InstantCreditTradeIn from './InstantCreditTradeIn';
import ItemWrapper from './ItemWrapper';

import AsyncComponent from '../../common/AsyncComponent';

const Devices = AsyncComponent(() => import('./Devices'));
const PlanInfo = AsyncComponent(() => import('./PlanInfo'));
const PlanInfoLL = AsyncComponent(() => import('./PlanInfoLineLevel'));
const RecommendedAccesoriesWrapper = AsyncComponent(() => import('./../containers/RecommendedAccessoriesWrapper'));
const StandAloneAccessoriesWrapper = AsyncComponent(() => import('./../containers/StandAloneAccessoriesWrapper'));

const DeviceDetails = (props) => {
  const {
    cqContent, isHLLDevices, isSingleModConnectedDevice, items, protectionURL, plans, tradeInPromoEligible, tradeInPromoDetails, removeTradeInDeviceFromCart,
    tradeInUrl, clearCart, cpcSucessful, removeDevice, accessoriesBundle, accessories, standaloneAccessories,
    isNSOFlow, recommendedAccessories, tmpMd, emptyCartFlag, itemOnJaxPlan, autoPayApplied, authenticated, instantCreditTradeinSummary,
    instantCreditAppliedOnOrder, instantCreditEligible, instantCreditPageURL, totalDeviceCount, totalTradeinDeviceCount,
    promotionList, showHeadsUpMsg, bicItems, nonBicItems, asyncFetch, asyncCallStatus, ispuselectedAtPdp } = props;

  const { isFetching, error, data } = recommendedAccessories;
  const isStatndAlAccessorieExist = ((accessories && accessories.length > 0) ||
    accessoriesBundle);
  const isPlansExists = (plans && plans.items && plans.items.length > 0);
  const showTmpMdPriceIndex = 0;
  let tapIndex = 0;
  let tapExistIndex = 0;
  let nonNSODevices = 0;
  const tradeInDevices = tradeInPromoDetails && tradeInPromoDetails.tradeInDevices;

  return (
    <div>{emptyCartFlag === false && <div>
      {items && items.map((deviceInfo, id) => (
        <ItemWrapper key={'device-' + id}>
          <ItemHeader
            title={isHLLDevices ? (deviceInfo.nickName || `Line ${id + 1}`) : `Device ${id + 1}`}
            cqContent={cqContent}
            modDevice={deviceInfo.modDevice}
            dueMonthlyDuration={deviceInfo.dueMonthlyAfterDuration}
          >
            <Devices
              key={id}
              showTmpMdPrice={tmpMd && !deviceInfo.protectionOption && showTmpMdPriceIndex + 1}
              hideTmpMdPrice={tmpMd && !deviceInfo.protectionOption && showTmpMdPriceIndex > 1 && true}
              accessories={accessories}
              totalDevices={items.length}
              cqContent={cqContent}
              planInfo={plans}
              instantCreditEligible={instantCreditEligible}
              instantCreditPageURL={instantCreditPageURL}
              protectionURL={protectionURL}
              deviceInfo={deviceInfo}
              clearCart={clearCart}
              itemOnJaxPlan={itemOnJaxPlan}
              isHLLDevices={isHLLDevices}
              removeDevice={removeDevice}
              isSingleModConnectedDevice={isSingleModConnectedDevice}
              cpcSucessful={cpcSucessful}
              totalDeviceCount={totalDeviceCount}
              totalTradeinDeviceCount={totalTradeinDeviceCount}
              tapIndex={!deviceInfo.protectionOption ? (tapIndex += 1) : tapIndex}
              tapExistIndex={(deviceInfo.protectionOption && deviceInfo.protectionOption.featureType === 'SPO') ? (tapExistIndex += 1) : tapExistIndex}
              tmpMd={tmpMd}
              index={deviceInfo.flow !== 'NSO' && (nonNSODevices += 1)}
              authenticated={authenticated}
              promotionList={promotionList}
              showHeadsUpMsg={showHeadsUpMsg}
              asyncFetch={asyncFetch}
              asyncCallStatus={asyncCallStatus}
              ispuselectedAtPdp={ispuselectedAtPdp}
            />
          </ItemHeader>
        </ItemWrapper>
      ))
      }
      {cpcSucessful === true && isPlansExists === true &&
        <section>
          {isHLLDevices ?
            <div>
              {plans !== null && <PlanInfoLL
                plans={plans}
                cqContent={cqContent}
                itemOnJaxPlan={itemOnJaxPlan}
                isHLLDevices={isHLLDevices}
                autoPayApplied={autoPayApplied}
                deviceInfo={''}
                lineLevelPlan
                asyncFetch={asyncFetch}
                asyncCallStatus={asyncCallStatus}
              />}
            </div> :
            <ItemWrapper>
              <ItemHeader
                title={cqContent.label.DT_OD_CART_PLAN_TITLE}
                cqContent={cqContent}
              >
                {plans !== null && <PlanInfo plans={plans} cqContent={cqContent} itemOnJaxPlan={itemOnJaxPlan} isHLLDevices={isHLLDevices} autoPayApplied={autoPayApplied} />}
              </ItemHeader>
            </ItemWrapper>
          }
        </section>
      }
      {isStatndAlAccessorieExist &&
        <ItemWrapper>
          <ItemHeader
            title={cqContent.label.DT_OD_CART_ACCESSORIES_TITLE}
            cqContent={cqContent}
            standaloneAccessories={standaloneAccessories}
          >
            <StandAloneAccessoriesWrapper />
          </ItemHeader>
        </ItemWrapper>
      }
      {standaloneAccessories === false && isNSOFlow === false &&
        <ItemWrapper>
          {tradeInPromoEligible && tradeInPromoDetails === null ?
            <TradeInDevice cqContent={cqContent} tradeInUrl={tradeInUrl} asyncFetch={asyncFetch} asyncCallStatus={asyncCallStatus} />
            :
            <div>
              <Row bottom="xs" className="pad12">
                <Col xs={12}>
                  <h2 className="fontSize_10" >{cqContent.label.DT_OD_CART_TRADE_IN}</h2>
                  <hr style={{ borderColor: '#D8DADA' }} />
                </Col>
              </Row>
              {instantCreditEligible ? <InstantCreditTradeIn
                bicItems={bicItems}
                nonBicItems={nonBicItems}
                tradeInPromoDetails={tradeInPromoDetails}
                tradeInUrl={tradeInUrl}
                cqContent={cqContent}
                instantCreditPageURL={instantCreditPageURL}
                instantCreditAppliedOnOrder={instantCreditAppliedOnOrder}
                removeTradeInDeviceFromCart={removeTradeInDeviceFromCart}
                instantCreditTradeinSummary={instantCreditTradeinSummary}
                totalDeviceCount={totalDeviceCount}
                totalTradeinDeviceCount={totalTradeinDeviceCount}
                showHeadsUpMsg={showHeadsUpMsg}
                asyncFetch={asyncFetch}
                asyncCallStatus={asyncCallStatus}
              /> :
                (tradeInDevices && tradeInDevices.length > 0 && tradeInDevices.map((device, index) => (
                  <TradeInPromoDetails
                    device={device}
                    tradeInUrl={tradeInUrl}
                    cqContent={cqContent}
                    removeTradeInDeviceFromCart={removeTradeInDeviceFromCart}
                    index={index}
                    count={tradeInDevices.length - 1}
                  />
                )))
              }
              {!instantCreditEligible &&
                <Row className="pad12">
                  <Col xs={8} className="">
                    {tradeInDevices && tradeInDevices.length > 0 && tradeInDevices[tradeInDevices.length - 1].legalText &&
                      <p
                        className="legal pad12 onlyLeftPad"
                        dangerouslySetInnerHTML={{ __html: tradeInDevices[tradeInDevices.length - 1].legalText }}
                      />
                    }
                  </Col>
                  <Col xs={4} className="fontSize_7 textRight tertiary">
                    <a
                      role="button"
                      onClick={() => (window.location = tradeInUrl)}
                      analyticstrack="trade-in-link"
                      className="noTextDecoration"
                    >
                      {cqContent.label.DT_OD_CART_TRADE_IN_ANOTHER_DEVICE_CTA_TEXT}
                    </a>
                  </Col>
                </Row>
              }
            </div>
          }
        </ItemWrapper>
      }

      {(isFetching === false && Object.keys(data).length > 0 && (data.output.recommendedAccessoriesDetails && data.output.recommendedAccessoriesDetails.length > 0)) && error === false &&
        <ItemWrapper>
          <RecommendedAccesoriesWrapper />
        </ItemWrapper>
      }

    </div>}</div>
  );
};

DeviceDetails.propTypes = {
  cqContent: PropTypes.object,
  instantCreditEligible: PropTypes.bool,
  instantCreditPageURL: PropTypes.bool,
  instantCreditTradeinSummary: PropTypes.object,
  instantCreditAppliedOnOrder: PropTypes.string,
  items: PropTypes.array,
  protectionURL: PropTypes.string,
  plans: PropTypes.object,
  tradeInPromoEligible: PropTypes.bool,
  tradeInPromoDetails: PropTypes.oneOfType([PropTypes.object, null]),
  tradeInUrl: PropTypes.string,
  clearCart: PropTypes.func,
  cpcSucessful: PropTypes.bool,
  removeDevice: PropTypes.func,
  accessoriesBundle: PropTypes.oneOfType([PropTypes.array, null]),
  accessories: PropTypes.oneOfType([PropTypes.array, null]),
  standaloneAccessories: PropTypes.bool,
  isNSOFlow: PropTypes.bool,
  recommendedAccessories: PropTypes.object,
  asyncCallStatus: PropTypes.object,
  tmpMd: PropTypes.object,
  emptyCartFlag: PropTypes.bool,
  removeTradeInDeviceFromCart: PropTypes.func,
  itemOnJaxPlan: PropTypes.bool,
  isHLLDevices: PropTypes.bool,
  isSingleModConnectedDevice: PropTypes.bool,
  autoPayApplied: PropTypes.bool,
  authenticated: PropTypes.bool,
  totalDeviceCount: PropTypes.number,
  totalTradeinDeviceCount: PropTypes.number,
  // totalDueMonthly: PropTypes.string,
  // rawSubTotalDueToday: PropTypes.string,
  promotionList: PropTypes.array,
  showHeadsUpMsg: PropTypes.bool,
  bicItems: PropTypes.array,
  nonBicItems: PropTypes.array,
  asyncFetch: PropTypes.func,
  ispuselectedAtPdp: PropTypes.bool,
};
export default DeviceDetails;
