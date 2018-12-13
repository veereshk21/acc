import { connect } from 'react-redux';

import NextButton from '../components/NextButton';


const mapStateToProps = (state) => {
  const data = state.toJSON();
  return {
    goToUrl: data.numberShareOptions.goToUrl,
    cqKeys: data.numberShareOptions.cqKeys,
  };
};

export default connect(mapStateToProps)(NextButton);
