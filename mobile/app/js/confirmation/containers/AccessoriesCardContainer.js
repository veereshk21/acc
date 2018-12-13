/**
 * Created by gautam on 2/5/2017.
 */

import { connect } from 'react-redux';
import AccessoriesCard from '../components/AccessoriesCard';

/* eslint-disable arrow-body-style */
const mapStateToProps = (state) => {
  const data = state.get('confirmationView').toJS();
  return {
    cq: data.cqJSON,
    accessoriesURL: data.accessoriesURL,
  };
};

const AccessoriesCardContainer = connect(mapStateToProps)(AccessoriesCard);

export default AccessoriesCardContainer;
