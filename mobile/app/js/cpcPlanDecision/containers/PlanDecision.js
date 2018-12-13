import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PlanDecision from '../components/PlanDecision';
import * as actions from '../actions';
import { hashHistory } from '../../store';

const mapStateToProps = (state, ownProps) => {
  const data = state.toJS();
  const { cpcIntercept, cqContent, discountChange } = data;
  if (ownProps.match.params.discount && !discountChange.modal) {
    hashHistory.push('/decision');
  }
  return {
    ...cpcIntercept,
    cq: cqContent,
    showDiscountChange: discountChange.modal,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(PlanDecision);

