/**
 * Created by hmahad on 2/16/2017.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';

import BackButton from '../../common/BackButton/BackButton';
import HorizontalRule from '../../common/HorizontalRule';


export default class DeviceProtectionDetails extends Component {
  componentDidMount() {
    /* Used to scroll the window to top , to prevent middleware behaviour in router */
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <Grid className="pad12 onlyTopPad">
        <Row>
          <BackButton to="/" onClick={this.props.onClick}>{this.props.cqLabel.get('OD_DEVICE_PROTECTION_BACK_BTN')}</BackButton>
        </Row>
        <Row className="pad32">
          <Col xs={12}>
            <h4
              className="h2 "
            >{this.props.cqLabel.get('OD_DEVICE_PROTECTION_MORE_DETAILS_HEADER')}
            </h4>
            <HorizontalRule />
          </Col>
          <Col xs={12}>
            <div dangerouslySetInnerHTML={{ __html: this.props.cqHTML.get('OD_DEVICE_PROTECTION_MODAL_HTML') }} />

          </Col>
        </Row>
      </Grid>
    );
  }
}

DeviceProtectionDetails.propTypes = {
  cqLabel: PropTypes.object,
  cqHTML: PropTypes.object,
  onClick: PropTypes.func,
};
