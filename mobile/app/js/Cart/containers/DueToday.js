
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CartDueToday from '../components/DueToday';

const generateAccessoriesBasedonQty = (accessories) => {
  const _accessory = [];
  accessories.map((acc) => { // eslint-disable-line
    for (let i = 0; i < acc.quantity; i++) {
      _accessory.push(acc);
    }
  });
  return _accessory;
};
const mapStateToProps = (state) => {
  const data = state.toJSON();
  const {
    totalDueToday, items, accessories, accessoriesBundle, taxDetails, pastDueBalance, promotionList, isHLLPlanInOrder, instantCreditEligible,
  } = data.cartData;
  const { label } = data.cqContent;

  return {
    totalDueToday,
    items,
    accessories: generateAccessoriesBasedonQty(accessories),
    accessoriesBundle,
    taxDetails,
    pastDueBalance,
    CQLabel: label,
    promotionList,
    instantCreditEligible,
    lineLevelOpted: isHLLPlanInOrder,
  };
};
const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartDueToday));
