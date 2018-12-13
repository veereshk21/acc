import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import modEligible from './../components/index';

/**
 * Returns only the first and last item in the array
 * @param modEligibleCheck
 * @returns {Array}
 */

const mapStateToProps = (state) => {
  const pageJSON = state.get('completeJSON').toJS();
  const data = pageJSON && pageJSON.output;
  const asyncCallStatus = state.get('asyncCallStatus');
  const cqContent = state.get('cqContent').toJS();
  return {
    cqContent,
    title: data && data.deviceInfo.title,
    description: data && data.deviceInfo.description,
    deviceImgURL: data && data.deviceInfo.deviceImgURL,
    deviceBrand: data && data.deviceInfo.deviceBrand,
    deviceName: data && data.deviceInfo.deviceName,
    dueTodayPrice: data && data.deviceInfo.dueTodayPrice,
    dueMonthlyPrice: data && data.deviceInfo.dueMonthlyPrice,
    ctaText: data && data.deviceInfo.ctaText,
    noThanksURL: data && data.noThanksURL,
    redirectionURL: data && data.redirectionURL,
    isModEligible: pageJSON && pageJSON.statusCode && (pageJSON.statusCode !== '01' && pageJSON.statusCode !== '04'),
    errorMap: pageJSON && pageJSON.errorMap,
    statusCode: pageJSON && pageJSON.statusCode,
    noThanksText: data && data.deviceInfo.noThanksText,
    ...asyncCallStatus,

  };
};


const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(modEligible);
