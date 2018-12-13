/**
 * Created by hmahad on 1/6/2017.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hashHistory } from './../../store';
import DeviceProtection from '../../common/DeviceProtection/DeviceProtection';

class CartDeviceProtection extends Component {
  constructor(props) {
    super(props);
    this.onSaveProtection = this.onSaveProtection.bind(this);
    this.state = { hasError: false };
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.isFetching) {
      window.hideLoader();
    }
    if (newProps.data.hasOwnProperty('validProtection') && newProps.deviceProtectionList.fetched) { // eslint-disable-line
      const { validProtection } = newProps.data;
      if (validProtection) {
        hashHistory.push('/dueMonthly'); // eslint-disable-line
        this.props.asyncFetchClear();
      }
    }
  }
  componentWillUnmount() {
    this.props.clearProtectionOptions();
  }

  onSaveProtection(skuId) {
    const { selectedItem } = this.props;

    const data = {
      orderId: this.props.orderId,
      flow: selectedItem.get('flow'),
      deviceCommerceId: selectedItem.get('commerceItemId'),
      featureSkuId: skuId,
      featureType: 'INSURANCE',
      existingFeature: false,
      mtn: selectedItem.get('mtn'),
      deviceSkuId: selectedItem.get('deviceSkuId'),

    };
    this.props.saveProtectionOptions(data);
  }
  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    console.log('Error:', error, '\n Info:', info);
    // You can also log the error to an error reporting service
  }

  render() {
    const { selectedProtection } = this.props;
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <div>Something went wrong.</div>;
    }
    return (
      <div>

        <DeviceProtection CQLabel={this.props.CQLabel} defaultSelected={selectedProtection} onSave={this.onSaveProtection} />
      </div>
    );
  }
}
CartDeviceProtection.propTypes = {
  selectedProtection: PropTypes.object,
  CQLabel: PropTypes.object,
  saveProtectionOptions: PropTypes.func,
  orderId: PropTypes.string,
  selectedItem: PropTypes.object,
  clearProtectionOptions: PropTypes.func,
  asyncFetchClear: PropTypes.func,
};

export default CartDeviceProtection;
