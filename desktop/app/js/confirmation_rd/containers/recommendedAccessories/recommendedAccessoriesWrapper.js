import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import RecommendedAccessoriesWrapper from './../../components/recommendedAccessories/recommendedAccessoriesWrapper';

const mapStateToProps = (state) => {
  const confirmationData = state.get('orderDetails').toJS();
  const recommendedAccessories = state.get('recommendedAccessories');
  const cqContent = state.get('cqContent').toJS();
  return {
    cqContent,
    recommendedAccessories,
    accessoryShopURL: confirmationData.accessoryShopURL,
  };
};
export default withRouter(
  connect(mapStateToProps)(RecommendedAccessoriesWrapper));
