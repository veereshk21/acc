import { Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React from 'react';

import CheckedDevices from './CheckedDevices';
import PlanDetails from './PlanDetails';

const RightSection = (props) => {
  const showChecked = props.showCheckedDevices && props.showCheckedDevices.output;
  // const showCheckedFromPage = props.pageJSON.checkedDevices;
  let deviceDetails;
  if (showChecked) {
    deviceDetails = props.showCheckedDevices.output;
  }
  const { cqJSON } = props;

  return (
    <Col sm={6} md={6} lg={4}>
      {props.pageJSON.planDetails &&
        <PlanDetails planDetails={props.pageJSON.planDetails} cqJSON={cqJSON} />
      }
      {showChecked &&
        <CheckedDevices
          deviceDetail={deviceDetails}
          cqJSON={cqJSON}
          showDeviceId={props.showDeviceId}
          showSimId={props.showSimId}
          removeDevice={props.removeDevice}
          removeDeviceUrl={props.pageJSON.removeDeviceUrl}
        />
      }
    </Col>
  );
};

// Eslint is acting crazy, not correctly detecting showDeviceId & showSimId
RightSection.propTypes = {
  cqJSON: PropTypes.object,
  showDeviceId: PropTypes.bool, // eslint-disable-line
  showSimId: PropTypes.bool, // eslint-disable-line
  showCheckedDevices: PropTypes.object,
  pageJSON: PropTypes.object,
  removeDevice: PropTypes.func,
};

export default RightSection;
