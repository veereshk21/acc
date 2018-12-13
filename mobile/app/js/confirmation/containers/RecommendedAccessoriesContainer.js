import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import RecommendedAccessories from './../components/RecommendedAccessories';
import * as actions from './../actions';

/* eslint-disable arrow-body-style */
const mapStatetoProps = (state) => {
  const confirmationData = state.toJS().confirmationView;
  const recommendedAccessories = state.get('recommendedAccessories');
  return {
    cqContent: confirmationData.cqJSON,
    recommendedAccessories,
  };
};

const dispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStatetoProps, dispatchToProps)(RecommendedAccessories);
