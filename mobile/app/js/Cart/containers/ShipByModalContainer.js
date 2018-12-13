import { connect } from 'react-redux';
import { push, goBack } from 'react-router-redux';
import { withRouter } from 'react-router-dom';
import ShipByModal from './../components/ShipByModal';

/**
 * Utility method to extract required params from passed skuID.
 * @param items
 * @param ownprops
 * @returns {string}
 */
const getShipsByDate = (items, ownprops) => {
  console.log(ownprops);
  const itemsArray = items.toJS();
  let shipsByDate = '';
  let filteredItem = [];
  if (itemsArray) {
    filteredItem = itemsArray.filter((item) => item.deviceSkuId === ownprops.match.params.skuid);
  }

  if (filteredItem.length) {
    shipsByDate = filteredItem[0].inventoryAvailableDate;
  }

  return shipsByDate;
};

const mapStateToProps = (state, ownprops) => ({
  shipsByDate: getShipsByDate(state.get('cartData').get('items'), ownprops),
  cqLabel: state.get('cqContent').get('label'),
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  push,
  goBack,
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShipByModal));
