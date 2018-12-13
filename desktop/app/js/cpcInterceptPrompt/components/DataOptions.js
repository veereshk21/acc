import { reduxForm } from 'redux-form/immutable';
import { Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React from 'react';

import RadioButton from './../../common/RadioButton/index';

const DataOptions = (props) => (
  <div className="dueMonthlyBreakdown fontSize_4" style={{ width: '50%', margin: '18px 0 0 12px' }}>
    <div className="bold pad8 onlyLeftPad fontSize_6 dataHeader background_gray_three">
      { props.cq.label.DT_OD_CPC_INTERCEPT_CHOOSE_DATA_TEXT}
    </div>
    <div>
      {props.dataOptions.map((data, idx) => (
        <Row className="section group pad18 onlyLeftPad clearfix color_gray_ten dataOption background_white" style={{ margin: 0 }}>
          <div className="margin20 onlyRightMargin floatLeft">
            <RadioButton
              id={'dataOption_' + props.mtn + '_' + idx}
              name={'dataOption_' + props.mtn}
              value={data.sfoSorId}
              analyticstrack="select-cpcIntercept-dataOptions-radio"
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

DataOptions.propTypes = {
  dataOptions: PropTypes.array,
  cq: PropTypes.object,
  mtn: PropTypes.string,
};

export default reduxForm({
  form: 'cpcForm',
})(DataOptions);
