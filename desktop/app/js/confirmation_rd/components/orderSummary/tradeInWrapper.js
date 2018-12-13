import React from 'react';
import PropTypes from 'prop-types';

import TradeInList from './tradeInList';
import TradeInListInstantCredit from './tradeInListInstantCredit';

const TradeInWrapper = (props) => (
  props.instantCreditOrder ?
    <TradeInListInstantCredit {...props} />
    :
    <TradeInList {...props} />
);

TradeInWrapper.propTypes = {
  instantCreditOrder: PropTypes.bool,
};

export default TradeInWrapper;
