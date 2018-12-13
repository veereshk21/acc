/**
 * Created by gautam on 2/5/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';

const EstimatedDelivery = ({
  text, sddWindow, cqContent,
}) => {
  const today = new Date().toLocaleString('en-US', { month: 'short', day: 'numeric' });
  return (
    <div className="fontSize_2 fontTextBold textAlignCenter">
      {sddWindow ?
        <p dangerouslySetInnerHTML={{ __html: cqContent.html.OD_CONFIRMATION_SHIPPING_SDD_WINDOW.replace('$DATE$', today).replace('$TIME$', sddWindow) }} />
        :
        <p>{text}</p>
      }
    </div>
  );
};

EstimatedDelivery.propTypes = {
  text: PropTypes.string.isRequired,
  sddWindow: PropTypes.string,
  cqContent: PropTypes.object,
};

export default EstimatedDelivery;
