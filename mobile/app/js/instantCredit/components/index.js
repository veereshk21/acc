/**
 * Created on 08/09/2018.
 */
import React from 'react';
import PropTypes from 'prop-types';
import InstantCreditComponent from './instantCredit';
import OneTradeInOnePurchase from './OneTradeInOnePurchase';
import { hashHistory } from '../../store';

export default class ParentComponent extends React.PureComponent {
  componentWillMount() {
    if (!this.props.errorCheck) {
      hashHistory.push('/genericError');
    }
  }
  render() {
    const { isOneTradeInOnePurchase } = this.props;
    return (
      <div>
        {isOneTradeInOnePurchase === 'true' ?
          <OneTradeInOnePurchase {...this.props} />
          :
          <InstantCreditComponent {...this.props} />
        }
      </div>
    );
  }
}

ParentComponent.propTypes = {
  isOneTradeInOnePurchase: PropTypes.bool,
  errorCheck: PropTypes.object,
};
