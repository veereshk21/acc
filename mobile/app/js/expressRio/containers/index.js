/*
 * Created on Wed Aug 30 2017
 *
 * Copyright (c) 2017 Verizon Wireless
 * Author Srikrishna Gumma
 */

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import qs from 'qs';
import * as actionCreators from '../actions';
import AddOfferPage from '../components/';
import ConfirmDevice from '../components/ConfirmDevice';

function mapStateToProps(state) {
  const data = state.toJSON();
  const { cqdata } = data;
  let urlParams = window.location.search.split('?')[1];
  let _defaultSku = null;
  let deviceProdId = null;
  let _defaultDevice = null;
  let _commerceItemId = null;
  if (urlParams) {
    urlParams = qs.parse(urlParams);
    const skufromParams = urlParams.catalogRefId || urlParams.deviceSkuId;
    deviceProdId = urlParams.deviceProdId; // eslint-disable-line
    _defaultDevice = (typeof deviceProdId !== 'undefined') ? data.offerConfigData.devices.filter((dev) => dev.deviceProdId === deviceProdId)[0] : data.offerConfigData.devices[0];
    _defaultSku = (typeof _defaultDevice !== 'undefined') ? _defaultDevice.skus.filter((sku) => sku.id === skufromParams)[0] : null;
    _commerceItemId = urlParams.commerceItemId;
  }
  const defaultDevice = _defaultDevice || data.offerConfigData.devices[0];
  const defaultSku = _defaultSku || defaultDevice.skus[0];
  const defaultInventory = data.inventoryData[defaultSku.id] || {};
  const passFlowParam = data.offerConfigData.urlParam;
  console.log(passFlowParam, urlParams);
  const enableFlow = !!((typeof urlParams !== 'undefined' && typeof urlParams[passFlowParam] !== 'undefined'));
  return {
    ...data,
    defaultSku,
    defaultDevice,
    defaultInventory,
    commerceItemId: _commerceItemId,
    urlParams,
    cqdata,
    isOfferPage: window.isOfferPage,
    skipOfferUrl: window.skipOfferUrl,
    acceptOfferUrl: window.acceptOfferUrl,
    isStaticPage: window.isStaticPage,
    enableFlow,
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);
const FinalComponent = (typeof window.isConfirmPage !== 'undefined' && window.isConfirmPage) ? ConfirmDevice : AddOfferPage;
export default connect(mapStateToProps, mapDispatchToProps)(FinalComponent);
