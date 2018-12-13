import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import qs from 'qs';

import * as mdnSelectionActions from '../actions';
import AlwaysEligible from '../components/AlwaysEligible';

const getTransferObject = (list) => {
  const data = {};
  data.name = {};
  data.deviceName = {};
  for (const i in list) {
    data.name[list[i].mtn] = list[i].nickname;
    data.deviceName[list[i].mtn] = list[i].deviceName;
  }
  return data;
};

const mapStateToProps = (state, ownProps) => {
  const data = state.toJS();
  const mdnQstring = qs.parse(ownProps.location.search);
  const mdnFromUrl = mdnQstring['?mdn'] || mdnQstring.mdn;
  const asyncCallStatus = state.get('asyncCallStatus');
  const selectedMDN = (state.get('selectedMDN') ? state.get('selectedMDN') : window.mdnJSON.output.mtnDetailsList.filter((mdn) => mdn.mtn === mdnFromUrl)[0]);
  const transferObject = getTransferObject(data.mtnDetailsList);

  return {
    selectedMDN,
    mdnSelectionView: state.get('mdnSelectionView'),
    submitAgreementResponse: state.get('submitAgreementResponse'),
    loaderFlag: state.get('loaderFlag'),
    cqJSON: state.get('cqContent').toJS() || { html: {}, label: {}, error: {} },
    formData: state.get('form'),
    transferTakerMTNs: data.transferTakerMTNs,
    transferGiverMTNs: data.transferGiverMTNs,
    asyncCallStatus,
    transferObject,
  };
};
const mapDispatchToProps = (dispatch) => bindActionCreators(mdnSelectionActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AlwaysEligible);
