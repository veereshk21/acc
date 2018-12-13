import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Title from '../../common/Title/Title';
import A from '../../common/A/A';


const FindMyDeviceWarning = (props) => (
  <Grid className="pad32">
    <Row>
      <Col xs={12}>
        <Title className="fontSize_8" style={{ fontSize: '10.5vw', lineHeight: '1.1' }}>{props.cqJSON.label.OD_MDN_TURN_OFF_IPHONE_TITLE}</Title>
        <p className="fontSize_1_3 margin18 onlyTopMargin">{props.cqJSON.label.OD_MDN_TURN_OFF_IPHONE_DESC}</p>
      </Col>
    </Row>
    <Row className="footerFixed">
      <Col xs={12}>
        <A className="button large width40" href={props.redirectURL} analyticstrack="upgrade-findmyphone-next">{props.cqJSON.label.OD_MDN_DPP_APPRAISAL_NEXT_CTA}</A>
      </Col>
    </Row>
  </Grid>
);
FindMyDeviceWarning.defaultProps = {
  redirectURL: '/error',
};
FindMyDeviceWarning.propTypes = {
  redirectURL: PropTypes.string,
  cqJSON: PropTypes.object,
};
