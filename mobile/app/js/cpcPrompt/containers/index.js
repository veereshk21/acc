import { connect } from 'react-redux';
import cpcPrompt from '../components';

const mapStatetoProps = (state) => {
  const data = state.toJSON();
  return {
    cpcPromptInfo: data.output,
    cqJSON: data.cqJSON,
  };
};

export default connect(mapStatetoProps)(cpcPrompt);
