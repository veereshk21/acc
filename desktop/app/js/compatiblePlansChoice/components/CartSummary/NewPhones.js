import { Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React from 'react';
import { getDeviceType } from '../../../common/Helpers/';

const NewPhones = (props) => (
  <div>
    {props.updatePlanPromptInfo && props.updatePlanPromptInfo.newPhones && props.updatePlanPromptInfo.newPhones.length > 0 && (
      <div className="margin20 noSideMargin">
        {!props.mixAndMaxEnabled &&
          <h2 className="h5 orderSummarySidebar_mainHeading color_00 fontSize_7 bold">
            {props.cq.label.DT_OD_NEW_PHONES_TEXT}
          </h2>
        }

        {props.updatePlanPromptInfo.newPhones.map((plan, index) => (
          <Row className="margin20 noSideMargin fontSize_4" key={'newPhone-' + index}>
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
      </div>)}
  </div>
);


NewPhones.propTypes = {
  updatePlanPromptInfo: PropTypes.object,
  cq: PropTypes.object,
  mixAndMaxEnabled: PropTypes.bool,
};

export default NewPhones;
