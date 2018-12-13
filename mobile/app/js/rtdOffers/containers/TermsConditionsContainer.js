/**
 * Created by santhra  on 6/15/2017.
 */
import { connect } from 'react-redux';
import { push, goBack } from 'react-router-redux';
import TermsCondition from '../components/TermsConditions';

const mapStateToProps = (state, ownprops) => {
  const data = state.toJSON();

  return {
    disclaimerCopy: data.rtdOfferInfo.cqContent.selectOfferDisclaimerCopy,
    ...ownprops,
  };
};
const mapDispatchToProps = (dispatch) => ({
  dispatch,
  push,
  goBack,
});


export default connect(mapStateToProps, mapDispatchToProps)(TermsCondition);
