import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actionCreators from '../actions';
import ReviewDetail from './../components/DetailedReviewSlide';

function mapStateToProps(state) {
  const data = state.toJSON();
  return {
    cqKeys: data.cqKeys,
  };
}
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) };
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReviewDetail));
