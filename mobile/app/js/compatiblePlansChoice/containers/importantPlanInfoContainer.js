import { connect } from 'react-redux';
import ImportantPlanInfo from '../components/importantPlanInfo';

const mapStatetoProps = (state) => {
  const cqContent = state.get('cqContent').toJS();

  return {
    cqContent,
  };
};

export default connect(mapStatetoProps)(ImportantPlanInfo);
