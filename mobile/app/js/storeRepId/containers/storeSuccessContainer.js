import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Trade In components
import StoreSuccessComponent from '../components/StoreRepSuccess';

import * as actionCreators from '../actions';

const mapStateToProps = (state) => {
  const data = state.toJSON();
  return {
    cqContent: data.cqContent,
    storeRepData: data.storeRepData,
    userInfo: data.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(StoreSuccessComponent));
