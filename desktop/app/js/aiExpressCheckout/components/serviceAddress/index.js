import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EDIT_STATE } from '../../constants';
import ServiceAddress from './serviceAddress';
import AsyncComponent from '../../../common/AsyncComponent';

const EditServiceAddress = AsyncComponent(() => import('../../containers/serviceAddress/editServiceAddress'));

class ServiceAddressSection extends Component {
  updateEditState = (index, state) => {
    this.props.updateEditState(EDIT_STATE.SERVICE + index, state);
  }
  render() {
    const {
      devices, cqContent, editState,
    } = this.props;

    return (
      <div id="ServiceAddressSection">
        {devices.map((device, index) => (
          <div key={`serviceAddress-${index}`}>
            {editState[EDIT_STATE.SERVICE + index] ? (
              <EditServiceAddress
                index={index}
                device={device}
                setEditState={this.setEditState}
                onClickCancel={() => this.updateEditState(index, false)}
              />
            ) : (
              <ServiceAddress
                device={device}
                cqContent={cqContent}
                index={index}
                onClickEdit={() => this.updateEditState(index, true)}
              />
            )}
          </div>
        ))}
      </div>
    );
  }
}
ServiceAddressSection.propTypes = {
  devices: PropTypes.array,
  cqContent: PropTypes.object,
  editState: PropTypes.object,
  updateEditState: PropTypes.func,
};
export default ServiceAddressSection;
