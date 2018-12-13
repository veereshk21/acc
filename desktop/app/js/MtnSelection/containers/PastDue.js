import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as mdnSelectionActions from '../actions';
import PastDue from '../components/PastDue';

const mapStateToProps = (state) => {
  const data = state.toJS();

  return {
    data,
    pastDueAmount: state.get('pastDueDetails').get('pastDueAmount'),
    pastDueIgnored: state.get('pastDueDetails').get('pastDueIgnored'),
    pastDueDate: state.get('pastDueDetails').get('pastDueDate'),
    nextLink: state.get('pastDueDetails').get('nextLink'),
    noThanksLink: state.get('pastDueDetails').get('noThanksLink'),
    pastDueAccepted: state.get('pastDueDetails').get('pastDueAccepted'),
    pastDueAccount: state.get('pastDueDetails').get('pastDueAccount'),
    cqJSON: state.get('cqContent').toJS() || { html: {}, label: {}, error: {} },
  };
};
const mapDispatchToProps = (dispatch) => bindActionCreators(mdnSelectionActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PastDue);
