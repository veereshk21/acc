import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import Notification from '../../../common/Notification/Notification';
import Device from './device';
import Promotions from './promotions';
import Protection from './protection';

const DevicesSection = (props) => {
  const { cqContent, devices, devicesOuter, globalPromotions } = props;
  const showCloseGlobalPromo = true;
  return (
    <div id="devicesSection">
      <div className="pad24 noBottomPad">
        <h3 className="onlyBottomMargin normal fontSize_4">Device Summary</h3>
        {/* TODO: ask if global promos go here or in the promo section? */}
        {(globalPromotions && globalPromotions.length > 0) && globalPromotions.map((globalPromo) =>
          (globalPromo.badgeText &&
            <Row>
              <hr className="border_black noBottomBorder" />

              <Col xs={12} className="onlyBottomPad pad6">
                <Notification
                  type={`${globalPromotions ? 'info' : 'error'}`}
                  message={globalPromo.badgeText}
                  toolTip={globalPromo.badgeToolTip}
                  noClose={showCloseGlobalPromo}
                />
              </Col>
            </Row>
          ))
        }
        {devices.map((device, index) => {
          const deviceOuter = devicesOuter && devicesOuter.length > 0 ? devicesOuter.find((item) => item.commerceItemId === device.deviceId) : null;
          return (
            <div key={`editDevice-${index}`}>
              <hr className="border_black noBottomBorder" />
              <Device
                cqContent={cqContent}
                device={device}
                deviceOuter={deviceOuter}
                index={index}
              />

              {device.protectionFeature &&
                <Protection
                  cqContent={cqContent}
                  flow={device.flow}
                  mtn={device.mtn}
                  commerceItemId={device.commerceItemId}
                  preSelectedProtection={device.protectionFeature}
                  form={`protectionDevice_${index}`}
                />
              }
              {(device.devicePromotionList && device.devicePromotionList.length > 0) &&
                <Promotions
                  cqContent={cqContent}
                  deviceIndex={index}
                  promotionList={device.devicePromotionList}
                />
              }

            </div>
          );
        })}
      </div>
    </div>
  );
};

DevicesSection.propTypes = {
  cqContent: PropTypes.object,
  devices: PropTypes.array,
  devicesOuter: PropTypes.array,
  globalPromotions: PropTypes.array,
};
export default DevicesSection;
