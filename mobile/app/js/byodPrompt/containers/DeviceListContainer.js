/**
 * Created by hmahad on 14/06/17.
 */


import { connect } from 'react-redux';

import DeviceListComponent from '../components/DeviceListComponent';


export const mapStateToProps = (state) => ({
  deviceHistoryList: state.get('byodPromptData').get('deviceHistoryList').toJSON(),
  cqContent: state.get('cqContent').toJSON(),
});

export default connect(mapStateToProps)(DeviceListComponent);
