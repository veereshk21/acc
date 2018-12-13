import { reduxForm } from 'redux-form/immutable';
import { Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React from 'react';

import RadioButton from './../../common/RadioButton/index';

const MessageOptions = (props) => (
  <div className="dueMonthlyBreakdown fontSize_4" style={{ width: '50%', margin: '18px 0 0 12px' }}>
    <div className="bold pad8 onlyLeftPad fontSize_6 dataHeader background_gray_three">
      { props.cq.label.DT_OD_CPC_INTERCEPT_CHOOSE_MESSAGE_TEXT}
    </div>
    <div>
      {props.messageOptions.map((data, idx) => (
        <Row className="section group pad18 onlyLeftPad clearfix color_gray_ten dataOption background_white" style={{ margin: 0 }}>
          <div className="margin20 onlyRightMargin floatLeft">
            <RadioButton
              id={'messageOption_' + props.mtn + '_' + idx}
              name={'messageOption_' + props.mtn}
              value={data.sfoSorId}
              analyticstrack="select-cpcIntercept-messageOption-radio"
            />
          </div>
          <div className="floatLeft span_10_of_12 pad3 onlyTopPad">
            <span
              className=""
            >${data.price}&nbsp;{data.displayName}
            </span>
          </div>
        </Row>
      )
      )}
    </div>
  </div>
);

MessageOptions.propTypes = {
  messageOptions: PropTypes.array,
  cq: PropTypes.object,
  mtn: PropTypes.string,
};

export default reduxForm({
  form: 'cpcForm',
})(MessageOptions);
