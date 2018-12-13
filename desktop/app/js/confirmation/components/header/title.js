import React from 'react';
import PropTypes from 'prop-types';
import Title from '../../../common/Title/Title';

const isNotNSOFlow = (devices) => {
  let isNotNSO = false;
  if (devices && devices.items) {
    for (const x in devices.items) {
      if (devices.items[x].flow !== 'NSO') {
        isNotNSO = true;
      }
    }
  }
  return isNotNSO;
};

const HeaderTitle = (props) => {
  const { cqContent, devices, accessories } = props;
  const { billingAddress } = props.billingInfo;
  const hasDevices = devices && devices.items && devices.items.length > 0;
  const hasAccessories = accessories && accessories.length > 0;
  const isNSO = !isNotNSOFlow(devices);
  const isMultiAccessory = (accessories && accessories.length > 1);

  // Construct Name
  const firstName = billingAddress.firstName ? billingAddress.firstName : '';
  const middleName = billingAddress.middleName ? billingAddress.middleName : '';
  const lastName = billingAddress.lastName ? billingAddress.lastName : '';
  const name = firstName + ' ' + middleName + ' ' + lastName;

  // Get Appropriate Title Message
  let titleMessage = '';
  if ((isNSO && accessories)) { // NSO with accessory
    if (isMultiAccessory) {
      // Multi Acessory
      titleMessage = cqContent.label.DT_OD_CONFIMARTION_SUB_TITLE_MULTI_DEVICE;
    } else {
      // Single Accessory
      titleMessage = `${cqContent.label.DT_OD_CONFIRMATION_SUB_TITLE_SINGLE_DEVICE} ${accessories[0].name}`;
    }
  } else if (!isNSO) {
    if (hasDevices && !hasAccessories) { // Device Only
      if ((devices.items.length > 1)) {
        // Muli Device
        titleMessage = cqContent.label.DT_OD_CONFIMATION_SUB_TITLE_MULTI_DEVICE;
      } else {
        // Single Device
        titleMessage = `${cqContent.label.DT_OD_CONFIRMATION_SUB_TITLE_SINGLE_DEVICE} ${devices.items[0].manufactureName} ${devices.items[0].deviceName}`;
      }
    } else if (accessories && !hasDevices) { // Standalone Accessories
      if (isMultiAccessory) {
        // Muli Accessories
        titleMessage = cqContent.label.DT_OD_CONFIRMATION_SUB_TITLE_MULTI_DEVICE;
      } else {
        // Single Accessory
        titleMessage = `${cqContent.label.DT_OD_CONFIRMATION_SUB_TITLE_SINGLE_DEVICE} ${accessories[0].name}`;
      }
    } else if (hasDevices && hasAccessories) { // Device and Accessory Order
      titleMessage = cqContent.label.DT_OD_CONFIRMATION_SUB_TITLE_MULTI_DEVICE;
    }
  }

  return (
    <div className="pad12 onlyTopPad ">
      <Title className="fontSize_13">
        {cqContent.label.DT_OD_CONFIRMATION_THANKS_TITLE} {name}.
      </Title>
      <div
        className="fontSize_12 bold margin20 onlyTopMargin"
        dangerouslySetInnerHTML={{ __html: titleMessage }}
      />
    </div>
  );
};

HeaderTitle.propTypes = {
  cqContent: PropTypes.object,
  devices: PropTypes.object,
  accessories: PropTypes.array,
  billingInfo: PropTypes.object,
};
export default HeaderTitle;
