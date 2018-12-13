import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hashHistory } from './../../store';
import BackButton from '../../common/BackButton/BackButton';
import Button from '../../common/Button/Button';
import Title from '../../common/Title/Title';
import Loader from '../../common/Loader/Loader';

class TaxDetails extends Component {
  componentDidMount() {
    const { compatiblePlans, comparePlanDetails } = this.props;
    if (Object.keys(comparePlanDetails.data).length === 0) this.props.getComparePlansData({ planSorId: this.props.planSorId, comparePlanURL: compatiblePlans.comparePlanURL, plansPage: compatiblePlans.plansPage });
  }
  render() {
    const { cqContent, comparePlanDetails } = this.props;

    return (
      <div className="pad12 onlyTopPad">
        {comparePlanDetails.isFetching && <Loader />}
        <BackButton onClick={() => hashHistory.goBack()}>
          {cqContent.label.OD_PLAN_SELECTION_BACK_BTN_TEXT}
        </BackButton>
        <Title>{cqContent.label.OD_PLAN_SELECTION_TAXES_DETAILS_POPUP_TEXT}</Title>
        <div
          className="pad24"
          dangerouslySetInnerHTML={{ __html: comparePlanDetails.data.taxesDetails }}
        />
        <Button
          onClick={() => hashHistory.goBack()}
          className="large button primary centerBlock width30"
          analyticstrack="tax-details-back"
        >{cqContent.label.OD_COMPARE_PLAN_GOT_IT_BUTTON_TEXT}
        </Button>
      </div>);
  }
}
TaxDetails.propTypes = {
  compatiblePlans: PropTypes.object,
  comparePlanDetails: PropTypes.object,
  getComparePlansData: PropTypes.func,
  planSorId: PropTypes.string,
  cqContent: PropTypes.object,
};

export default TaxDetails;
