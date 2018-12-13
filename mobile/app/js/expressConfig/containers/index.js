/**
 * Created by santhra  on 6/15/2017.
 */
/* eslint-disable prefer-destructuring */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import qs from 'qs';
import { withRouter } from 'react-router-dom';


import * as actions from '../actions';
import ExpressConfigComponent from '../components/index';
import ConfirmationComponent from '../components/ConfirmPage';

const mapStatetoProps = (state, ownProps) => {
  console.log(state.toJSON(), ownProps);
  const pageDataJSON = state.toJSON();

  const urlStr = window.location.href;
  const urlSplit = urlStr.split('&');
  const urlqueryparam = urlStr.split('?');
  let urlParams = urlqueryparam[1];
  if (urlParams) urlParams = qs.parse(urlParams);
  let defaultSkuId = '';
  if (urlSplit) {
    const deviceSkuId = urlSplit.find((item) => item.indexOf('deviceSkuId') >= 0);

    if (deviceSkuId) {
      defaultSkuId = deviceSkuId.split('=')[1];
    }
  }
  const passFlowParam = pageDataJSON.expressConfigData.urlParam;
  const enableFlow = !!((typeof urlParams !== 'undefined' && typeof urlParams[passFlowParam] !== 'undefined'));
  return {
    expressConfigData: pageDataJSON.expressConfigData,
    inventoryData: pageDataJSON.inventoryData,
    defaultSkuId: (typeof window.isStaticPage !== 'undefined' && window.isStaticPage) ? defaultSkuId : pageDataJSON.defaultSkuId,
    enableFlow,
    ...ownProps,
  };
};


const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)((typeof window.isConfirmPage !== 'undefined' && window.isConfirmPage) ? ConfirmationComponent : ExpressConfigComponent));
