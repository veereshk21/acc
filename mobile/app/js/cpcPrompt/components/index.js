import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Grid, Row, Col } from 'react-flexbox-grid';
import Button from './../../common/Button/Button';
import Title from '../../common/Title/Title';

export default class CPCPrompt extends Component {
  constructor() {
    super();
    this.onContinueClick = this.onContinueClick.bind(this);
  }
  onContinueClick(event) {
    event.preventDefault();
    window.location.href = this.props.cpcPromptInfo.continueURL;
  }
  render() {
    const { cpcPromptInfo, cqJSON} = this.props;
    const disableOfferbtn = !(cqJSON.label.OD_CPC_ENABLE_OFFER_BTN === 'true');
    let displayOfferButton = null;
    if (cpcPromptInfo.continueURL) {
      displayOfferButton =
        (<Button className="secondary margin6 onlySideMargin" type="button" onClick={this.onContinueClick}>{cqJSON.label.OD_CPC_CONTINUE_BTN_CTC}</Button>);
    }
    let displayLearnMore = null;
    if (this.props.cpcPromptInfo.showLearnMore === true) {
      displayLearnMore = (<Link className="link" to="/showmore" analyticstrack="learn-more">Learn More</Link>);
    }

    return (
      <Grid className="pad32">
        <Row>
          <Col xs={12}>
            <Title className="fontSize_8" style={{ fontSize: '10.5vw', lineHeight: '1.1' }} dangerouslySetInnerHTML={{ __html: cpcPromptInfo.headerMessage }} />
          </Col>
          <Col xs={12}>
            <div className="pad24 noSidePad" dangerouslySetInnerHTML={{ __html: cpcPromptInfo.promptBody }} />
            
          </Col>

          <Col xs={12} className="footerFixed">
            <div className="pad24 textAlignLeft">
              {cqJSON.label.OD_CPC_LEGAL_COPY}{displayLearnMore}
            </div>
            {displayOfferButton}
            {(cqJSON.label.OD_CPC_ENABLE_OFFER_BTN === 'true') &&
              <form name="cpcRedirectForm" style={{ display: 'inline' }} method="POST" action={this.props.cpcPromptInfo.upgradeURL}>
                <input type="hidden" name="goToURL" value={this.props.cpcPromptInfo.goToURL} />
                <Button className="primary margin6 onlySideMargin" type="submit" disabled={disableOfferbtn}>{cqJSON.label.OD_CPC_UPGRADE_BTN_CTC}</Button>
              </form>}
          </Col>

       </Row>
      </Grid>
    );
  }
}
CPCPrompt.propTypes = {
  cpcPromptInfo: PropTypes.object,
  cqJSON: PropTypes.object,
};
