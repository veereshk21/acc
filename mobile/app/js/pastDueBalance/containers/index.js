/**
 * Created by hmahad on 5/16/2017.
 */


import { connect } from 'react-redux';

import PastDueBalance from '../components';


const mapStateToProps = (state) => ({
  pastDueData: state.get('pastDueData').toJS(),
  cqContent: state.get('cqContent').toJS(),
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});


export default connect(mapStateToProps, mapDispatchToProps)(PastDueBalance);
