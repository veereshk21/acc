/**
 * Created by hmahad on 12/27/2016.
 */
import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    zIndex: 1000,
  },
  content: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    right: '0px',
    bottom: '0px',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '0px',
    outline: 'none',
    padding: '0px',
  },
};

export default class EmptyCartOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: this.props.isModalOpen,
    };
  }

  render() {
    return (
      <ReactModal isOpen={this.state.isModalOpen} styles={customStyles} contentLabel={this.props.contentLabel}>
        <section>
          <h1>Emtpy your cart</h1>
          <p>This will remove all the cart items</p>
          <button type="button">Empty Cart</button>
          <button>Cancel</button>
        </section>
      </ReactModal>);
  }
}

EmptyCartOverlay.propTypes = {
  isModalOpen: PropTypes.bool,
  contentLabel: PropTypes.string,
};
