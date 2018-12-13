/**
 * Created by hmahad on 14/06/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Title from '../../common/Title/Title';
import Button from '../../common/Button/Button';


const device_item_wrap = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',

};

const device_item = {
  position: 'relative',
  width: '50%',
  minHeight: '400px',
};

export default class DeviceListComponent extends Component {
  render() {
    return (
      <section className="section  group pad24 noSidePad ">
        <Title>{this.props.cqContent.label.AAL_BYOD_SELECT_DEVICE_REACTIVATE}</Title>

        <div className="margin42 onlyTopMargin " style={device_item_wrap}>
          {this.props.deviceHistoryList.map((item, i) => {
            const className = ((i % 2 === 0) || (i === (this.props.deviceHistoryList.length - 1))) ? '  textAlignCenter pad24 noSidePad  border_CC noTopBorder  noLeftBorder ' : ' textAlignCenter pad24 noSidePad  border_CC noTopBorder noLeftBorder noRightBorder  ';
            return (
              <div key={i} className={className} style={device_item}>
                <form
                  name="ReactivateDeviceForm"
                  action={'/digital/byod/deviceDetail/?flow=NSO#/enterSimId/' + item.deviceType + '/' + item.os}
                  method="POST"
                >
                  <p className="bold margin12 fontSize_4">{item.displayName}</p>
                  <p>{item.mtn}</p>
                  <div className="pad24 noSidePad">
                    <img src={item.image} alt={item.displayName} />
                  </div>
                  <div className="positionAbsolute margin12 onlyBottomMargin width100" style={{ bottom: 0 }}>
                    <Button
                      type="submit"
                      className="secondary button"
                      onClick={this.onNextClick}
                    >{this.props.cqContent.label.AAL_BYOD_BUTTON_CTA}
                    </Button>
                  </div>
                  <input type="hidden" name="deviceId" value={item.deviceId} />
                  <input type="hidden" name="deviceType" value={item.deviceType} />
                  <input type="hidden" name="os" value={item.os} />
                </form>
              </div>
            );
          })}
        </div>
      </section>);
  }
}

DeviceListComponent.propTypes = {
  cqContent: PropTypes.object,
  deviceHistoryList: PropTypes.array,
};
