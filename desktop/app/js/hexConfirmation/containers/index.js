import { connect } from 'react-redux';
import Confirmation from './../components';

/* eslint-disable arrow-body-style */
const mapStatetoProps = (state) => {
  return state.toJS().confirmationView;
};

export default connect(mapStatetoProps)(Confirmation);
