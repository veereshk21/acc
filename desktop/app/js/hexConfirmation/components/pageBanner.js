import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-flexbox-grid';
import Title from '../../common/Title/Title';

const isNotNSOFlow = (devices) => {
  let isNotNSO = false;
  if (devices) {
    for (const x in devices.items) {
      if (devices.items[x].flow !== 'NSO') {
        isNotNSO = true;
      }
    }
  }
  return isNotNSO;
};
/* eslint-disable react/prefer-stateless-function */
class PageBanner extends Component {
  render() {
    const { cqKeys, devices, accessories, multiOrderDetails, comboOrder, subOrders, orderId, confirmationEmail } = this.props;
    console.log(this.props);
    const deviceList = devices && devices.items;
    const accessoryList = accessories;
    return (
      <Row className="pageBanner background_black color_white pad20 margin36 onlyBottomMargin">
        <Col md={6} lg={6} className="pageBanner_leftPane textAlignLeft">
          <section className="pageBanner_leftPane_titleInfo margin30 onlyBottomMargin">
            <Title className="fontSize_10 color_white">
              {`${cqKeys.label.DT_OD_CONFIMARTION_THANKS_TITLE} ${deviceList[0].nickName}`}
            </Title>
            {(!isNotNSOFlow(devices) && accessoryList) && <div>
              {(accessoryList.length > 1) ?
                <div className="fontSize_8 bold margin20 onlyTopMargin" dangerouslySetInnerHTML={{ __html: cqKeys.label.DT_OD_CONFIMARTION_SUB_TITLE_MULTI_DEVICE }} />
                :
                <div className="fontSize_8 bold margin20 onlyTopMargin" dangerouslySetInnerHTML={{ __html: `${cqKeys.label.DT_OD_CONFIMARTION_SUB_TITLE_SINGLE_DEVICE} ${accessoryList[0].displayName}` }} />
              }
            </div>
            }
            {isNotNSOFlow(devices) && <div>
              {(deviceList && !accessoryList) && <div>
                {(deviceList.length > 1) ?
                  <div className="fontSize_5" dangerouslySetInnerHTML={{ __html: cqKeys.label.DT_OD_CONFIMARTION_SUB_TITLE_MULTI_DEVICE }} />
                  :
                  <div className="fontSize_5" dangerouslySetInnerHTML={{ __html: `${cqKeys.label.DT_OD_CONFIMARTION_SUB_TITLE_SINGLE_DEVICE} ${deviceList[0].displayName}` }} />
                }
              </div>
              }
              {(accessoryList && !deviceList) && <div>
                {(accessoryList.length > 1) ?
                  <div className="fontSize_5" dangerouslySetInnerHTML={{ __html: cqKeys.label.DT_OD_CONFIMARTION_SUB_TITLE_MULTI_DEVICE }} />
                  :
                  <div className="fontSize_5" dangerouslySetInnerHTML={{ __html: `${cqKeys.label.DT_OD_CONFIMARTION_SUB_TITLE_SINGLE_DEVICE} ${accessoryList[0].displayName}` }} />
                }
              </div>
              }

              {(deviceList && accessoryList) && <div>
                {((deviceList.length + accessoryList.length) > 1) ?
                  <div className="fontSize_5" dangerouslySetInnerHTML={{ __html: cqKeys.label.DT_OD_CONFIMARTION_SUB_TITLE_MULTI_DEVICE }} />
                  :
                  <div className="fontSize_5" dangerouslySetInnerHTML={{ __html: `${cqKeys.label.DT_OD_CONFIMARTION_SUB_TITLE_SINGLE_DEVICE} ${deviceList[0].displayName}` }} />
                }
              </div>
              }
            </div>
            }
          </section>
          <section className="pageBanner_leftPane_orderInfo margin60 onlyBottomMargin">
            {(multiOrderDetails || (comboOrder && subOrders)) ?
              <div>
                {(comboOrder) ?
                  <div>
                    {subOrders && subOrders.length > 0 && <div>
                      {subOrders.map((order) => (
                        <div className="margin10 noSideMargin" key={order.clientReferenceNumber}>
                          <h3>
                            <span>{cqKeys.label['DT_OD_CONFIRMATION_DEVICE_' + order.suborderType + '_TEXT']}</span>
                            <span className="pad5">{order.clientReferenceNumber}</span>
                          </h3>
                        </div>
                      ))}
                    </div>}
                  </div>
                  :
                  <div>
                    {multiOrderDetails && multiOrderDetails.length > 0 && <div>
                      {multiOrderDetails.map((order) => (
                        <div className="margin10 noSideMargin" key={order.clientOrderRefernceNumber}>
                          { order.flow === 'EUP' ? <h3>
                            <span>{cqKeys.label.DT_OD_CONFIRMATION_DEVICE_UPGRADE_TEXT}</span>
                            <span className="pad5">{order.clientOrderRefernceNumber}</span>
                          </h3> : <h3>
                            <span>{cqKeys.label.DT_OD_CONFIRMATION_DEVICE_ADD_TEXT}</span>
                            <span className="pad5">{order.clientOrderRefernceNumber}</span>
                          </h3>}
                        </div>
                      ))}
                      <p className="margin5 noSideMargin">{cqKeys.label.DT_OD_CONFIRMATION_DEVICE_PROCESS_TEXT_1}{multiOrderDetails.length}{cqKeys.label.DT_OD_CONFIRMATION_DEVICE_PROCESS_TEXT_2}</p>
                    </div>}
                  </div>
                }
              </div>
              :
              <div>
                <p className="fontSize_3">{cqKeys.label.DT_OD_CONFIRMATION_ORDER_TEXT} {orderId}</p>
              </div>
            }
            <div className="fontSize_3 pad6 onlyTopPad" dangerouslySetInnerHTML={{ __html: `${cqKeys.label.DT_OD_CONFIRMATION_EMAIL_RECEIPT} ${confirmationEmail}` }} / >
          </section>
          <hr />
          <section className="pageBanner_leftPane_fiosInfo margin30 onlyBottomMargin">
            <p className="fontSize_3" dangerouslySetInnerHTML={{ __html: `${cqKeys.label.DT_OD_CONFIRMATION_FIOS_ELIGIBLE_TEXT}` }} />
            <p className="fontSize_3" dangerouslySetInnerHTML={{ __html: `${cqKeys.html.DT_OD_CONFIRMATION_FIOS_SIGNUP_HTML}` }} />
            <p className="fontSize_3 pad18 onlyTopPad" dangerouslySetInnerHTML={{ __html: `${cqKeys.html.DT_OD_CONFIRMATION_FIOS_SIGNIN_HTML}` }} />
          </section>
        </Col>
        <Col md={6} lg={6} className="pageBanner_rightPane textAlignRight">
          <section className="">
            <a
              className="font-icon_print textDecUnderline inlineBlock margin15 onlyTopMargin"
            >&nbsp;<span className="margin15 onlyLeftMargin confirmation_print" dangerouslySetInnerHTML={{ __html: cqKeys.label.DT_OD_CONFIRMATION_PRINT }} />
            </a>
          </section>
        </Col>
      </Row>
    );
  }
}

PageBanner.propTypes = {
  cqKeys: PropTypes.object,
  devices: PropTypes.array,
  accessories: PropTypes.array,
  orderId: PropTypes.string.isRequired,
  multiOrderDetails: PropTypes.array,
  comboOrder: PropTypes.bool,
  subOrders: PropTypes.array,
  confirmationEmail: PropTypes.string,
};
export default PageBanner;
