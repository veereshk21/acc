import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Title from '../../../../common/Title/Title';
import HorizontalRule from '../../../../common/HorizontalRule';
import AddCardForm from './AddCardForm';
import Loader from '../../../../common/Loader/Loader';
import BackButton from '../../../../common/BackButton/';

class AddNewCard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { isFetching, cq } = this.props;
    return (
      <Grid className="noSidePad pad12">
        {isFetching === true && <Loader />}
        <BackButton to="/" />
        <Row className="noSideMargin pad24 onlySidePad">
          <Col xs={12}>
            <Title className="noSidePad margin24 onlyTopMargin">{cq.label.OD_CHECKOUT_PAYMENT_NEW_CARD_TITLE}</Title>
            <HorizontalRule />

          </Col>
        </Row>
        <AddCardForm {...this.props} />
      </Grid>
    );
  }
}
AddNewCard.propTypes = {
  isFetching: PropTypes.bool,
  cq: PropTypes.object,
  stepsCompleted: PropTypes.object,
};

export default AddNewCard;
