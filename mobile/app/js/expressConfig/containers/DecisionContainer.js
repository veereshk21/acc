/**
 * Created by santhra  on 6/15/2017.
 */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as actions from '../actions';
import DecisionComponent from '../components/Decision';

const mapStatetoProps = (state, ownprops) => {
  const expressConfigDataJSON = state.toJSON();
  console.log(ownprops);
  return {
    preOrderExpressConfigJSON: expressConfigDataJSON.expressConfigData,
    selectedModel: ownprops.match.params.modelIndex,
    deviceId: ownprops.match.params.deviceId,
    deviceSkuId: ownprops.match.params.deviceSkuId,
    deviceSorId: decodeURIComponent(ownprops.match.params.deviceSorId),
    contractTerm: ownprops.match.params.contractTerm,
    tradeinSelected: ownprops.match.params.isTradeIn,
  };
};


const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(DecisionComponent));
