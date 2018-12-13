import { connect } from 'react-redux';
import InfoGrid from './../components/infoGrid';

/* eslint-disable arrow-body-style */
const mapStatetoProps = (state) => {
  const data = state.toJS().confirmationView;
  return {
    cqKeys: data.cqKeys,
  };
};

export default connect(mapStatetoProps)(InfoGrid);
