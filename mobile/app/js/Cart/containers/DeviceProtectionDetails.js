
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { withRouter } from 'react-router-dom';
import DeviceProtectionDetails from '../components/DeviceProtectionDetails';


const mapStateToProps = (state) => ({

  CQHtml: state.get('cqContent').get('html'),
  CQLabel: state.get('cqContent').get('label'),

});
const mapDispatchToProps = (dispatch) => ({
  dispatch,
  push: (url) => dispatch(push(url)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DeviceProtectionDetails));
