import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Landing from '../components/index';
import * as actions from '../actions';

const mapStateToProps = (state) => {
  const data = state.get('data').toJS();
  const multiPromo = data.promoType === 'MULTI';
  const cqContent = state.get('cqContent').toJS();
  const eligibleModalDetails = state.get('eligibleModalDetails');
  // console.log(data);
  const devicePromos = window.devicePromos || null;
  return {
    data,
    multiPromo,
    cqContent,
    eligibleModalDetails,
    devicePromos,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Landing);
