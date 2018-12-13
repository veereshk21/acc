/**
 * Created by sgumma on 22-02-2017.
 */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as errorPageActions from '../actions';
import Feedback from '../components/index';

const mapStateToProps = (state) => {
  const data = state.toJS();
  return {
    cqContent: data.cqContent,
  };
};
function mapDispatchToProps(dispatch) {
  return bindActionCreators(errorPageActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
