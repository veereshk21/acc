import React from 'react';
import PropTypes from 'prop-types';
import NotificationBar from '../../../common/NotificationBar';
import Loader from '../../../common/Loader/Loader';
import { NOTIFICATIONS } from '../../constants';
import Configurator from './configurator';
import Promotions from './promotions';
import Protection from './protection';

const DevicesSection = (props) => {
  const { cqContent, devices, globalPromotions, devicesOuter, protectionChange, updateProtection, protectionChangeList, protectionTypes, protectionRemove, isFetching, appleCare } = props;
  return (
    <div id="devicesSection">
      {isFetching === true && <Loader />}
      <NotificationBar section={NOTIFICATIONS.DEVICE} />
      <div className="pad24 noBottomPad">
        <h3 className="onlyBottomMargin normal fontSize_4">Device summary</h3>
        {devices.map((device, index) => {
          const deviceOuter = devicesOuter && devicesOuter.length > 0 ? devicesOuter.find((item) => item.commerceItemId === device.deviceId) : null;
          return (
            <div key={`editDevice-${index}`}>
              <hr className="border_black noBottomBorder" />
              {device.productDetails &&
                <Configurator
                  {...props}
                  device={device}
                  deviceOuter={deviceOuter}
                  index={index}
                  form={`configureDevice_${index}`}
                  initialValues={{
                    [`device_${index}_contract`]: device.contractTerm,
                    [`device_${index}_capacity`]: device.size,
                    [`device_${index}_color`]: device.color,
                  }}
                />
              }
              {device.protectionFeature &&
                <Protection
                  {...props}
                  cqContent={cqContent}
                  flow={device.flow}
                  mtn={device.mtn}
                  commerceItemId={device.commerceItemId}
                  sorId={device.sorId}
                  deviceSkuId={device.deviceSkuId}
                  preSelectedProtection={device.protectionFeature}
                  updateProtection={updateProtection}
                  protectionChange={protectionChange}
                  protectionRemove={protectionRemove}
                  tapExist={protectionChangeList && protectionChangeList.mtnDeviceInfo && protectionChangeList.mtnDeviceInfo.tapExist}
                  protectionChangeList={protectionChangeList}
                  protectionTypes={protectionTypes}
                  appleCare={appleCare}
                  form={`protectionDevice_${index}`}
                />
              }
            </div>
          );
        })}
        {(globalPromotions && globalPromotions.length > 0) &&
          <Promotions
            cqContent={cqContent}
            globalPromotions={globalPromotions}
            devices={devices}
          />
        }
      </div>
    </div>
  );
};

DevicesSection.propTypes = {
  cqContent: PropTypes.object,
  devices: PropTypes.array,
  devicesOuter: PropTypes.array,
  protectionChange: PropTypes.func,
  protectionRemove: PropTypes.func,
  updateProtection: PropTypes.func,
  isFetching: PropTypes.bool,
  appleCare: PropTypes.object,
  protectionChangeList: PropTypes.object,
  protectionTypes: PropTypes.object,
  globalPromotions: PropTypes.array,
  // deviceDetails: PropTypes.object,
  // updateDeviceSku: PropTypes.func,
};
export default DevicesSection;
