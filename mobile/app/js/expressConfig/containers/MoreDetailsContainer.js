import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import MoreDetails from './../components/MoreDetails';

function mapStateToProps(state) {
  const stateData = state.toJSON();

  return { moreDetailsData: stateData.moreDetailsInfo.output };
}


export default withRouter(connect(mapStateToProps)(MoreDetails));
