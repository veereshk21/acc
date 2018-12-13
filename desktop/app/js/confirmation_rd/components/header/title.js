import React from 'react';
import PropTypes from 'prop-types';
import Title from '../../../common/Title/Title';
import { capitalize } from '../../../common/Helpers/index';
import Printer from '../../../../images/print.svg';

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
      titleMessage = cqContent.label.DT_OD_CONFIRMATION_SUB_TITLE_MULTI_DEVICE;
    } else {
      // Single Accessory
      titleMessage = `${cqContent.label.DT_OD_CONFIRMATION_SUB_TITLE_SINGLE_DEVICE} ${accessories[0].name}`;
    }
  } else if (!isNSO) {
    if (hasDevices && !hasAccessories) { // Device Only
      if ((devices.items.length > 1)) {
        // Muli Device
        titleMessage = cqContent.label.DT_OD_CONFIRMATION_SUB_TITLE_MULTI_DEVICE;
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
    <div>
      <Title className="headingFeature">
        {cqContent.label.DT_OD_CONFIRMATION_THANKS_TITLE} {capitalize(` ${name}`)}.
      </Title>
      <div
        className="infoFeature inlineBlock"
        dangerouslySetInnerHTML={{ __html: titleMessage }}
      />
      <div className="fontSize_4 inlineBlock pad18 onlyLeftPad">
        <img className="verticalCenter" height="20px" src={Printer} alt="Printer" />
        <a
          href="d"
          onClick={props.printReceipt}
          analyticstrack="printReceipt-link"
          className="textDecUnderline inlineBlock margin15 onlyTopMargin"
        >
          <span
            className="margin6 onlyLeftMargin confirmation_print"
            dangerouslySetInnerHTML={{ __html: cqContent.label.DT_OD_CONFIRMATION_PRINT }}
          />
        </a>
      </div>
    </div>
  );
};

HeaderTitle.propTypes = {
  cqContent: PropTypes.object,
  devices: PropTypes.object,
  accessories: PropTypes.array,
  billingInfo: PropTypes.object,
  printReceipt: PropTypes.func,
};
export default HeaderTitle;
