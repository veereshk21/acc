import React from 'react';
import PropTypes from 'prop-types';
import LeftComponent from '../components/LeftJustified';
import RightComponent from '../components/RightJustified';

class ShopLanding extends React.PureComponent {
  render() {
    const isAgentSite = typeof (window.siteId) !== 'undefined';
    const content = this.props.landingtiles.map((promo, index) => {
      let response = '';
      if (isAgentSite) {
        if (promo.title !== 'Accessories') {
          response = (promo.template === 'right-justified') ?
            <RightComponent promo={promo} key={index} /> :
            <LeftComponent promo={promo} key={index} />;
        } 
      } else {
        response = (promo.template === 'right-justified') ?
          <RightComponent promo={promo} key={index} /> :
          <LeftComponent promo={promo} key={index} />;
      }
      return response;
    });
    return (
      <div>
        {content}
      </div>
    );
  }
}

export default ShopLanding;

ShopLanding.propTypes = {
  landingtiles: PropTypes.object,
};
