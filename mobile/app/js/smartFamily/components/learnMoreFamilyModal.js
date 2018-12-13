import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import HorizontalRule from '../../common/HorizontalRule';
import BackButton from '../../common/BackButton/BackButton';
import Button from '../../common/Button/Button';
import Loader from '../../common/Loader/Loader';

import location from './../../../images/location.svg';
import notification from './../../../images/notification.svg';
import group from './../../../images/group.svg';
import securityKeyhole from './../../../images/security-keyhole.svg';
import pause from './../../../images/pause.svg';

export default class learnMoreFamilyModal extends Component {
  static propTypes = {
    isFetching: PropTypes.bool,
    termsModal: PropTypes.func,
    cqLabel: PropTypes.object,
    cqHTML: PropTypes.object,
    closeLearn: PropTypes.func,
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  termsModal() {
    this.setState({
      terms: true,
      learnMore: false,
    });
  }

  render() {
    const { cqLabel, cqHTML } = this.props;
    return (
      <Grid className="pad12 noSidePad">
        <Row className="noSideMargin">
          <Col xs={12} className="noSidePad">
            <BackButton to="/" onClick={this.props.closeLearn} />
          </Col>
        </Row>
        {this.props.isFetching === true && <Loader />}
        <Row className="noSideMargin pad24">
          <Col xs={12}>
            <h2 dangerouslySetInnerHTML={{ __html: cqHTML.get('OD_SMART_FAMILY_TITLE') }} />
            <p className="pad10 noSidePad" dangerouslySetInnerHTML={{ __html: cqHTML.get('OD_SMART_FAMILY_LEARN_MORE_TITLE') }} />
            <div className="margin10 noSideMargin">
              <Link role="link" to="/" className="link" onClick={this.props.termsModal} analyticstrack="smartFamily-LeranMore-TandC-link">
                {cqLabel.get('OD_SMART_FAMILY_TERMS_AND_CONDITIONS')}
              </Link>
            </div>
            <div className="margin10 noSideMargin">
              <a
                href="https://www.verizonwireless.com/support/verizon-smart-family-faqs/"
                target="_blank"
                className="pad5 noSidePad link"
                analyticstrack="smartFamily-LeranMore-faq-link"
              >
                {cqLabel.get('OD_SMART_FAMILY_FAQ_CONDITIONS')}
              </a>
            </div>
            <p className="margin20 noSideMargin ">{cqLabel.get('OD_SMART_FAMILY_TC_DATA')}</p>
            <HorizontalRule y={1} color="#000" />
            <div dangerouslySetInnerHTML={{ __html: cqHTML.get('OD_SMART_FAMILY_PROTECTION_TEXT') }} />
          </Col>
        </Row>

        <Row className="noSideMargin pad24">
          <Col xs={4}>
            <img src={notification} alt="Notification" height="65" />
          </Col>
          <Col xs={8} dangerouslySetInnerHTML={{ __html: cqHTML.get('OD_SMART_FAMILY_NOTIFICATION_TEXT') }} />
        </Row>
        <Row className="noSideMargin pad24">
          <Col xs={4}>
            <img src={location} alt="location" height="65" />
          </Col>
          <Col xs={8} dangerouslySetInnerHTML={{ __html: cqHTML.get('OD_SMART_FAMILY_LOCATION_TEXT') }} />
        </Row>
        <Row className="noSideMargin pad24">
          <Col xs={4}>
            <img src={pause} alt="pause" height="65" />
          </Col>
          <Col xs={8} dangerouslySetInnerHTML={{ __html: cqHTML.get('OD_SMART_FAMILY_PAUSE_TEXT') }} />
        </Row>
        <Row className="noSideMargin pad24">
          <Col xs={4}>
            <img src={securityKeyhole} alt="security-Keyhole" height="65" />
          </Col>
          <Col xs={8} dangerouslySetInnerHTML={{ __html: cqHTML.get('OD_SMART_FAMILY_SECURITY_KEY_TEXT') }} />
        </Row>
        <Row className="noSideMargin pad24">
          <Col xs={4}>
            <img src={group} alt="Group" height="65" />
          </Col>
          <Col xs={8} dangerouslySetInnerHTML={{ __html: cqHTML.get('OD_SMART_FAMILY_GROUP_TEXT') }} />
        </Row>

        <div className="centerBlock textAlignCenter">
          <Button
            type="button"
            className="button width90 primary margin12 onlyRightMargin "
            role="button"
            onClick={this.props.closeLearn}
            analyticstrack="smartFamily-LeranMore-clsBtn"
          >
            {cqLabel.get('OD_SMART_FAMILY_CLOSE_BTN')}
          </Button>
        </div>
      </Grid>
    );
  }
}
