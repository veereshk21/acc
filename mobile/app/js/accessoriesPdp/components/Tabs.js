/**

* Render the tabs component

* */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import Tab from './Tab';

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = { activeTab: this.props.active };
  }

  renderTabs() {
    const self = this;
    const tabs = this.props.list.map((item) => (
      <Tab text={item} key={item} isActive={item === self.props.active} role="tab" onClick={self.props.changeTabFunc.bind(null, item)} />
    ));
    return tabs;
  }

  render() {
    return (
      <Row className="pad12 noLeftPad headerNav background_FF">

        <Col xs={12}>
          {this.renderTabs()}
        </Col>
      </Row>
    );
  }
}

Tabs.defaultProps = {
  list: [],
  active: '',
};

Tabs.propTypes = {
  list: PropTypes.array,
  active: PropTypes.string,
};

export default Tabs;
