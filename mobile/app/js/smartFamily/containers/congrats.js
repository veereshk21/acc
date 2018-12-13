/**
 * Created by hmahad on 2/16/2017.
 */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import SmartFamilyComponent from '../components/congratsFamilyModal';


const getSmartDetails = (state) => state.get('smartFamilyData');
const getCongratsData = (state) => state.get('congratsData');

function mapStateToProps(state) {
  /**
   * TODO:Get orderid and stuff.
   * */

  return {
    cqLabel: state.get('cqContent').get('label'),
    cqHTML: state.get('cqContent').get('html'),
    isFetching: state.get('isFetching'),
    congratsData: getCongratsData(state) || null,
    commerceItemId: getSmartDetails(state).get('commerceItemId'),
    saveUrl: getSmartDetails(state).get('saveUrl'),
    equipmentList: getSmartDetails(state).get('smartFamilyInfo').get('equipmentSmartList'),
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SmartFamilyComponent);
