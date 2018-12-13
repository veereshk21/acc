import { connect } from 'react-redux';
import LearnMore from '../components/LearnMore';

const mapStatetoProps = (state) => {
  const data = state.toJSON();
  return {
    cpcPromptInfo: data.output,
    cqJSON: data.cqJSON,
  };
};

export default connect(mapStatetoProps)(LearnMore);
