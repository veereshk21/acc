/*
 * Created on Wed Aug 30 2017
 *
 * Copyright (c) 2017 Verizon Wireless
 * Author Srikrishna Gumma
 */
import React from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';

const OfferActionComponent = (props) => {
  const {
    selectedSku, defaultDevice, contractTerm, commerceItemId, offerOnly, params, skipOfferUrl, acceptOfferUrl, ButtonMap,
  } = props;
  const offerData = Object.assign({
    catalogRefId: selectedSku.id,
    commerceItemId,
    contractTerm,
    deviceProdId: defaultDevice.deviceProdId,
    deviceSorId: selectedSku.sorId,
  }, {}, params);
  const _skipOfferUrl = skipOfferUrl || ButtonMap.SecondaryButton.actionURL;
  const _acceptOfferUrl = acceptOfferUrl || ButtonMap.PrimaryButton.actionURL;
  const _acceptOfferquery = _acceptOfferUrl.indexOf('?') !== -1 ? '&' : '?';
  return (
    <div className="textAlignCenter">
      <a href={_skipOfferUrl} className="button secondary large margin12 onlySideMargin">{offerOnly.secondaryButton.label}</a>
      <a href={`${_acceptOfferUrl}${_acceptOfferquery}` + qs.stringify(offerData)} className="button primary large margin12 onlySideMargin">{offerOnly.primaryButton.label}</a>
    </div>
  );
};

OfferActionComponent.propTypes = {
  offerOnly: PropTypes.object,
  skipOfferUrl: PropTypes.any,
  acceptOfferUrl: PropTypes.any,
  selectedSku: PropTypes.object,
  defaultDevice: PropTypes.object,
  contractTerm: PropTypes.number,
  commerceItemId: PropTypes.string,
  params: PropTypes.object,
  ButtonMap: PropTypes.object,
};

export default OfferActionComponent;
