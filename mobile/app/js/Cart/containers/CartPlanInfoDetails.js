import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CartPlanInfoDetails from '../components/CartPlanInfoDetails';

const mapStateToProps = (state, ownprops) => {
  const selectedSkuId = ownprops.match.params.skuid;
  const cqData = state.get('cqContent').toJS();
  return {
    cqHTML: cqData.html,
    sku: selectedSkuId,
  };
};


export default withRouter(connect(mapStateToProps)(CartPlanInfoDetails));
