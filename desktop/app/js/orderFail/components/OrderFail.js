import { Col, Row } from 'react-flexbox-grid';
import PropsTypes from 'prop-types';
import React from 'react';

const OrderFail = (props) => (
  <Row>
    <Col xs={12}>
      <div className=" textAlignLeft width100 pad24 noSidePad noTopPad">
        <h1 className="fontSize_13 pad18 noSidePad" style={{ lineHeight: '1.2' }}>{props.details.title}</h1>
        <div className="pad12 onlyTopPad" dangerouslySetInnerHTML={{ __html: props.details.titleDescription }} />
      </div>
    </Col>
    <Row className="width100 pad36 noSidePad">
      <Col xs={3}>
        <a href={'tel:' + props.details.telephone} analyticstrack="telephone-cta" className="primary button large bold">{props.details.buttonText}</a>
      </Col>
    </Row>
  </Row>
);

OrderFail.propTypes = {
  details: PropsTypes.object,
};

export default OrderFail;
