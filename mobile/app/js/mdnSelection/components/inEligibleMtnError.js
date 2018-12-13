import React from 'react';
import { PropTypes } from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Button from '../../common/Button/Button';
import Title from '../../common/Title/Title';

export default class InEligibleMtnError extends React.Component {
  constructor(props) {
    super(props);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onButtonClick() {
    window.location.href = window.location.pathname;
  }

  render() {
    return (
      <Grid className="pad32">
        <Row >
          <Col xs={12}>
            <Title className="fontSize_8" style={{ fontSize: '10.5vw', lineHeight: '1.1' }}>{this.props.cqJSON.label.OD_MDN_UPGRADE_INELIGIBLE}</Title>
            <p className="margin18 onlyTopMargin">{this.props.cqJSON.label.subTitle}</p>
          </Col>
          <Col xs={12} className="footerFixed">
            <Button className="button secondary width40" onClick={this.onButtonClick} analyticstrack="ineligible-mtn">{this.props.cqJSON.label.OD_MDN_BACK_CTA}</Button>
          </Col>
        </Row>
      </Grid>
    );
  }
}
InEligibleMtnError.propTypes = {
  cqJSON: PropTypes.object,
};

