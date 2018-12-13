/**
 * Created by santhra  on 6/15/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { hashHistory } from './../../store';
import BackButton from '../../common/BackButton/BackButton';
import Title from '../../common/Title/Title';
import HorizontalRule from '../../common/HorizontalRule';

export default class TermsCondition extends React.PureComponent {
  render() {
    const { disclaimerCopy } = this.props;
    return (
      <Grid className="pad12 onlyTopPad">
        <BackButton onClick={() => hashHistory.goBack()} >Back</BackButton>
        <Row className="noSideMargin pad24">
          <Col xs={12} >
            <Title>{disclaimerCopy.title}</Title>
            <p className="pad12 onlyTopPad">
              {disclaimerCopy.subtitle}
            </p>
            <HorizontalRule />
          </Col>
          <Col xs={12}>
            <div dangerouslySetInnerHTML={{ __html: disclaimerCopy.tc }} />
          </Col>
        </Row>

      </Grid>
    );
  }
}
TermsCondition.propTypes = {
  disclaimerCopy: PropTypes.object,
};
