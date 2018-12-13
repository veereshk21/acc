import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import AsyncComponent from '../../common/AsyncComponent';
import Button from '../../common/Button/Button';
// import fios from '../../../images/fios-logo.jpg';
/* Page Components */
import OrderSummary from './orderSummary/orderSummary';
import SaveContent from './saveContent/saveContent';
import VzProtect from './vzProtect';
/* Page Containers */
import Header from '../containers/header/header';

const InfoGrid = AsyncComponent(() => import('../containers/infoGrid/infoGrid'));
class Confirmation extends React.Component {
  componentDidMount() {
    /*
     FETCH RECOMMENDED ACCESSORIES
     */
    if (this.props.recAccessoriesEnabled && this.props.accessoryGWURL) this.props.getRecommendedAcc(this.props.accessoryGWURL);
  }

  render() {
    const { cqContent, isHLLPlanInOrder, devices, appleMusicEnrollUrl, checkoutStates } = this.props;
    return (
      <div>
        <div className="margin20 onlySideMargin confirmation">
          <Header />
          {checkoutStates.vzProtect &&
            <VzProtect
              cqContent={cqContent}
              vzProtectMultiDevice={checkoutStates.vzProtectMultiDevice}
            />
          }
          {!this.props.standaloneAccessories &&
            <SaveContent
              cqContent={cqContent}
              isHLLPlanInOrder={isHLLPlanInOrder}
              devices={devices}
              appleMusicEnrollUrl={appleMusicEnrollUrl}
            />
          }
          <InfoGrid />
          <OrderSummary {...this.props} />
          {isHLLPlanInOrder && <Row className="fios pad20">
            <Col lg={6} md={6} className="fios_leftPane">
              <div className="fios_leftPane_header margin6 onlyBottomMargin">
                <h1 className="h2" dangerouslySetInnerHTML={{ __html: cqContent.label.DT_OD_CONFIRMATION_FIOS_HEADER }} />
                <p className="fontSize_2 margin6 onlyTopMargin">{cqContent.label.DT_OD_CONFIRMATION_FIOS_INFO}</p>
              </div>
              <div className="fios_leftPane_info margin18 noSideMargin">
                <div className="fios_leftPane_info_internet margin12 noSideMargin">
                  <h2 className="fontSize_2" dangerouslySetInnerHTML={{ __html: cqContent.label.DT_OD_CONFIRMATION_FIOS_INTERNET }} />
                  <p className="fontSize_2">{cqContent.label.DT_OD_CONFIRMATION_FIOS_INTERNET_DESCRIPTION}</p>
                </div>
                <div className="fios_leftPane_info_tv margin12 noSideMargin">
                  <h2 className="fontSize_2" dangerouslySetInnerHTML={{ __html: cqContent.label.DT_OD_CONFIRMATION_FIOS_TV }} />
                  <p className="fontSize_2">{cqContent.label.DT_OD_CONFIRMATION_FIOS_TV_DESCRIPTION}</p>
                </div>
                <div className="fios_leftPane_info_voice margin12 noSideMargin">
                  <h2 className="fontSize_2" dangerouslySetInnerHTML={{ __html: cqContent.label.DT_OD_CONFIRMATION_FIOS_VOICE }} />
                  <p className="fontSize_2">{cqContent.label.DT_OD_CONFIRMATION_FIOS_VOICE_DESCRIPTION}</p>
                </div>
              </div>
              <div className="fios_leftPane_logo margin36 noSideMargin">
                {/* <img className="maxWidth100" src={fios} alt="fios" /> */}
              </div>
            </Col>
            <Col lg={6} md={6} className="fios_rightPane textAlignRight">
              <Button
                className="secondary button large"
                onClick={this.checkFiosAvailability}
                analyticstrack="fios-availability-CTA"
              >
                {cqContent.label.DT_OD_CONFIRMATION_FIOS_AVAILABILITY}
              </Button>
            </Col>
          </Row>
          }
          <div className="affliates">
            <img src={this.props.cjmTagUrl} alt="Hidden Affliate" height="1" width="1" style={{ display: 'none' }} />
            <iframe src={this.props.pepperJamTagUrl} title="pepperJamTagUrl" width="1" height="1" frameBorder="0" style={{ display: 'none' }} />
          </div>
        </div>

      </div>
    );
  }
}


Confirmation.propTypes = {
  cqContent: PropTypes.object,
  cjmTagUrl: PropTypes.string,
  pepperJamTagUrl: PropTypes.string,
  standaloneAccessories: PropTypes.bool,
  accessoryGWURL: PropTypes.string,
  getRecommendedAcc: PropTypes.func,
  recAccessoriesEnabled: PropTypes.bool,
  isHLLPlanInOrder: PropTypes.bool,
  devices: PropTypes.object,
  appleMusicEnrollUrl: PropTypes.string,
  checkoutStates: PropTypes.object,
};

export default Confirmation;
