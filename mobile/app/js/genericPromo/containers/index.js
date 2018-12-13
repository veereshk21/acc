import { connect } from 'react-redux';
import myOfferInfo from '../components';

const mapStatetoProps = (state) => {
  const data = state.toJSON();
  return {
    myOfferInfo: data.offer,
  };
};

export default connect(mapStatetoProps)(myOfferInfo);
