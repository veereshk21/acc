// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PastDueComponent from '../components/PastDueComponent';

const mapStateToProps = (state) => ({
  pastDueAmount: state.get('pastDueDetails').get('pastDueAmount'),
  pastDueIgnored: state.get('pastDueDetails').get('pastDueIgnored'),
  pastDueDate: state.get('pastDueDetails').get('pastDueDate'),
  nextLink: state.get('pastDueDetails').get('nextLink'),
  noThanksLink: state.get('pastDueDetails').get('noThanksLink'),
  pastDueAccepted: state.get('pastDueDetails').get('pastDueAccepted'),
  pastDueAccount: state.get('pastDueDetails').get('pastDueAccount'),
  cqContent: state.get('cqData').toJSON(),
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});


export default connect(mapStateToProps, mapDispatchToProps)(PastDueComponent);
