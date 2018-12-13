import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import aalOffer from './../components/index';

/**
 * Returns only the first and last item in the array
 * @param equipmentProtectionList
 * @returns {Array}
 */

const mapStateToProps = (state) => {
  const myOffers = state.get('myOffers').toJS();
  const asyncCallStatus = state.get('asyncCallStatus');
  const cqContent = state.get('cqContent').toJS();
  return {
    myOffers,
    asyncCallStatus,
    cqContent,
  };
};


const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(aalOffer);
