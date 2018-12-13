import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
// import renderHTML from 'react-render-html';
import BackButton from '../../common/BackButton/BackButton';
import Title from '../../common/Title/Title';
import { hashHistory } from './../../store';
import HorizontalRule from '../../common/HorizontalRule';

export default class DPPQualifications extends React.Component {
  /* --- Component Lifecycle Methods --- */
  shouldComponentUpdate() {
    if (typeof this.props.mdnSelectionView === 'undefined' || !this.props.mdnSelectionView) {
      hashHistory.push('/');
      return false;
    }
    return true;
  }

  render() {
    return (
      <Grid className="pad12 onlyTopPad">
        <BackButton to="/dppAppraisal" />
        <Row className="pad24">
          <Col xs={12}>
            <Title>{this.props.cqJSON.label.OD_MDN_DPP_QUALIFICATIONS_TITLE}</Title>
            <p className="margin18 onlyTopMargin">{this.props.cqJSON.label.OD_MDN_DPP_QUALIFICATIONS_SUBTITLE}</p>
            <HorizontalRule margin="16px 0 0" />
          </Col>
        </Row>
        <Row className="pad24 onlySidePad">
          <Col xs={12}>
            <ul className="margin18 onlyLeftMargin noSidePad" dangerouslySetInnerHTML={{ __html: this.props.cqJSON.html.OD_MDN_DPP_QUALIFICATIONS_DESCRIPTION }} />
          </Col>
        </Row>
      </Grid>
    );
  }
}
DPPQualifications.propTypes = {
  // router: PropTypes.object,
  cqJSON: PropTypes.object,
  mdnSelectionView: PropTypes.string,

};
