import { Accordion, AccordionItem, AccordionItemTitle, AccordionItemBody } from 'react-accessible-accordion';
import { Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React from 'react';

const CheckedDevices = (props) => (
  <Row>
    <Col xs={12}>
      <Row className="border_grayThree">
        {props.deviceDetail.length > 1 ?
          <Col xs={12}>
            <Row className="pad10 noSidePad">
              <Col xs={12}>
                <h2>Your checked devices</h2>
              </Col>
            </Row>
            <Accordion className="width100">
              {
                props.deviceDetail.map((device, idx) =>
                  (
                    <AccordionItem
                      expanded={idx === 0}
                      className={`${(idx !== props.deviceDetail.length - 1 ? 'accordionItem pad12 noSidePad border_grayThree onlyBottomBorder' : 'accordionItem pad12 noSidePad')}`}
                    >
                      <AccordionItemTitle className="pad18 onlyBottomPad noOutline pointer accordion__title">
                        <Row style={{ width: '90%', display: 'inline-block' }}>
                          <Col xs={12}>
                            <h3>{device.deviceName}</h3>
                          </Col>
                        </Row>
                      </AccordionItemTitle>
                      <AccordionItemBody>
                        <Row className="min-height500">
                          <Col xs={12}>
                            <Row className="pad18 onlyBottomPad">
                              <Col xs={12} className="textAlignCenter">
                                <img src={`https://ss7.vzw.com/is/image/VerizonWireless/${device.imageUrl}?$device-lg$`} alt={device.deviceName} />
                              </Col>
                            </Row>
                            {device.deviceId &&
                              <Row>
                                <Col xs={6} className="bold fontSize_4">
                                  {props.cqJSON.label.DT_OD_BYOD_CHECKED_DEVICE_ID}
                                </Col>
                                <Col xs={6} className="fontSize_4">
                                  {device.deviceId}
                                </Col>
                              </Row>
                            }
                            {device.simId &&
                              <Row>
                                <Col xs={6} className="bold fontSize_4">
                                  {props.cqJSON.label.DT_OD_BYOD_CHECKED_SIM_ID}
                                </Col>
                                <Col xs={6} className="fontSize_4">
                                  {device.simId}
                                </Col>
                              </Row>
                            }
                            <Row>
                              <Col xs={12}>
                                <button
                                  className="button no-style textDecUnderline"
                                  onClick={props.removeDevice.bind(this, props.removeDeviceUrl, device.deviceId)}
                                  onKeyPress={props.removeDevice.bind(this, props.removeDeviceUrl, device.deviceId)}
                                  style={{ padding: '12px 0px' }}
                                  analyticstrack="remove-device-link"
                                >
                                  {props.cqJSON.label.DT_OD_BYOD_CHECKED_REMOVE_DEVICE}
                                </button>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </AccordionItemBody>
                    </AccordionItem>
                  ))
              }
            </Accordion>
          </Col> :
          <Col xs={12}>
            <Row className="min-height500">
              <Col xs={12}>
                <Row className="pad18">
                  <Col xs={12}>
                    <h2>Your checked devices</h2>
                  </Col>
                </Row>
                <Row className="pad18 onlyBottomPad">
                  <Col xs={6}>
                    <img className="width100" src={`https://ss7.vzw.com/is/image/VerizonWireless/${props.deviceDetail[0].imageUrl}?$device-lg$`} alt={props.deviceDetail[0].deviceName} />
                  </Col>
                  <Col xs={6}>
                    <Row className="pad18 onlyBottomPad">
                      <Col xs={12} className="bold">
                        {props.deviceDetail[0].deviceName}
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} className="bold">
                        {props.cqJSON.label.DT_OD_BYOD_CHECKED_DEVICE_ID}
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12}>
                        {props.deviceDetail[0].deviceId}
                      </Col>
                    </Row>
                    {props.deviceDetail[0].simId &&
                      <Row>
                        <Col xs={12} className="bold">
                          {props.cqJSON.label.DT_OD_BYOD_CHECKED_SIM_ID}
                        </Col>
                        <Col xs={12}>
                          {props.deviceDetail[0].simId}
                        </Col>
                      </Row>
                    }
                  </Col>
                </Row>
                <Row className="pad18">
                  <Col xs={12}>
                    <button
                      className="button no-style textDecUnderline"
                      onClick={props.removeDevice.bind(this, props.removeDeviceUrl, props.deviceDetail[0].deviceId)}
                      onKeyPress={props.removeDevice.bind(this, props.removeDeviceUrl, props.deviceDetail[0].deviceId)}
                      style={{ padding: '12px 0px' }}
                      analyticstrack="remove-device-link"
                    >
                      {props.cqJSON.label.DT_OD_BYOD_CHECKED_REMOVE_DEVICE}
                    </button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        }
      </Row>
    </Col>
  </Row>
);

// Eslint is acting crazy, not correctly detecting showDeviceId & showSimId
CheckedDevices.propTypes = {
  cqJSON: PropTypes.object,
  deviceDetail: PropTypes.object,
  showDeviceId: PropTypes.bool, // eslint-disable-line
  showSimId: PropTypes.bool, // eslint-disable-line
  removeDevice: PropTypes.func,
  removeDeviceUrl: PropTypes.string,
};

export default CheckedDevices;
