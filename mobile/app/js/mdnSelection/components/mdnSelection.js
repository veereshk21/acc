import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { hashHistory } from './../../store';
import MDNDetails from './MDNDetails';
import Title from '../../common/Title/Title';
import HorizontalRule from '../../common/HorizontalRule';
import BYODComponent from './BringYourOwnDevice';
import AddALine from './AddALine';

export default class MDNSelectionComponent extends React.Component {
  constructor(props) {
    super(props);
    this.onAddLineInit = this.onAddLineInit.bind(this);
    this.onAALClick = this.onAALClick.bind(this);
  }

  onAALClick(event, isByod = false) {
    event.preventDefault();
    console.log('AAL clicked!!');
    this.props.initAAL(this.props.submitAddALineUrl, isByod);
  }

  onAddLineInit(event, isByod = false) {
    const inEligibleDetails = this.props.accountLevelInEligibleDetails ? (this.props.accountLevelInEligibleDetails.get('accountLevelAALInEligibleDetails') !== null && this.props.accountLevelInEligibleDetails.get('accountLevelEUPInEligibleDetails') !== null) : false;
    const _AALInEligibleDetails = inEligibleDetails ? this.props.accountLevelInEligibleDetails.get('accountLevelAALInEligibleDetails').toJS() : null;
    if (_AALInEligibleDetails) {
      if (_AALInEligibleDetails.accountLevelInEligibleCode === 'PENDING_ORDER' || _AALInEligibleDetails.accountLevelInEligibleCode === 'PENDING_SWITCH_ORDER') {
        hashHistory.push('/pendingOrder');
      } else {
        hashHistory.push('/limitExceeded');
      }
    }

    if (!inEligibleDetails) {
      this.props.initAAL(this.props.submitAddALineUrl, isByod);
    }
  }
  render() {
    const {
      mainTitle, mdnDetailsList, changeMDNSelectionView, changeSelectedMDN, submitAgreement, accountLevelInEligibleDetails, cqJSON, cartRedirect, aalAttr, ajaxCallSelectedMTN, getLoanInfoPreOrder, preOrderResponse, isByodAllowed,
    } = this.props;

    if (!mdnDetailsList) {
      return (<div />);
    }

    // Main view for MDN Selection, user can choose which device to upgrade
    return (
      <Grid className="noSidePad">
        <Row>
          <Col xs={12}>
            <Title className="pad24 noBottomPad">{mainTitle}</Title>
            <HorizontalRule margin="18px 0 0" />
          </Col>
        </Row>
        <div>
          <Row>
            {aalAttr.boxEnable && <AddALine cqJSON={cqJSON} aalAllowed={aalAttr.isAALAllowed} handleAALInit={this.onAddLineInit} />}
            {isByodAllowed && <BYODComponent cqJSON={cqJSON} aalAllowed={aalAttr.isAALAllowed} handleAALInit={this.onAddLineInit} />}
            {
              mdnDetailsList.map((mdnDetails, idx) => (
                <MDNDetails
                  key={`mdn-${idx}`}
                  mdnDetails={mdnDetails}
                  changeMDNSelectionView={changeMDNSelectionView}
                  changeSelectedMDN={changeSelectedMDN}
                  onMTNUpgrade={submitAgreement}
                  selectedMDN={this.props.selectedMDN}
                  accountLevelInEligibleDetails={accountLevelInEligibleDetails ? accountLevelInEligibleDetails.toJS() : null}
                  cqJSON={cqJSON}
                  cartRedirect={cartRedirect}
                  ajaxCallSelectedMTN={ajaxCallSelectedMTN}
                  getLoanInfoPreOrder={getLoanInfoPreOrder}
                  ajaxCallUrl={this.props.ajaxCallUrl}
                  preOrderResponse={preOrderResponse}
                />
              ))
            }
          </Row>
        </div>
      </Grid>
    );
  }
}

MDNSelectionComponent.propTypes = {
  mdnDetailsList: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  mainTitle: PropTypes.string,
  aalAttr: PropTypes.object,
  ajaxCallSelectedMTN: PropTypes.string,
  changeMDNSelectionView: PropTypes.func,
  changeSelectedMDN: PropTypes.func,
  submitAgreement: PropTypes.func,
  accountLevelInEligibleDetails: PropTypes.object,
  cqJSON: PropTypes.object,
  initAAL: PropTypes.func,
  submitAddALineUrl: PropTypes.string,
  selectedMDN: PropTypes.object,
  cartRedirect: PropTypes.string,
  ajaxCallUrl: PropTypes.string,
  getLoanInfoPreOrder: PropTypes.func,
  preOrderResponse: PropTypes.object,
  isByodAllowed: PropTypes.bool,
};
