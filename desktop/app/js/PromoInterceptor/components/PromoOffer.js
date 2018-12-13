import React from 'react';
import PropTypes from 'prop-types';
import PromoOptions from './PromoOptions';

const PromoOffer = (props) => {
  const {
    data,
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
      cqContent={cqContent}
      getModalDetails={getModalDetails}
      eligibleModalDetails={eligibleModalDetails}
    />
  );
};

PromoOffer.propTypes = {
  data: PropTypes.object,
  multiPromo: PropTypes.object,
  cqContent: PropTypes.object,
  getModalDetails: PropTypes.func,
  eligibleModalDetails: PropTypes.string,
};

PromoOffer.defaultProps = {};

export default PromoOffer;
