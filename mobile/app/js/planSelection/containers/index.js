/**
 * Created by santhra  on 6/19/2017.
 */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import PreOrderPlanComponent from '../components/index';


const mapStatetoProps = (state) => {
  const data = state.toJSON();
  return {
    preOrderPlanData: data.preOrderPlanData,
    cqData: data.cqData,
  };
};


const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStatetoProps, mapDispatchToProps)(PreOrderPlanComponent);
