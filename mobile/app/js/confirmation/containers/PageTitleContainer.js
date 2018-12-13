/**
 * Created by gautam on 2/5/2017.
 */

import { connect } from 'react-redux';
import PageTitle from '../components/PageTitle';

/* eslint-disable arrow-body-style */
const mapStateToProps = (state) => {
  return {
    title: state.get('confirmationView').toJS().title,
  };
};

const PageTitleContainer = connect(mapStateToProps)(PageTitle);

export default PageTitleContainer;
