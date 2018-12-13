

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PastDueMsgOverlay from '../components/PastDueMsgOverlay';


const mapStateToProps = (state) => ({
  cqContent: state.get('cqContent').toJS(),
});


export default withRouter(connect(mapStateToProps)(PastDueMsgOverlay));
