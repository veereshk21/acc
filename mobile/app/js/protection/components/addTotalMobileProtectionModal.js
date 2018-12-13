import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import BackButton from '../../common/BackButton/BackButton';

export default class AddTotalMobileProtectionModal extends Component {
  /* static propTypes ={

  } */
  componentDidMount() {
    /* Used to scroll the window to top , to prevent middleware behaviour in router */
    window.scrollTo(0, 0);
  }
  closeModal(data) {
    this.props.addTotalMobileProtection(data);
  }
  render() {
    return (
      <Grid className="pad12 onlyTopPad">
        <Row>
          <BackButton to="/" onClick={() => { this.closeModal('YES'); }}>{this.props.cqLabel.get('OD_DEVICE_PROTECTION_BACK_BTN')}</BackButton>
        </Row>
        <Row className="pad32" >
          <Col xs={12}>
            <p className="fontSize_2">By adding Total Mobile Protection Multi-Device, any single line equipment protection on lines covered by Total Mobile Protection Multi-Device will be removed.</p>


            <div className="textAlignCenter pad32 onlyTopPad">
              <button onClick={() => { this.closeModal('YES'); }} className="button primary large" analyticstrack="select-tmpmd">Continue</button>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

AddTotalMobileProtectionModal.propTypes = {
  addTotalMobileProtection: PropTypes.func,
  cqLabel: PropTypes.object,
};
