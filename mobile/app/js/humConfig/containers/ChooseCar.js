
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import * as notificationActions from './../../common/NotificationBar/actions';
import ExpressConfigComponent from '../components/ChooseCar';


const mapStateToProps = (state) => {
  const data = state.toJSON();
  return {
    humConfigData: data.humConfigData,
    makeData: data.makeData.output,
    modelData: data.modelAndColorData.output,
    colorData: data.modelAndColorData.colorList,
    isCarDetailsValid: data.isCarDetailsValid,
    selectedData: data.selectedData,
    isFetching: data.isFetching,
    cqJSON: data.cqContent,
  };
};


const mapDispatchToProps = (dispatch) => bindActionCreators(Object.assign({}, actions, notificationActions), dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(ExpressConfigComponent);
