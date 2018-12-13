import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Parser from 'html-react-parser';
import Loader from '../../common/Loader/Loader';
import Title from '../../common/Title/Title';


class CpcInterceptPrompt extends Component { // eslint-disable-line
  render() {
    const {
      cpcIntercept, cqContent, isFetching,
    } = this.props;

    const isRestrictedZipCode = (typeof cpcIntercept.restrictedZipcodeMessage !== typeof undefined && cpcIntercept.restrictedZipcodeMessage.toString().trim().length > 0);

    return (
      <Grid className="pad32">
        {isFetching && <Loader />}
        <Row>
          <Col xs={12}>
            <Title className="fontSize_8" style={{ fontSize: '10.5vw', lineHeight: '1.1' }}>{isRestrictedZipCode ? cqContent.label.OD_CPC_INTERCEPT_PROMPT_RES_HEADER : cqContent.label.OD_CPC_INTERCEPT_PROMPT_HEADER}</Title>
          </Col>
          <Col xs={12} className="margin24 onlyTopMargin">
            {!isRestrictedZipCode && <p>{cqContent.label.OD_CPC_INTERCEPT_DESC && Parser(cqContent.label.OD_CPC_INTERCEPT_DESC)}</p>}
            {isRestrictedZipCode && <p dangerouslySetInnerHTML={{ __html: cpcIntercept.restrictedZipcodeMessage }} />}
          </Col>
          <Col xs={12} className="footerFixed">
            {cpcIntercept.declineURL &&
              <a
                className="width40 secondary button margin6"
                href={cpcIntercept.declineURL}
                analyticstrack="decline-cpc-offer"
              >
                {cqContent.label.OD_CPC_INTERCEPT_DECLINE_BTN}
              </a>
            }
            <a
              className="primary width40 margin6 button"
              href={cpcIntercept.acceptURL}
              analyticstrack="accept-cpc-offer"
            >
              {cqContent.label.OD_CPC_INTERCEPT_ACCEPT_BTN}
            </a>
          </Col>
        </Row>
      </Grid>
    );
  }
}

CpcInterceptPrompt.propTypes = {

  cqContent: PropTypes.object,
  cpcIntercept: PropTypes.object,
  isFetching: PropTypes.bool,
};

export default CpcInterceptPrompt;
