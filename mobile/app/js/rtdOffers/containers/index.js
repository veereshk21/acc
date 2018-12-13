/**
 * Created by santhra  on 6/15/2017.
 */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import myOfferInfo from '../components';
import * as actions from '../actions';

const mapStatetoProps = (state) => {
  const data = state.toJSON();
  return {
    rtdOfferInfo: data.rtdOfferInfo,
  };
};
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStatetoProps, mapDispatchToProps)(myOfferInfo);
