import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Image from './../Image';

class Panel extends Component {
  static defaultProps = {
    content: {},
  };

  static propTypes = {
    content: PropTypes.object,
  };

  render() {
    const { content } = this.props;

    return (
      // TODO: set appropriate styles once css classes once available
      <div>
        <div>
          {content.topSection}
        </div>
        <div>
          {content.title}
        </div>
        <div>
          <Image href={content.image.href} />
        </div>
        <div>
          {content.imageContent}
        </div>
        <div>
          {content.price}
        </div>
        <div>
          {content.bottomSection}
        </div>
      </div>
    );
  }
}

export default Panel;
