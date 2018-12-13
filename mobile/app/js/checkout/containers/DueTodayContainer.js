import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionCreators from '../actions';
// import * as _ from 'lodash';
import DueToday from '../components/DueToday';


const generateAccessoriesBasedonQty = (accessories) => {
  const _accessory = [];
  accessories.map((acc) => { // eslint-disable-line
    for (let i = 0; i < acc.quantity; i++) {
      _accessory.push(acc);
    }
  });
  return _accessory;
};
function mapStateToProps(state) {
  const data = state.get('orderDetails').toJS();
  const cqContent = state.get('cqContent').toJS();
  const { accessories } = data.dueTodayView;
  return {
    cqContent,
    dueTodayData: data.dueTodayView,
    accessories: generateAccessoriesBasedonQty(accessories),
    itemsData: data.devices.items,
    plans: data.plans,
    lineLevelOpted: data.isHLLPlanInOrder || data.hllplan,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DueToday);
