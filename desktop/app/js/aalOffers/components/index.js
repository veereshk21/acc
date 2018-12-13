import React from 'react';
import PropTypes from 'prop-types';
import { Col, Grid, Row } from 'react-flexbox-grid';
import MyOffers from './../components/myOffers';
import Loader from '../../common/Loader/Loader';

const aalOffers = (props) => {
  const { isFetching, myOffers } = props;
  return (
    <div className="section group grid positionRelative">
      {(isFetching === true) && <Loader />}
      <Grid fluid>
        <Row className="border_black onlyBottomBorder">
          <Col sm={12} md={12} lg={12}>
            <MyOffers
              {...props}
              myOffers={myOffers}
            />
          </Col>
        </Row>
      </Grid>
    </div>
  );
};
export default aalOffers;
aalOffers.propTypes = {
  isFetching: PropTypes.bool,
  myOffers: PropTypes.object,
};
