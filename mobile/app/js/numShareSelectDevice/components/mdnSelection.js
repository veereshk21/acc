/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import HorizontalRule from '../../common/HorizontalRule';
import MDNDetails from './MDNDetails';
import Title from '../../common/Title/Title';

export default class MDNSelectionComponent extends React.Component {
  render() {
    const { mdnDetailsList, cqJSON, mdnJSON } = this.props;
    if (!mdnDetailsList) {
      return (<div />);
    }
    // Main view for MDN Selection, user can choose which device to upgrade
    return (
      <Grid className="pad32">
        <Row >
          <Col xs={12}>
            <Title>{cqJSON.label.OD_NS_DEVICES_LIST_TITLE}</Title>
            <HorizontalRule margin="32px 0 " />
          </Col>
        </Row>
        <Row>
          <Col xs={12} >
            {
              mdnDetailsList.map((mdnDetails, idx) => (
                <MDNDetails
                  mdnDetails={mdnDetails}
                  mdnJSON={mdnJSON}
                  cqJSON={cqJSON}
                  {...this.props}
                  key={`mdn-${idx}`}
                />))
            }
          </Col>
        </Row>
      </Grid>
    );
  }
}
MDNSelectionComponent.propTypes = {
  mdnDetailsList: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  cqJSON: PropTypes.object,
  mdnJSON: PropTypes.object,
};
