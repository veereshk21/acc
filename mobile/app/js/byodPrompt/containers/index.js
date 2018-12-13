import { connect } from 'react-redux';

import NSOLandingComponent from '../components/index';

export const mapStateToProps = (state) => ({
  options: state.get('byodPromptData').get('options').toJSON(),
  deviceHistoryList: state.get('byodPromptData').get('deviceHistoryList').toJSON(),
  cqContent: state.get('cqContent').toJSON(),
});


export const mapDispatchToProps = (state) => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(NSOLandingComponent);
