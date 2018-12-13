import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { hashHistory } from './../../store';
import Loader from '../../common/Loader/Loader';
import Button from '../../common/Button/Button';

export default class learnMoreFamilyModal extends Component {
  static propTypes = {
    isFetching: PropTypes.bool,
    cqLabel: PropTypes.object,
    congratsData: PropTypes.object,
    // cqHTML: PropTypes.object,
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    if (!this.props.congratsData) {
      hashHistory.push('/');
    }
  }

  render() {
    const { cqLabel, congratsData } = this.props;
    return (
      <Grid className="pad12">
        {this.props.isFetching === true && <Loader />}
        <Row className="pad18 onlyTopPad">
          <Col xs={12}>
            <h2
              dangerouslySetInnerHTML={{
                __html: cqLabel.get('OD_SMART_FAMILY_PARENTING_CONDITIONS'),
              }}
            />
            <p
              className="margin10 noSideMArgin"
              dangerouslySetInnerHTML={{
                __html: cqLabel.get('OD_SMART_FAMILY_DOWNLOAD_LINK'),
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div className="footerFixed">
              <div className="centerBlock textAlignCenter">
                <Button
                  type="button"
                  className="button width90 primary margin12 onlyRightMargin "
                  role="button"
                  onClick={() => { window.location.href = congratsData.redirectUrl; }}
                  analyticstrack="smartFamily-congratsClsBtn"

                >
                  {cqLabel.get('OD_SMART_FAMILY_GOT_IT_BTN')}
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}
