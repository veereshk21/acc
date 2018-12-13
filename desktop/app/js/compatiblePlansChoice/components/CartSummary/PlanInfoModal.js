import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';

class PlanInfoModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'PLAN_INFO',
    };
  }
  render() {
    const { selectedPlanId, cq } = this.props;
    return (
      <div className="pad24 onlyTopPad">
        <Row className="border_EB noSideBorder planInformation">
          <Col xs={3} className={`textAlignCenter pad12 ${this.state.tab === 'PLAN_INFO' ? 'active' : ''}`} role="tab" name="Important plan info" aria-label={this.state.tab === 'PLAN_INFO' ? 'Important plan info selected' : 'Important plan info unselected'}>
            <a className="fontSize_4 bold textDecNone" href="#/" onClick={() => this.setState({ tab: 'PLAN_INFO' })}>Important plan info</a>
            {this.state.tab === 'PLAN_INFO' &&
            <div className="pad18 noTopPad tabContent">
              <div className="pad24 noSidePad  border_00_thick onlyBottomBorder">
                <h2 className="h4 color_000 width70">Important plan information</h2>
              </div>
              {selectedPlanId && <div>
                {(selectedPlanId === '17994' || selectedPlanId === '17990') &&
                  <div className="pad24 noSidePad">
                    <p className="fontSize_3 pad12 onlyBottomPad bold">Above Unlimited</p>
                    <p>4G LTE only. During times of congestion, your data may be temporarily slower than other traffic (only after 75 GB/line/mo). Not available for machine-to-machine services. Mobile Hotspot/tethering reduced to speeds up to 600 Kbps (only after 20 GB/month); domestic data roaming at 2G speeds; int'l data reduced to 2G speeds after 512 MB/day. If more than 50% of your talk, text or data usage in a 60-day period is international, use of those services in countries outside of the U.S. may be removed or limited. Above Unlimited includes up to 5 days of international usage in 130+ countries each month that must be used within the month allocated. Above Unlimited includes 500GB of VZ Cloud Storage. Video streaming is HD.</p>
                  </div>
                }
                {(selectedPlanId === '17993' || selectedPlanId === '17989') &&
                  <div className="pad24 noSidePad">
                    <p className="fontSize_3 pad12 onlyBottomPad bold">Beyond Unlimited</p>
                    <p>4G LTE only. During times of congestion, your data may be temporarily slower than other traffic (only after 22 GB/line/mo). Not available for machine-to-machine services. Mobile Hotspot/tethering reduced to speeds up to 600 Kbps (only after 15 GB/month); domestic data roaming at 2G speeds; int'l data reduced to 2G speeds after 512 MB/day.). If more than 50% of your talk, text or data usage in a 60-day period is in Canada or Mexico, use of those services in those countries may be removed or limited. Video streaming is HD.</p>
                  </div>
                }
                {(selectedPlanId === '17991' || selectedPlanId === '17973') &&
                  <div className="pad24 noSidePad">
                    <p className="fontSize_3 pad12 onlyBottomPad bold">Go Unlimited</p>
                    <p>4G LTE only. During times of congestion, your data may be temporarily slower than other traffic on Go Unlimited.  Not available for machine-to-machine services. Mobile Hotspot/tethering reduced to speeds up to 600 Kbps; domestic data roaming at 2G speeds; int'l data reduced to 2G speeds after 512 MB/day. If more than 50% of your talk, text or data usage in a 60-day period is in Canada or Mexico, use of those services in those countries may be removed or limited. Video streaming is SD on phones.</p>
                  </div>
                }
                {(selectedPlanId === '18042' || selectedPlanId === '18056' || selectedPlanId === '18063' || selectedPlanId === '18059' || selectedPlanId === '18258' || selectedPlanId === '18045' || selectedPlanId === '18046' || selectedPlanId === '18050' || selectedPlanId === '18051' || selectedPlanId === '18052') &&
                  <div className="pad24 noSidePad">
                    <p className="fontSize_3 pad12 onlyBottomPad bold">Unlimited</p>
                    <p>Up to 4G LTE only. During times of congestion, your data may be temporarily slower than other traffic (only after 15 GB/line/mo) on the Companion Plan Access (Non-phone unlimited plans). Not available for machine-to-machine services. Mobile Hotspot/tethering reduced to speeds up to 600 Kbps (only after 15 GB/month) on the Companion Plan Access (Non-phone unlimited plans); domestic data roaming at 2G speeds; int'l data reduced to 2G speeds after 512 MB/day.) on compatible 4G World devices. If more than 50% of your talk, text or data usage in a 60-day period is international, use of those services in countries outside of the U.S. may be removed or limited. Video streaming is HD 1080p for tablets, other devices are HD.</p>
                  </div>
                }
              </div>}
              <div className="pad12 onlyTopPad">
                <p className="" dangerouslySetInnerHTML={{ __html: cq.html.DT_OD_PLAN_INFO_HTML }} />
              </div>
            </div>}
          </Col>
          <Col xs={3} className={`textAlignCenter pad12 ${this.state.tab === 'BROADBAND_INFO' ? 'active' : ''}`} role="tab" name="Important broadband info" aria-label={this.state.tab === 'BROADBAND_INFO' ? 'Important broadband info selected' : 'Important broadband info unselected'}>
            <a className="fontSize_4 bold textDecNone" href="#/" onClick={() => this.setState({ tab: 'BROADBAND_INFO' })}>Important broadband info</a>
            {this.state.tab === 'BROADBAND_INFO' &&
            <div className="pad18 noTopPad tabContent">
              <div className="pad24 noSidePad border_00_thick onlyBottomBorder">
                <h2 className="h4 color_000 width70">Important Information About Verizon Wireless Broadband Internet Access Services</h2>
              </div>
              <div className="pad12 onlyTopPad">
                <p className="" dangerouslySetInnerHTML={{ __html: cq.html.DT_OD_BROAD_BAND_INFO_HTML }} />
              </div>
            </div>}
          </Col>
        </Row>
      </div>
    );
  }
}

PlanInfoModal.propTypes = {
  selectedPlanId: PropTypes.string,
  cq: PropTypes.object,
};

export default PlanInfoModal;
