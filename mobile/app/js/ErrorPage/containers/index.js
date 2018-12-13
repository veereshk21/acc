/**
 * Created by sgumma on 22-02-2017.
 */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as errorPageActions from '../actions';
import ErrorComponent from '../components/ErrorComponent';

const mapStateToProps = (state) => {
  // console.log(state.toJSON());
  const data = state.toJSON();
  // console.log(data);
  // (substate) => substate.toJS();
  return {
    errorMap: data.output.errorMap,
    onAjaxResponse: state.get('onAjaxResponse'),
  };
};
function mapDispatchToProps(dispatch) {
  return bindActionCreators(errorPageActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorComponent);
