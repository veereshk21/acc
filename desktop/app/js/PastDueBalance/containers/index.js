/**
 * Created by hmahad on 5/16/2017.
 */


import { connect } from 'react-redux';

import PastDueBalance from '../components';

const mapStateToProps = (state) => { // eslint-disable-line
  return {
    pastDueData: state.get('pastDueData').toJS(),
    cqContent: state.get('cqContent').toJS(),
  };
};

const mapDispatchToProps = (dispatch) => { // eslint-disable-line
  return {
    dispatch,
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(PastDueBalance);
