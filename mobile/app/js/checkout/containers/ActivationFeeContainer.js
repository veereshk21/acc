import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionCreators from '../actions';
// import * as _ from 'lodash';
import ActivationFee from '../components/ActivationFee';

export class ActivationFeeView extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <ActivationFee />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const data = state.get('orderDetails').toJS();
  const cqContent = state.get('cqContent').toJS();

  return {
    cqContent,
    items: data.devices.items,
    totalActivationFee: data.totalActivationFee,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivationFee);
