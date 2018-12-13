import React from 'react';
import PropTypes from 'prop-types';
import { Row, Grid } from 'react-flexbox-grid';
import Loader from '../../common/Loader/Loader';
import CreditCheck from './CreditCheck';

class CreditHoldError extends React.PureComponent {
  constructor(props) {
    super(props);
    this.goToNextStage = this.goToNextStage.bind(this);
  }

  goToNextStage() {
    this.setState({ initialStage: false });
  }

  render() {
    const { isFetching, initiateCheckout } = this.props;
    return (
      <div>
        {isFetching === true && <Loader />}
        <div className="section clearfix" style={{ marginRight: 0, marginLeft: 0 }}>
          <Grid fluid>
            <CreditCheck details={this.props.details} initiateCheckout={initiateCheckout} />
          </Grid>
        </div>
      </div>
    );
  }
}

CreditHoldError.propTypes = {
  isFetching: PropTypes.bool,
  details: PropTypes.object,
  initiateCheckout: PropTypes.func,
};
export default CreditHoldError;
