import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Loader from '../../common/Loader/Loader';
import Button from '../../common/Button/Button';
import BackButton from '../../common/BackButton/BackButton';

export default class learnMoreFamilyModal extends Component {
  static propTypes = {
    isFetching: PropTypes.bool,
    cqLabel: PropTypes.object,
    cqHTML: PropTypes.object,
    closeTerms: PropTypes.func,
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { cqLabel, cqHTML } = this.props;
    return (
      <Grid className="pad12 noSidePad">
        {this.props.isFetching === true && <Loader />}
        <Row className="noSideMargin">
          <Col xs={12} className="noSidePad">
            <BackButton to="/" onClick={this.props.closeTerms} />
          </Col>
        </Row>
        <Row className="noSideMargin pad24">
          <Col xs={12}>
            <h2
              dangerouslySetInnerHTML={{
                __html: cqHTML.get('OD_SMART_FAMILY_TITLE'),
              }}
            />
            <h3>{cqLabel.get('OD_SMART_FAMILY_TERMS_CONDITIONS')}</h3>
            <div
              className="margin10 noSideMArgin"
              dangerouslySetInnerHTML={{
                __html: cqHTML.get('OD_SMART_FAMILY_TERMS_DETAILS'),
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div className="centerBlock textAlignCenter">
              <Button
                type="button"
                className="button width90 primary margin12 onlyRightMargin "
                role="button"
                onClick={this.props.closeTerms}
                analyticstrack="smartFamily-tandc-close"
              >
                {cqLabel.get('OD_SMART_FAMILY_CLOSE_BTN')}
              </Button>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}
