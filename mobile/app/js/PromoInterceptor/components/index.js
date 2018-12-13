import React from 'react';
import PropTypes from 'prop-types';
import PromoOptions from './PromoOptions';

const Landing = (props) => {
  const {
    data,
    getPromoDetails,
    multiPromo,
    cqContent,
    getModalDetails,
    eligibleModalDetails,
  } = props;
  const _promoOptions = data.promoOptions || [];
  return (
    <PromoOptions
      _promoOptions={_promoOptions}
      data={data}
      optionCallType={multiPromo}
      getPromoDetails={getPromoDetails}
      cqContent={cqContent}
      getModalDetails={getModalDetails}
      eligibleModalDetails={eligibleModalDetails}
    />
  );
};

Landing.propTypes = {
  data: PropTypes.object,
  getPromoDetails: PropTypes.func,
  multiPromo: PropTypes.bool,
  cqContent: PropTypes.object,
  getModalDetails: PropTypes.func,
  eligibleModalDetails: PropTypes.string,
};

Landing.defaultProps = {};

export default Landing;
