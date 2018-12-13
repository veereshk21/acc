import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-flexbox-grid';

class ResultsList extends Component {
  onItemSelected = (opt) => {
    this.props.onItemSelected(opt);
  }
  render() {
    const { options } = this.props;
    return (
      <Col xs={12}>
        <ul className="noSidePad noSideMargin">
          {options.map((opt) => (
            <li key={opt.modelName} className="block border_EB noTopBorder noSideBorder pad6 onlySidePad" >
              <a className="block pad12 noSidePad" onClick={() => this.onItemSelected(opt)} analyticstrack="select-model">{opt.modelName}</a>
            </li>
          ))}
        </ul>
      </Col>
    );
  }
}

ResultsList.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};

export default ResultsList;

