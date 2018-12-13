import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as NotificationActions from '../../common/NotificationBar/actions';

import Landing from '../components/';
import * as actions from '../actions';

const mapStateToProps = (state) => {
  const data = state.toJS();
  const { cpcIntercept, cqContent } = data;
  return {
    ...cpcIntercept,
    cq: cqContent,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(Object.assign({}, actions, NotificationActions), dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Landing);

