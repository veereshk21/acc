import { Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React from 'react';
import { getDeviceType } from '../../../common/Helpers/';

import { ZERO_PRICE } from './../../constants';

const UpgradedDevices = (props) => (
  <div>
    {props.updatePlanPromptInfo && props.updatePlanPromptInfo.upgradeDevices && props.updatePlanPromptInfo.upgradeDevices.length > 0 && (
      <div className="margin20 noSideMargin">
        {!props.mixAndMaxEnabled &&
          <h2 className="h5 orderSummarySidebar_mainHeading color_00 fontSize_7 bold">
            {props.cq.label.DT_OD_UPGRADED_DEVICES_TEXT}
          </h2>
        }
        {props.updatePlanPromptInfo.upgradeDevices.map((plan) => (
          <Row className="margin20 noSideMargin">
            <Col xs={8}>
              <p
                className="fontSize_7"
                dangerouslySetInnerHTML={{ __html: !props.mixAndMaxEnabled ? plan.deviceName : 'Line access for ' + getDeviceType(plan.deviceSorId) }}
              />
            </Col>
            <Col xs={4}>
              <p className="fontSize_7 textAlignRight margin24 onlyRightMargin pad15 onlyRightPad">
                ${(parseFloat(plan.discountCost).toFixed(2) !== ZERO_PRICE && parseFloat(plan.discountCost).toFixed(2) < parseFloat(plan.deviceCost).toFixed(2)) ?
                  plan.discountCost : plan.deviceCost
                }
              </p>
            </Col>
          </Row>
        ))}
      </div>
    )}
  </div>
);


UpgradedDevices.propTypes = {
  updatePlanPromptInfo: PropTypes.object,
  cq: PropTypes.object,
  mixAndMaxEnabled: PropTypes.bool,
};

export default UpgradedDevices;
