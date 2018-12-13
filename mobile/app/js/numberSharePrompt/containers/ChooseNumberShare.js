import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Trade In components
import ChooseNumberShare from '../components/ChooseNumberShare';

import { numberShareOptionsChange } from '../actions';

/**
 *
 * @param state
 * @returns {{gotoUrl: *, tradeInOptions: *}}
 */
const mapStateToProps = (state) => {
  const data = state.toJSON();
  console.log(data);
  return {
    gotoUrl: data.numberShareOptions.goToUrl,
    numberShareOptions: data.numberShareOptions.numberShareOptions,
    cqKeys: data.numberShareOptions.cqKeys,
  };
};
/**
 *
 * @param dispatch
 * @returns {{tradeInOptionsChange: tradeInOptionsChange}|B|N}
 */
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ numberShareOptionsChange }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseNumberShare);
