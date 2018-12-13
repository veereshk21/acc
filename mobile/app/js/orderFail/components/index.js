
import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Title from '../../common/Title/Title';
import A from '../../common/A/A';

class OrderFail extends React.PureComponent {
  render() {
    const { details } = this.props;
    return (
      <Grid className="pad32">
        <Row>
          <Col xs={12}>
            <Title className="fontSize_6">{details.title}</Title>
            <p className="fontSize_1_3 margin18 onlyTopMargin">{details.titleDescription}</p>
          </Col>
          <Col xs={12} className="footerFixed">
            <A href={'tel:' + details.telephone} analyticstrack="orderfail-call-customer-care" className="primary button width40 bold">{details.buttonText}</A>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default OrderFail;
OrderFail.propTypes = {
  details: PropTypes.object,
};
