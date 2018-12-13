/*
 * Created on Wed Aug 30 2017
 *
 * Copyright (c) 2017 Verizon Wireless
 * Author Srikrishna Gumma
 */

import React from 'react';
import PropTypes from 'prop-types';
import Title from '../../common/Title/Title';

export const Header = (props) => { // eslint-disable-line 
  const { data, isOfferPage } = props;
  return (
    <div className="pad24 noSidePad">
      {
        isOfferPage ?
          (
            <div>
              <Title className="h2">{data.offerOnly.title}</Title>
              <p className="pad12" dangerouslySetInnerHTML={{ __html: data.offerOnly.offerContent }} />
            </div>
          ) : (
            <div className="textAlignLeft">
              <Title className="h2">{data.expressOnly.title}</Title>
              <p className="pad12" dangerouslySetInnerHTML={{ __html: data.expressOnly.offerText }} />
            </div>
          )
      }

    </div>
  );
};

Header.propTypes = {
  data: PropTypes.object,
  isOfferPage: PropTypes.any,
};

export default Header;
