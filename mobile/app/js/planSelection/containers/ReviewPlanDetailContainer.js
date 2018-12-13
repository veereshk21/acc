/**
 * Created by santhra  on 6/19/2017.
 */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import ReviewPlanDetails from '../components/ReviewPlanDetails';


const mapStatetoProps = (state) => {
  const data = state.toJSON();
  return {
    preOrderPlanData: data,
  };
};


const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStatetoProps, mapDispatchToProps)(ReviewPlanDetails);
