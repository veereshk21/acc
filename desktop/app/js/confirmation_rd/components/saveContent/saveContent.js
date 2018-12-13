import React, { Component } from 'react';
import { Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import Button from '../../../common/Button/Button';
import AsyncComponent from './../../../common/AsyncComponent';

const Modal = AsyncComponent(() => import('../../../common/Modal/index'));

class SaveContent extends Component {
  constructor(props) {
    super(props);

    this.state = { showAppleMusicModal: false };
  }
  closeAppleMusicModal = () => this.setState({ showAppleMusicModal: false });
  openAppleMusicModal = () => this.setState({ showAppleMusicModal: true });

  render() {
    const { cqContent, devices } = this.props;
    const enrollForAppleMusic = () => { window.location = this.props.appleMusicEnrollUrl; };
    // const NONFIOS_SIGNUP = '<a class="color_white textUnderline" href="#">Go to Fios and sign up</a>';
    // const FIOS_SIGNUP = '<a class="color_white textUnderline" href="#">Sign up</a>';
    return (
      <div className="infoGrid color_black margin36 onlyBottomMargin">
        <Row className="infoGrid_content">
          <Col lg={6} md={6} className="infoGrid_content_headStart border_CC">
            <Row className="pad20 noBottomPad">
              <Col lg={12} md={12}>
                <div className="infoGrid_content_headStart_title">
                  <h2 className="fontSize_9">{cqContent.label.DT_OD_CONFIRMATION_GET_HEAD_START}</h2>
                  <p className="fontSize_3" dangerouslySetInnerHTML={{ __html: cqContent.label.DT_OD_CONFIRMATION_SAVE_DATA }} />
                </div>
              </Col>
            </Row>
            <Row className="pad20">
              <Col lg={6} md={6}>
                <section className="infoGrid_content_headStart_leftPane">
                  <Row>
                    <Col xs style={{ flexGrow: 0 }}>
                      <span className="bold fontSize_11">1</span>
                    </Col>
                    <Col xs>
                      <p className="margin6 onlyBottomMargin fontSize_2 width80 pad6 onlyTopPad" dangerouslySetInnerHTML={{ __html: cqContent.label.DT_OD_CONFIRMATION_BACKUP_DATA }} />
                      <a className="block textDecUnderline fontSize_2" analyticstrack="backupData-link" href=" /support/transfer-contacts-and-media/" target="_blank" dangerouslySetInnerHTML={{ __html: cqContent.label.DT_OD_CONFIRMATION_EASY_FILE_TRANSFER }} />
                    </Col>
                  </Row>
                </section>
              </Col>
              <Col lg={6} md={6}>
                <section className="infoGrid_content_headStart_rightPane">
                  <Row>
                    <Col xs style={{ flexGrow: 0 }}>
                      <span className="bold fontSize_11">2</span>
                    </Col>
                    <Col xs>
                      <p className="margin6 onlyBottomMargin fontSize_2 width80 pad6 onlyTopPad" dangerouslySetInnerHTML={{ __html: cqContent.label.DT_OD_CONFIRMATION_ACTIVATE_NEW_DEVICE }} />
                      <a className="block textDecUnderline fontSize_2" analyticstrack="easyToActivate-link" href="/solutions-and-services/activate-my-device/" target="_blank">{cqContent.label.DT_OD_CONFIRMATION_EASY_TO_ACTIVATE}</a>
                    </Col>
                  </Row>
                </section>
              </Col>
            </Row>
          </Col>
          {/* isHLLPlanInOrder && <Col lg={6} md={6} className="infoGrid_content_fios background_black" style={{ borderLeft: 'none' }}>
          <Row className="pad20">
            <Col lg={12} md={12}>
              <h2 className="fontSize_9 color_white" dangerouslySetInnerHTML={{ __html: cqContent.label.DT_OD_CONFIRMATION_FIOS_INFO_HEADER }} />
              <p className="color_white margin12 noSideMargin fontSize_2" dangerouslySetInnerHTML={{ __html: `${cqContent.label.DT_OD_CONFIRMATION_FIOS_ELIGIBILiTY.replace('$NONFIOS_SIGNUP$', NONFIOS_SIGNUP)}` }} />
              <p className="color_white margin12 noSideMargin fontSize_2" dangerouslySetInnerHTML={{ __html: `${cqContent.label.DT_OD_CONFIRMATION_FIOS_SIGNUP.replace('$FIOS_SIGNUP$', FIOS_SIGNUP)}` }} />
            </Col>
          </Row>
        </Col>
        */}
          {devices && devices.globalPromotions && devices.globalPromotions.length > 0 && devices.globalPromotions.map((promotion) => promotion.promoType === 'PLAN_OFFER' && promotion.badgeText &&
            <Col lg={6} md={6} className="appleMusicPod infoGrid_content_appleMusic border_CC background_blue color_FFF" style={{ borderLeft: 'none' }}>
              <Row className="promotion pad20">
                <Col lg={12} md={12}>
                  <div className="fontSize_9 bold lineHeight12 pad5 noSidePad">
                    <span className="font-icon icon-apple" />
                    <span>MUSIC</span>
                  </div>
                  <Row>
                    <Col lg={9} md={9} xs={9}>
                      <p className="promotion_description fontSize_3 pad6 onlyTopPad">
                        <span dangerouslySetInnerHTML={{ __html: promotion.badgeText }} />
                        &nbsp;
                        {promotion.badgeToolTipUrl &&
                        <a
                          role="button"
                          className="textUnderline color_FFF"
                          onClick={this.openAppleMusicModal}
                        >
                        Learn more
                        </a>
                        }
                      </p>
                    </Col>
                  </Row>
                  <Button
                    className="transparent button large margin36 onlyTopMargin"
                    onClick={enrollForAppleMusic}
                    analyticstrack="appleMusic-enroll-CTA"
                  >
                    {cqContent.label.DT_OD_CONFIRMATION_APPLE_MUSIC_ENROLL}
                  </Button>
                </Col>
                <Modal
                  mounted={this.state.showAppleMusicModal}
                  closeFn={this.closeAppleMusicModal}
                  style={{ background: 'white', width: '600px' }}
                  underlayColor="#000"
                  showCloseX
                >
                  <iframe
                    src={promotion.badgeToolTipUrl}
                    className="width100 pad20"
                    style={{ height: '70vh', border: '0' }}
                  />
                </Modal>
              </Row>
            </Col>
          )}
        </Row>
      </div>
    );
  }
}

SaveContent.propTypes = {
  cqContent: PropTypes.object,
  devices: PropTypes.object,
  appleMusicEnrollUrl: PropTypes.string,
};
export default SaveContent;
