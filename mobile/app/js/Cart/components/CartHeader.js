/**
 * Created by hmahad on 12/26/2016.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import Title from '../../common/Title/Title';

export default class CartHeader extends React.Component { // eslint-disable-line
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    console.log('Error:', error, '\n Info:', info);
    // You can also log the error to an error reporting service
  }
  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <div>Something went wrong.</div>;
    }
    const { title, subText, nextDayShippingMessage } = this.props;
    return (
      <Row className="noSideMargin pad24 onlySidePad">
        <Col xs={12}>
          <Title className="textAlignLeft">{title}</Title>
          <div className="textAlignLeft">
            {(subText !== null) && <p >{subText}</p>}
            {(nextDayShippingMessage !== null) && <p >{nextDayShippingMessage}</p>}
          </div>
        </Col>
      </Row>
    );
  }
}

CartHeader.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  subText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  nextDayShippingMessage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
};
