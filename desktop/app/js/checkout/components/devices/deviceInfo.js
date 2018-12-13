import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import EditButton from '../../../common/EditButton/index';
import ToolTip from '../../../common/ToolTip/index';
import { normalizePhoneNumber, normalizeNpaNxxPhoneNumber } from '../../../common/validation';
import { capitalize } from '../../../common/Helpers/index';

const DeviceInfo = (props) => {
  const { cqContent, device, index, editDeviceOpened, displayImeiId } = props;
  let deviceNumber = '';

  if (device.npnxxCustomerSelection === 'transfer' && device.portInDetails) {
    deviceNumber = `Transfer ${normalizePhoneNumber(device.portInDetails.existingNumber)}`;
  } else if (device.flow === 'AAL' || device.flow === 'NSO') {
    deviceNumber = normalizeNpaNxxPhoneNumber(device.npaNxxnumber);
  } else {
    deviceNumber = normalizePhoneNumber(device.mtnNumber);
  }
  return (
    <Row>
      <Col xs={3} sm={3} md={3} lg={2}>
        <img className="height102" src={device.deviceImageUrl} alt={device.manufactureName + ' ' + device.deviceName} />
      </Col>
      <Col xs={9} lg={10} className="noPad">
        <Row>
          <Col xs={6}>
            <h3>
              {index + 1}. <span dangerouslySetInnerHTML={{ __html: device.manufactureName }} /> <span dangerouslySetInnerHTML={{ __html: device.deviceName }} />
            </h3>
          </Col>
          {!device.modDevice && <Col xs={6}>
            <h3 className="displayInlineBlock">
              {cqContent.label.DT_OD_CHECKOUT_DEVICES_HEADER_SERVICE_ADDRESS}
            </h3>
            <ToolTip
              className="margin3 onlyLeftMargin displayInlineBlock"
              ariaLabel="Billing address information tooltip"
              text={cqContent.label.DT_OD_CHECKOUT_DEVICES_HEADER_SERVICE_ADDRESS_TOOLTIP}
              noRenderHTML
            />
          </Col>}
        </Row>
        <Row className="pad12 onlyTopPad">
          <Col xs={6}>
            {!device.modDevice && <p className="fontSize_4 margin3 onlyTopMargin" >{device.color}{device.size ? ',' : ''} {device.size}</p>}
            {!device.modDevice && <section>
              {device.numberShareDevice ?
                <div>
                  {device.numberSharedMtn ?
                    <p className="fontSize_4 margin3 onlyTopMargin">Sharing: {device.numberSharedMtn && normalizePhoneNumber(device.numberSharedMtn)}</p>
                    :
                    <p className="fontSize_4 margin3 onlyTopMargin" dangerouslySetInnerHTML={{ __html: device.numberSharedDeviceName ? 'Sharing: ' + device.numberSharedDeviceName : '' }} />
                  }
                </div>
                :
                <div>
                  <p className="fontSize_4 displayInlineBlock margin3 onlyTopMargin">{deviceNumber}</p>
                  {(device.flow === 'AAL' || device.flow === 'NSO') && !editDeviceOpened &&
                    <EditButton
                      onClick={props.onNumberEdit}
                      analyticstrack="device-deviceNumber-edit-CTA"
                    >
                      Edit
                    </EditButton>
                  }
                </div>
              }
            </section>}
            {displayImeiId &&
              <p className="fontSize_4">{cqContent.label.DT_OD_CHECKOUT_DEVICES_DEVICEID_TEXT} {displayImeiId}</p>
            }
          </Col>
          {!device.modDevice && <Col xs={6}>
            <div className="fontSize_4">
              {device.sameAsShippingAddress ?
                <span className="verticalBottom margin3 onlyTopMargin">{cqContent.label.DT_OD_CHECKOUT_DEVICES_SERVICE_ADDRESS_SAME_AS_BILLING}</span>
                :
                <span className="deviceServiceAddress verticalBottom margin3 onlyTopMargin">
                  {device.serviceAddress.address1 && <span>{capitalize(device.serviceAddress.address1)}, </span>}
                  {device.serviceAddress.address2 &&
                    <span>{capitalize(device.serviceAddress.address2)}, </span>
                  }
                  <span>{device.serviceAddress.city && `${capitalize(device.serviceAddress.city)},`} {device.serviceAddress.state && `${device.serviceAddress.city},`} {device.serviceAddress.zipCode && device.serviceAddress.zipCode}</span>

                </span>
              }
              {!editDeviceOpened &&
                <EditButton
                  onClick={props.onServiceEdit}
                  analyticstrack="device-serviceAddress-edit-CTA"
                >
                  Edit
                </EditButton>
              }
            </div>
          </Col>}
        </Row>
      </Col>
    </Row>
  );
};
DeviceInfo.propTypes = {
  cqContent: PropTypes.object,
  device: PropTypes.object,
  index: PropTypes.number,
  editDeviceOpened: PropTypes.bool,
  onServiceEdit: PropTypes.func,
  onNumberEdit: PropTypes.func,
  displayImeiId: PropTypes.string,
};
export default DeviceInfo;
