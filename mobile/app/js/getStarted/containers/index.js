import { connect } from 'react-redux';
import getStarted from '../components/index';

const mapStateToProps = (state) => {
  const data = state.toJSON();
  return {
    goToUrl: data.goToUrl,
    cqContent: data.cqContent,
  };
};
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(getStarted);
