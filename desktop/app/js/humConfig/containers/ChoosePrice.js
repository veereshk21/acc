import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import { hashHistory } from './../../store';
import ChoosePrice from '../components/ChoosePrice';


const mapStateToProps = (state) => {
  const data = state.toJSON();
  if (typeof data.humConfigData.showPricePage !== 'undefined' && !data.humConfigData.showPricePage) {
    hashHistory.push('/chooseCar');
  }
  return {
    cqJSON: data.cqContent,
    humConfigData: data.humConfigData,
    isFetching: data.isFetching,
    devicePrice: data.humConfigData.devicePrice,
  };
};
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChoosePrice);
