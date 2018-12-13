/**
 * Created by santhra  on 6/15/2017.
 */
import { connect } from 'react-redux';
import LandingPage from '../components/index';

const mapStatetoProps = (state) => {
  const data = state.toJSON();
  return {
    landingInfo: data.output,
  };
};

export default connect(mapStatetoProps)(LandingPage);
