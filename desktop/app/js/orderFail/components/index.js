import React from 'react';
import PropTypes from 'prop-types';
import { Row, Grid } from 'react-flexbox-grid';
import Loader from '../../common/Loader/Loader';
import OrderFail from './OrderFail';

class OrderFailError extends React.PureComponent {
  goToNextPage() {

  }

  render() {
    const { isFetching } = this.props;
    return (
      <div>
        {isFetching === true && <Loader />}
        <Row className="section clearfix" style={{ marginRight: 0, marginLeft: 0 }}>
          <Grid fluid>
            <OrderFail details={this.props.details} />
          </Grid>
        </Row>
      </div>
    );
  }
}

OrderFailError.propTypes = {
  isFetching: PropTypes.bool,
  details: PropTypes.object,
};
export default OrderFailError;
