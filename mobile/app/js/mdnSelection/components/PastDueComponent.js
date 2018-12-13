import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import Button from '../../common/Button/Button';
import Title from '../../common/Title/Title';


export default class PastDueBalance extends Component { // eslint-disable-line
  render() {
    const { cqContent } = this.props;

    const pastDueHeader = cqContent.html.OD_PAST_DUE_BALANCE_TITLE.replace('%pastDuePrice%', this.props.pastDueAmount);
    return (
      <Grid className="pad32">
        <Row >
          <Col xs={12}>
            <Title className="fontSize_8" style={{ fontSize: '10.5vw', lineHeight: '1.1' }}><span dangerouslySetInnerHTML={{ __html: pastDueHeader }} /></Title>
          </Col>
          <Col xs={12}>
            <p className="margin12 noSideMargin">{cqContent.label.OD_PAST_DUE_BALANCE_TEXT_ONE}</p>
            <p className="margin12 noSideMargin">{cqContent.label.OD_PAST_DUE_BALANCE_TEXT_SECOND}</p>
            <p className="margin12 noSideMargin">{cqContent.label.OD_PAST_DUE_BALANCE_TEXT_THIRED}</p>
          </Col>
          <Col xs={12} className="footerFixed">
            <form method="POST" action={this.props.nextLink} name="pastDueForm_MDN">
              <Button
                type="submit"
                className="button margin12 margin12 onlySideMargin large"
                analyticstrack="proceed-past-due"
              >{cqContent.label.OD_PAST_DUE_BALANCE_PROCEED_CTA}
              </Button>
            </form>
          </Col>
        </Row>

      </Grid>
    );
  }
}


PastDueBalance.propTypes = {
  cqContent: PropTypes.object,
  nextLink: PropTypes.string,
  pastDueAmount: PropTypes.string,
};
