import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form/immutable';
import { EDIT_STATE } from '../../constants';
// import { normalizePhoneNumber } from '../../../common/validation';
// import MSelect from '../../../common/Select/index';
import EditButton from '../../../common/EditButton/index';

const ISPUDetails = (props) => {
  const { contactInfo } = props;
  return (
    <div style={{ wordWrap: 'break-word' }}>
      <h3 className="fontSize_5 displayInlineBlock verticalBottom margin10 onlyRightMargin">Contact Information</h3>
      <EditButton
        analyticstrack="shipping-ispu-edit-CTA"
        onClick={() => props.updateEditState(EDIT_STATE.SHIPPING, true)}
        className="margin3 onlyLeftMargin"
      >
        Change
      </EditButton>
      <p>{contactInfo.phoneNumber}</p>
      <p>{contactInfo.emailAddress}</p>
    </div>
  );
};


ISPUDetails.propTypes = {
  contactInfo: PropTypes.object,
  updateEditState: PropTypes.func,
};

export default reduxForm({
  form: 'ispuContactInfo',
  enableReinitialize: true,
  destroyOnUnmount: false,
})(ISPUDetails);

