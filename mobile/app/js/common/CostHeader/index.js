import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from './actions';
import CostHeader from './CostHeader';

import './../../../css/modules/common/costClarifier.css';

const mapStateToProps = (state, ownProps) => {
  const data = state.toJS();
  const { updateCostClarifier } = data;
  const checkStatus = updateCostClarifier && updateCostClarifier.showBillChanges;
  const show = updateCostClarifier && updateCostClarifier.show;
  return {
    updateCostClarifier,
    checkStatus,
    show,
    topHeight: ownProps && ownProps.topHeight,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CostHeader);
