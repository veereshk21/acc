import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Button from './../../common/Button/Button';
import { hashHistory } from './../../store';
import Title from '../../common/Title/Title';
import Img from './../../common/Img/Img';

class IMEIStatus extends PureComponent {
  redirectPage = () => {
    const { output, skipAddSim, skipSimUrl } = this.props;
    if (output.is3GDevice || !output.simRequired) {
      skipAddSim({ deviceId: output.deviceId }, skipSimUrl);
    } else {
      hashHistory.push('/simPrompt');
    }
  }
  render() {
    const { cqJSON, output } = this.props;
    if (!output) {
      hashHistory.push('/');
      return (<div />);
    }
    let ImageUrl = 'generic_phone';
    if (output) {
      ImageUrl = output.imageUrl !== '' ? output.imageUrl : 'generic_phone';
    }

    return (
      <Grid className="pad32">
        <Row>
          <Col xs={12}>
            <Title>{cqJSON.label.OD_BYOD_STATUS_GOODNEWS}{output.deviceName}{cqJSON.label.OD_BYOD_STATUS_VZ_NETWORK}</Title>
          </Col>
          <Col xs={12} className="pad24 textAlignCenter">
            <Img src={`https://ss7.vzw.com/is/image/VerizonWireless/${ImageUrl}?$device-lg$&hei=200`} srcSet={`https://ss7.vzw.com/is/image/VerizonWireless/${ImageUrl}?$device-lg$&hei=400 2x`} alt={output.deviceName} />
          </Col>
          <Col xs={12} className="footerFixed">
            <Button className="button primary width40" onClick={() => this.redirectPage()} analyticstrack="goto-next-page">{cqJSON.label.OD_BYOD_NEXT_CTA_TEXT}</Button>
          </Col>
        </Row>
      </Grid>
    );
  }
}

IMEIStatus.propTypes = {
  cqJSON: PropTypes.object,
  output: PropTypes.object,
  skipAddSim: PropTypes.func,
  skipSimUrl: PropTypes.string,
};

export default IMEIStatus;
