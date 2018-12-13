import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as mdnSelectionActions from '../actions';
import NotEligible from '../components/NotEligible';

const mapStateToProps = (state) => {
  const data = state.toJSON();
  return {
    data: data.output,
    cqJSON: data.cqJSON,
    cartURL: data.output.cartRedirectUrl,
  };
};
const mapDispatchToProps = (dispatch) => bindActionCreators(mdnSelectionActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NotEligible);
