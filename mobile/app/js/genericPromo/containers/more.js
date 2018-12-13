import { connect } from 'react-redux';
import more from '../components/more';

const mapStatetoProps = (state, ownProps) => {
  const data = state.toJSON();

  return {
    contentKey: ownProps.match.params.id,
    myOfferInfo: data.offer,
  };
};

export default connect(mapStatetoProps)(more);
