import { Grid, Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React from 'react';

import AsyncComponent from '../../common/AsyncComponent';

const Loader = AsyncComponent(() => import('../../common/Loader/Loader'));
const Anchor = AsyncComponent(() => import('./../../common/A/A'));
const Button = AsyncComponent(() => import('../../common/Button/Button'));

export default class InEligible extends React.Component {
  static propTypes = {
    inEligibleDetails: PropTypes.object,
    onButtonClick: PropTypes.func,
    loader: PropTypes.boolean,
    cqJSON: PropTypes.object,
    openAALPendingModal: PropTypes.func,
    selectedMDN: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.linkClass = (this.props.inEligibleDetails.linkText ? '' : 'is-hidden');
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onButtonClick() {
    this.props.onButtonClick(`${this.props.inEligibleDetails.cancelPlanChangeURL}`);
  }

  render() {
    const { inEligibleDetails, loader, cqJSON, selectedMDN } = this.props;
    return (
      <Grid fluid>
        {loader && <Loader />}
        <Row className="pad20 noSidePad">
          {(selectedMDN && (selectedMDN.inEligibleCode === '10' || selectedMDN.inEligibleCode === 'PENDING_SWITCH_ORDER')) ?
            <Col md={12} xs={12}>
              <Row>
                <Col xs={9}>
                  <h1>{selectedMDN.inEligibleDetails.title}</h1>
                </Col>
              </Row>
              <Row className="margin30 noSideMargin">
                <Col md={12} xs={12}>
                  <p>{selectedMDN.inEligibleDetails.subTitle}</p>
                  <Button
                    className="button primary margin25 noSideMargin"
                    analyticstrack="select-inEligible-doNotCancelPlanChange-CTA"
                    onClick={() => {
                      window.location.href = selectedMDN.inEligibleDetails.doNotCancelPlanChangeURL;
                    }}
                  >
                    {cqJSON.label.DT_OD_MDN_GOT_IT}
                  </Button>
                </Col>
              </Row>
            </Col>
            :
            <Col md={12} xs={12}>
              <Row>
                <Col xs={9}>
                  <h1>{inEligibleDetails.title}</h1>
                </Col>
              </Row>
              <Row className="margin30 noSideMargin">
                <Col md={12} xs={12}>
                  <Row>
                    <Col md={2} xs={2} className="bold">{cqJSON.label.DT_OD_MDN_PENDING_AAL_ORDER_NO_LABEL}</Col>
                    <Col md={10} xs={10}>{inEligibleDetails.orderNumber}</Col>
                  </Row>
                  <Row>
                    <Col md={2} xs={2} className="bold">{cqJSON.label.DT_OD_MDN_PENDING_AAL_LINES_LABEL}</Col>
                    <Col md={10} xs={10}>{inEligibleDetails.dateSubmitted}</Col>
                  </Row>
                  <Row>
                    <Col md={2} xs={2} className="bold">{cqJSON.label.DT_OD_MDN_PENDING_AAL_LINES_LABEL}</Col>
                    <Col md={10} xs={10}>{inEligibleDetails.lines}</Col>
                  </Row>
                  <Row>
                    <Col md={2} xs={2} className="bold">{cqJSON.label.DT_OD_MDN_PENDING_AAL_DESC}</Col>
                    <Col md={10} xs={10}>{inEligibleDetails.description}</Col>
                  </Row>
                  <Row>
                    <Col md={2} xs={2} className="bold">{cqJSON.label.DT_OD_MDN_PENDING_AAL_DEVICES_LABEL}</Col>
                    <Col md={10} xs={10}>{inEligibleDetails.devices}</Col>
                  </Row>
                </Col>
              </Row>
              <Row className="margin30 noSideMargin">
                <Col xs={12}>{inEligibleDetails.subTitle}</Col>
              </Row>
              <Row>
                <Anchor href={inEligibleDetails.doNotCancelPlanChangeURL} className="color_333 textDecUnderline fontSize_4 margin18 onlyRightMargin pad15 onlyTopPad" analyticstrack="select-pending-details-noThanks-link"><span>{cqJSON.label.DT_OD_MDN_PENDING_AAL_NO_THANKS_LABEL}</span></Anchor>
                <Button className={inEligibleDetails.accountMember ? 'disabled' : ''} disabled={inEligibleDetails.accountMember ? 'disabled' : ''} onClick={this.props.openAALPendingModal} analyticstrack="select-pending-details-cancel-CTA">{cqJSON.label.DT_OD_MDN_PENDING_AAL_CANCEL_BUTTON}</Button>
              </Row>
            </Col>
          }
        </Row>
      </Grid>
    );
  }
}
