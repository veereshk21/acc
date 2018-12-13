/**
 * Created by gautam on 2/5/2017.
 */

import { connect } from 'react-redux';
import ProtectionCard from '../components/ProtectionCard';

/* eslint-disable arrow-body-style */
const mapStateToProps = (state) => {
  const data = state.get('confirmationView').toJS();
  return {
    cq: data.cqJSON,
    protectionURL: data.protectionURL,
  };
};

const ProtectionCardContainer = connect(mapStateToProps)(ProtectionCard);

export default ProtectionCardContainer;
