import { reduxForm } from 'redux-form/immutable';
import { Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React from 'react';

// import Button from '../../common/Button/Button';
// import Modal from './../../common/Modal/index';
// import RadioButton from './../../common/RadioButton';
// import Notification from '../../common/Notification/Notification';

import AsyncComponent from '../../common/AsyncComponent';

const Button = AsyncComponent(() => import('../../common/Button/Button'));
const Modal = AsyncComponent(() => import('./../../common/Modal/index'));
const Notification = AsyncComponent(() => import('../../common/Notification/Notification'));
const RadioButton = AsyncComponent(() => import('./../../common/RadioButton'));


const TransferUpgradeOptions = (props) => (
  <Modal closeFn={props.hideTransferOverlay}>
    <div className="pad20">
      <Row className="pad18">
        <h2>
        Transfer your upgrade to another device.
        </h2>
      </Row>
      {(!props.transferTakerMTNs || props.transferTakerMTNs.length === 0) &&
        <Row className="pad18">
          <div className="fontSize_5">
            Your account Doesn&apos;t have any eligible mtn for transfer.
          </div>
        </Row>
      }
      {props.transferTakerMTNs && props.transferTakerMTNs.length > 0 &&
        <Row className="pad18">
          <div className="fontSize_5">
            Transfer your upgrade eligibility from { props.mdnDetails.displayMtn } - { props.mdnDetails.nickname } to a
            device listed below.
          </div>
        </Row>
      }
      {props.transferTakerMTNs && props.transferTakerMTNs.length > 0 &&
        props.transferTakerMTNs.map((row, i) => (
          <Row style={{ margin: '0 0 18px' }}>
            <Col xs={1} className="pad12 onlyTopPad">
              <Row center="xs">
                {<RadioButton
                  id={props.transferTakerMTNs[i]}
                  name="mdnTransferSelection"
                  value={props.transferTakerMTNs[i]}
                  analyticstrack="select-mdnTransferSelection-radio"
                />}
              </Row>
            </Col>
            <Col xs={1} className="pad12 onlyTopPad bold fontSize_5 margin1 onlyTopMargin">
              <Row center="xs">
                { props.transferTakerMTNs[i] }
              </Row>
            </Col>
          </Row>
        ))
      }
      {props.transferTakerMTNs && props.transferTakerMTNs.length > 0 && props.transferMdnDetails && props.transferMdnDetails.upgradeEligibilityDate && props.mdnDetails.upgradeEligibilityDate &&
        <div>
          <Row className="fontSize_5" style={{ padding: '12px 18px 6px' }}>{props.cqJSON.label.DT_OD_MDN_NEXT_UPGRADE}:&nbsp;<span className="bold">{props.mdnDetails.upgradeEligibilityDate}</span></Row>
          <Row className="fontSize_5" style={{ padding: '6px 18px 18px' }}>{props.cqJSON.label.DT_OD_MDN_CONTRACT_ENDSM}:&nbsp;<span className="bold">{props.transferMdnDetails.upgradeEligibilityDate}</span></Row>
        </div>
      }
      {props.transferTakerMTNs && props.transferTakerMTNs.length > 0 &&
        <div>
          <Row style={{ margin: 0 }}>
            <Notification type="error" message={props.cqJSON.html.DT_OD_MDN_ALWAYS_ELIGIBLE_TRANSFER_MESSAGE} noClose />
          </Row>
        </div>
      }
      <Row className="pad18 noSidePad" xs={12} style={{ width: '100%' }}>
        <hr style={{ border: '1px solid #000', width: '100%' }} />
      </Row>
      <Row className="transferButton">
        <Button
          type="button"
          className="button primary"
          analyticstrack="select-transferUpgrade-mtnInfo-CTA"
          onClick={props.tranferMtn.bind(this, props.mdnDetails)}
          disabled={props.disable}
        >{props.cqJSON.label.DT_OD_MDN_UPGRADE_INFO_CTA_LABEL}
        </Button>
      </Row>
    </div>
  </Modal>
);

TransferUpgradeOptions.propTypes = {
  mdnDetails: PropTypes.object,
  cqJSON: PropTypes.object,
  hideTransferOverlay: PropTypes.func,
  tranferMtn: PropTypes.func,
  transferTakerMTNs: PropTypes.array,
  disable: PropTypes.bool,
  transferMdnDetails: PropTypes.object,
};

export default reduxForm({
  form: 'mdnTransferSelection',
  // validate,
})(TransferUpgradeOptions);
