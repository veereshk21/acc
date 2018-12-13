import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Button from '../../common/Button/Button';
import * as Constants from '../constants';
import { hashHistory } from './../../store';

import Title from '../../common/Title/Title';
import Loader from '../../common/Loader/Loader';

export default class AnnualUpgradeWarning extends Component {
  constructor() {
    super();
    this.state = {
      loader: false,
    };
    this.onButtonClick = this.onButtonClick.bind(this);
    this.onCancelClick = this.onCancelClick.bind(this);
  }
  onButtonClick() {
    const { submitAgreement, selectedMDN, ajaxCallUrl } = this.props;
    this.state.loader = true;
    if (selectedMDN.loanInfo) {
      hashHistory.push({
        pathname: 'dppAgreement',
        query: {
          mdn: `${selectedMDN.mtn}`,
        },
      });
      this.setState({
        loader: true,
      });
    } else {
      submitAgreement(selectedMDN.mtn, Constants.UPGRADE, selectedMDN.deviceType, selectedMDN.brand, selectedMDN.deviceId, ajaxCallUrl);
      this.setState({
        loader: true,
      });
    }
  }
  onCancelClick() {
    hashHistory.push('/');
  }
  render() {
    if (this.state.loader) {
      return (<Loader />);
    }
    const { selectedMDN } = this.props;
    return (
      <Grid className="pad32">
        <Row >
          <Col xs={12}>
            <Title className="fontSize_8" style={{ fontSize: '10.5vw', lineHeight: '1.1' }}>{selectedMDN.annualUpgradeMessage.title}</Title>
            <p className="margin18 onlyTopMargin">{selectedMDN.annualUpgradeMessage.subTitle}</p>
          </Col>

        </Row>
        <Row className="footerFixed">
          <Col xs={12}>
            <Button className="button width40 secondary margin6 onlySideMargin" analyticstrack="annual-upgrade-cancel" onClick={this.onCancelClick} >{selectedMDN.annualUpgradeMessage.cancelButtonText}</Button>
            <Button className="button width40 margin6 onlySideMargin" analyticstrack="annual-upgrade-accept" onClick={this.onButtonClick}>{selectedMDN.annualUpgradeMessage.acceptButtonText}</Button>
          </Col>
        </Row>
      </Grid>
    );
  }
}

AnnualUpgradeWarning.propTypes = {
  selectedMDN: PropTypes.object,
  submitAgreement: PropTypes.func,
  ajaxCallUrl: PropTypes.string,
};
