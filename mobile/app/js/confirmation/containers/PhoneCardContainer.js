/**
 * Created by gautam on 2/5/2017.
 */

import { connect } from 'react-redux';
import PhoneCard from '../components/PhoneCard';

/* eslint-disable arrow-body-style */
const mapStateToProps = (state) => {
  const confirmationView = state.get('confirmationView').toJS();
  return {
    title: confirmationView.title,
    subtitle: confirmationView.subtitle,

  };
};

const PhoneCardContainer = connect(mapStateToProps)(PhoneCard);

export default PhoneCardContainer;
