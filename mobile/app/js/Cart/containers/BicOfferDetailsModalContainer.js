import { connect } from 'react-redux';
import { push, goBack } from 'react-router-redux';
import { withRouter } from 'react-router-dom';


import BicOfferDetail from './../components/BicOfferDetails';

/**
 * Utility method to extract required params from passed skuID.
 * @param items
 * @param ownprops
 * @returns {string}
 */
const getFilteredItem = (items, ownprops) => {
  const itemsArray = items.toJS();
  // let shipsByDate = '';
  let filteredItem = [];
  if (itemsArray) {
    filteredItem = itemsArray.filter((item) => item.deviceSkuId === ownprops.match.params.skuid);
  }
  return filteredItem;
};

const mapStateToProps = (state, ownprops) => ({
  selectedItem: getFilteredItem(state.get('cartData').get('items'), ownprops),
  cqLabel: state.get('cqContent').get('label'),
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  push,
  goBack,
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BicOfferDetail));
