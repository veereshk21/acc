import React from 'react';
import PropTypes from 'prop-types';
import { hashHistory } from './../../store';
import BackButton from '../../common/BackButton/BackButton';
import Button from '../../common/Button/Button';
import Title from '../../common/Title/Title';

export default class ReviewPlanDetails extends React.PureComponent {
  render() {
    const { displayDetail, cqData, isTaxesDetail } = this.props;
    const cqCont = cqData;
    return (
      <div className="pad12 onlyTopPad">
        <BackButton onClick={() => hashHistory.goBack()} >
          {cqCont.label.OD_PLAN_SELECTION_BACK_BTN_TEXT}
        </BackButton>
        <Title>{(typeof isTaxesDetail !== 'undefined' && isTaxesDetail) ? cqCont.label.OD_PLAN_SELECTION_TAXES_DETAILS_POPUP_TEXT : cqCont.label.OD_PLAN_SELECTION_DETAILS_POPUP_TEXT}</Title>
        <div className="pad24" dangerouslySetInnerHTML={{ __html: displayDetail }} />
        <Button onClick={() => hashHistory.goBack()} className="large button primary centerBlock width30">{cqCont.label.OD_COMPARE_PLAN_GOT_IT_BUTTON_TEXT}</Button>
      </div>
    );
  }
}
ReviewPlanDetails.propTypes = {
  displayDetail: PropTypes.any,
  cqData: PropTypes.object,
  isTaxesDetail: PropTypes.bool,
};
