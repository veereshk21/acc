import { Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React from 'react';
import { getDeviceType } from '../../../common/Helpers/';

const OtherPhones = (props) => (
  <div>
    {props.updatePlanPromptInfo && props.updatePlanPromptInfo.existingPhones && props.updatePlanPromptInfo.existingPhones.length > 0 && (
      <div className="margin20 noSideMargin">
        {!props.mixAndMaxEnabled &&
          <h2 className="h5 orderSummarySidebar_mainHeading color_00 fontSize_7 bold">
            {props.cq.label.DT_OD_OTHER_PHONES_TEXT}
          </h2>
        }
        {props.updatePlanPromptInfo.existingPhones.map((plan) => (
          <Row className="margin20 noSideMargin fontSize_6">
            <Col xs={8}>
              <p
                className="fontSize_7"
                dangerouslySetInnerHTML={{ __html: !props.mixAndMaxEnabled ? plan.deviceName : 'Line access for ' + getDeviceType(plan.deviceSorId) }}
              />
            </Col>
            <Col xs={4}>
              <p className="fontSize_7 textAlignRight margin24 onlyRightMargin pad15 onlyRightPad">
                ${props.updatePlanPromptInfo.discount ? plan.discountCost : plan.deviceCost}
              </p>
            </Col>
          </Row>
        ))}
      </div>
    )}
  </div>
);


OtherPhones.propTypes = {
  updatePlanPromptInfo: PropTypes.object,
  cq: PropTypes.object,
  mixAndMaxEnabled: PropTypes.bool,
};

export default OtherPhones;
