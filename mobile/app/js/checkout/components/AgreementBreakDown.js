/**
 * Created by mambig on 2/27/2017.
 */
import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import DeviceAgreement from './../components/DeviceAgreement';
import EdgeAgreement from './../components/EdgeAgreement';
import CPCAgreements from './../components/CPCAgreements';

const AgreementBreakDown = (props) => (

  <Row className="ensighten_agreementBreakDown noSideMargin">
    <Col xs={12}>
      <DeviceAgreement {...props} />
      <EdgeAgreement {...props} />
      <CPCAgreements {...props} />
    </Col>
  </Row>
);

export default AgreementBreakDown;
