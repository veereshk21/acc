import { Grid, Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { hashHistory } from './../../store';
import * as Constants from '../constants';
import AsyncComponent from '../../common/AsyncComponent';

import deviceImgNA from '../../../images/device_placeHolder.svg';

const Loader = AsyncComponent(() => import('../../common/Loader/Loader'));
const Button = AsyncComponent(() => import('../../common/Button/Button'));

export default class AnnualUpgrade extends Component {
  static propTypes = {
    selectedMDN: PropTypes.object,
    submitAgreement: PropTypes.func,
  };

  constructor() {
    super();
    this.state = {
      loader: false,
    };
    this.onButtonClick = this.onButtonClick.bind(this);
    this.onCancelClick = this.onCancelClick.bind(this);
  }
  onButtonClick() {
    this.state.loader = true;
    if (this.props.selectedMDN.loanInfo) {
      hashHistory.push({
        pathname: 'dppAgreement',
        query: {
          mdn: `${this.props.selectedMDN.mtn}`,
        },
      });
      this.setState({
        loader: true,
      });
    } else {
      this.props.submitAgreement(this.props.selectedMDN.mtn, Constants.UPGRADE, this.props.selectedMDN.deviceType, this.props.selectedMDN.brand, this.props.selectedMDN.deviceId);
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
      <section className="section group grid vh80 pad20 onlySidePad">
        <Grid fluid>
          <Row>
            <Col sm={4} md={4} lg={4}>
              <div className="section group min-height500">
                <Row className="pad36 onlyTopPad height100" center="xs">
                  <Col xs={12} className="height100">
                    <div className="margin5 onlyBottomMargin">
                      <Row className="fontSize_5 bold">
                        {selectedMDN.nickname}&apos;s <span dangerouslySetInnerHTML={{ __html: selectedMDN.displayDeviceName }} />
                      </Row>
                      <Row className="pad10 onlyBottomPad fontSize_4">
                        <span className="pad5 block onlyTopPad">{selectedMDN.displayMtn}</span>
                      </Row>
                    </div>

                    <img src={(selectedMDN.imageUrl !== null) ? `${selectedMDN.imageUrl}&wid=165&hei=300` : deviceImgNA} style={{ maxHeight: '300px' }} alt="Selected Device" className={(selectedMDN.imageUrl === null) ? 'mtnDefaultImg maxWidth100 height100' : 'maxWidth100 height100'} />
                  </Col>
                </Row>
              </div>
            </Col>
            <Col sm={8} md={8} lg={8}>
              <div>
                <Row className="pad24 margin36 onlyTopMargin clearfix noTopPad">
                  <Col xs={12} className="">
                    <p className="fontSize_10 bold">{selectedMDN.annualUpgradeMessage.title}</p>
                    <p className="fontSize_4 margin10 onlyTopMargin">{selectedMDN.annualUpgradeMessage.subTitle}</p>
                    <div className="margin48 onlyTopMargin">
                      <Button
                        className="button secondary large margin12 onlyRightMargin"
                        onClick={this.onCancelClick.bind(this)}
                        analyticstrack="select-annualUpgradeUpgrade-cancel-CTA"
                      >{selectedMDN.annualUpgradeMessage.cancelButtonText}
                      </Button>
                      <Button
                        className="button primary large"
                        analyticstrack="select-annualUpgradeUpgrade-accept-CTA"
                        onClick={this.onButtonClick}
                      >{selectedMDN.annualUpgradeMessage.acceptButtonText}
                      </Button>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Grid>
      </section>
    );
  }
}
