import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Trade In components
import AppleCareComponent from '../components/AppleCareComponent';

import { tradeInOptionsChange } from '../actions';


const mapStateToProps = (state) => ({
  gotoUrl: 'data.tradeInOptions.goToUrl',
  cq: state.get('cq'),
  appleCare: state.get('appleCare'),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ tradeInOptionsChange }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppleCareComponent);
