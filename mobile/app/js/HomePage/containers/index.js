import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ShopLanding from './ShopLanding';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <ShopLanding landingtiles={this.props.promotionsInfo} />
        <ShopLanding landingtiles={this.props.shopLandingInfo} />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const data = state.toJSON();
  return {
    promotionsInfo: data.output.promotionsInfo,
    shopLandingInfo: data.output.shopLandingInfo,
  };
};
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

HomePage.propTypes = {
  promotionsInfo: PropTypes.array,
  shopLandingInfo: PropTypes.array,
};
