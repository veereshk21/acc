import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


import StoreRepComponent from '../components';

import { validateRepId } from '../actions';

const mapStateToProps = (state) => {
  const data = state.toJSON();
  return {
    cqContent: data.cqContent,
    storeRepData: data.storeRepData,
    userInfo: data.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ validateRepId }, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(StoreRepComponent));
