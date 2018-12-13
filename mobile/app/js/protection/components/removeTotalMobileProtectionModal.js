import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';

import BackButton from '../../common/BackButton/BackButton';

export default class RemoveTotalMobileProtectionModal extends Component {
  static propTypes = {
    removeTotalMobileProtection: PropTypes.func,
    cqLabel: PropTypes.object,
    isDeclineOption: PropTypes.string,
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }
  closeModal(data) {
    this.props.removeTotalMobileProtection(data);
  }
  render() {
    return (
      <Grid className="pad12 onlyTopPad">
        <Row>
          <BackButton to="/" onClick={() => { this.closeModal('NO'); }}>{this.props.cqLabel.get('OD_DEVICE_PROTECTION_BACK_BTN')}</BackButton>
        </Row>
        <Row className="pad32">
          <Col xs={12}>
            <p className="fontSize_2">
              {this.props.cqLabel.get(this.props.isDeclineOption === 'true' ? 'OD_PROTECTION_DECLINE_TMP' : 'OD_PROTECTION_REMOVE_TMP')}
            </p>
            <div className="textAlignCenter pad32 onlyTopPad">
              <button type="button" role="button" onClick={() => this.closeModal('YES')} analyticstrack="select-tmpmd" className=" button primary large onlyTopMargin">Yes</button>
              <button type="button" role="button" onClick={() => this.closeModal('NO')} analyticstrack="remove-tmpmd" className=" button secondary large margin20 onlyLeftMargin">No</button><br />
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}
