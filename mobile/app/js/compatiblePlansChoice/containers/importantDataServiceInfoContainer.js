import { connect } from 'react-redux';
import ImportantDataServiceInfo from '../components/importantDataServiceInfo';

const mapStatetoProps = (state) => {
  const cqContent = state.get('cqContent').toJS();

  return {
    cqContent,
  };
};

export default connect(mapStatetoProps)(ImportantDataServiceInfo);
