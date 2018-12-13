/**
 * Created by hmahad on 14/06/17.
 */


import { connect } from 'react-redux';

import ReActivateDevice from '../components/ReActivateDeviceComponent';


export const mapStateToProps = (state) => ({
  reactivateOptions: state.get('byodPromptData').get('reactivateOptions').toJSON(),
  deviceHistoryList: state.get('byodPromptData').get('deviceHistoryList').toJSON(),
  cqContent: state.get('cqContent').toJSON(),
});

export default connect(mapStateToProps)(ReActivateDevice);
