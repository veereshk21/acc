import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AppleCare from './../components/AppleCare';

function mapStateToProps(state) {
  const data = state.toJSON();
  return {
    appleCareData: data.expressConfigData.appleCare,

  };
}


export default withRouter(connect(mapStateToProps)(AppleCare));
