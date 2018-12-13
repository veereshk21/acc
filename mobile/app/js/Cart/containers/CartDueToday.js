
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CartDueToday from '../components/CartDueToday';


const mapStateToProps = (state) => ({
  totalDueToday: state.get('cartData').get('totalDueToday'),
  items: state.get('cartData').get('items'),
  accessories: state.get('cartData').get('accessories'),
  accessoriesBundle: state.get('cartData').get('accessoriesBundle') ? state.get('cartData').get('accessoriesBundle').toJS() : '',
  taxDetails: state.get('cartData').get('taxDetails'),
  pastDueBalance: state.get('cartData').get('pastDueBalance'),
  CQLabel: state.get('cqContent').get('label'),
  promotionList: state.get('cartData').get('promotionList'),
  authenticated: state.get('cartData').get('authenticated'),
  standaloneAccessories: state.get('cartData').get('standaloneAccessories'),
});
const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartDueToday));
