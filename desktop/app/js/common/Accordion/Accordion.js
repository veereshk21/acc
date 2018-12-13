import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Accordion extends Component {
  static propTypes = {
    content: PropTypes.node,
    label: PropTypes.string,
  };

  static defaultProps = {
    content: <div>something</div>,
  };

  constructor(props) {
    super(props);
    this.toggleContent = this.toggleContent.bind(this);
  }

  toggleContent = (e) => {
    e.preventDefault();
  }

  render() {
    const { content, label } = this.props;
    return (
      // TODO: set appropriate styles once css classes available
      <div className="">
        <div onClick={this.toggleContent} role="button">{label}</div>
        <div>{content}</div>
      </div>
    );
  }
}

export default Accordion;
