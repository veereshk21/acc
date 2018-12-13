import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as mdnSelectionActions from '../actions';
import CancelOrderFailure from '../components/CancelOrderFailure';

const mapStateToProps = (state) => ({
  orderResponse: state.get('cancelPendingOrderResponse'),
  cqJSON: state.get('cqContent').toJS() || { html: {}, label: {}, error: {} },
});

const mapDispatchToProps = (dispatch) => bindActionCreators(mdnSelectionActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CancelOrderFailure);
