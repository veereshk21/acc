/**
 * Created by hmahad on 2/16/2017.
 */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import DeviceProtectionDetails from '../components/DeviceProtectionDetails';

const getProtectionDetails = (state) => state.get('protectionData');


const mapStateToProps = (state) => ({
  cqLabel: state.get('cqContent').get('label'),
  cqHTML: state.get('cqContent').get('html'),
  getProtectionDetails,
});
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DeviceProtectionDetails);
