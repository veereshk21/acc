import React from 'react';
import PropTypes from 'prop-types';
import BackButton from './../../common/BackButton/BackButton';
import { hashHistory } from './../../store';

const MoreData = ({ myOfferInfo, contentKey }) => {
  const conkey = contentKey ? myOfferInfo[contentKey] : myOfferInfo.learnMoreContent;
  return (
    <div className="pad18 onlyTopPad">
      <BackButton onClick={() => hashHistory.back()} />
      <div className="pad18 noTopPad" dangerouslySetInnerHTML={{ __html: conkey }} />
    </div>
  );
};
MoreData.propTypes = {
  myOfferInfo: PropTypes.object,
  contentKey: PropTypes.any,
};

export default MoreData;
