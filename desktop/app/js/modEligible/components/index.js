import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Grid, Row } from 'react-flexbox-grid';
// import { Link } from 'react-router-dom';
import Loader from '../../common/Loader/Loader';

import AsyncComponent from '../../common/AsyncComponent';
const DisplayContent = AsyncComponent(() => import('./displayContent'));
const Modal = AsyncComponent(() => import('../../common/Modal'));

class modEligible extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this.nextCTA = this.nextCTA.bind(this);
  }

  nextCTA() {
    if (this.props.isModEligible) {
      this.setState({ showModal: true });
    } else {
      this.props.asyncFetch();
      this.setState({ showModal: false });
      window.location = this.props.redirectionURL;
    }
  }

  renderModal() {
    const { cqContent, redirectionURL, noThanksURL } = this.props;
    return (
      <Modal
        mounted={this.state.showModal}
        style={{ background: 'white', width: '500px' }}
        closeFn={() => { this.setState({ showModal: false }); }}
        showCloseX
        underlayColor="rgba(0,0,0,0.8)"
      >
        <Grid>
          <Row className="margin20 noSideMargin">
            <Col xs={12}>
              <p className="h2">{cqContent.label.DT_OD_MOD_MODAL_TITLE_TEXT}</p>
              <p className="fontSize_5 margin10 noSideMargin">{cqContent.label.DT_OD_MOD_MODAL_DESCRIPTION_TEXT}</p>
            </Col>
          </Row>
          <Row className="margin20 noSideMargin">
            {redirectionURL && <Col xs={6} className="textAlignLeft">
              <button
                className="button width100 primary margin10 onlyRightMargin"
                onClick={() => {
                  this.props.asyncFetch();
                  this.setState({ showModal: false });
                  window.location = redirectionURL;
                }}
                analyticstrack="interested-confirm-cta"
              >
                <span>{cqContent.label.DT_OD_MOD_MODAL_YES_CTA}</span>
              </button>
            </Col>}
            {noThanksURL && <Col xs={6} className="textAlignRight">
              <button
                className="button width100 secondary margin10 onlyLeftMargin"
                onClick={() => {
                  this.props.asyncFetch();
                  window.location = noThanksURL;
                }}
                analyticstrack="not-interested-cta"
              >
                <span>{cqContent.label.DT_OD_MOD_NO_THANKS_CTA}</span>
              </button>
            </Col>}
          </Row>
        </Grid>
      </Modal>
    );
  }

  render() {
    const { cqContent, isFetching, noThanksURL, noThanksText, redirectionURL, ctaText } = this.props;
    return (
      <section className="positionRelative pad15 onlySidePad">
        {(isFetching === true) && <Loader />}
        { this.renderModal() }
        <Row className="margin20 noSideMargin">
          <Col xs={12}>
            <DisplayContent {...this.props} />
          </Col>
        </Row>
        {(redirectionURL || noThanksURL) && <Row className="margin20 noSideMargin">
          {redirectionURL && <Col xs={3}>
            <button
              className="button width100 primary"
              onClick={this.nextCTA}
              analyticstrack="got-it-confirm-cta"
            >
              {ctaText}
            </button>
          </Col>}
          {noThanksURL && <Col xs={4} className="margin10 onlySideMargin">
            <button
              className="button width100 secondary"
              onClick={() => {
                this.props.asyncFetch();
                window.location = noThanksURL;
              }}
              analyticstrack="no-thanks-cta"
            >
              {noThanksText || cqContent.label.DT_OD_MOD_NO_THANKS_CTA}
            </button>
          </Col>}
        </Row>}
      </section>
    );
  }
}

export default modEligible;

modEligible.propTypes = {
  asyncFetch: PropTypes.func,
  cqContent: PropTypes.object,
  isFetching: PropTypes.bool,
  redirectionURL: PropTypes.string,
  noThanksURL: PropTypes.string,
  ctaText: PropTypes.string,
  isModEligible: PropTypes.bool,
  noThanksText: PropTypes.string,
};
