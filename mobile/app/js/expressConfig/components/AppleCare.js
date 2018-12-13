/*
 Renders a Apple care details
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BackButton from '../../common/BackButton/BackButton';
import Img from '../../common/Img/Img';

class Applecare extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    const { appleCareData } = this.props;
    return (
      <div className="pad12 onlyTopPad">
        <BackButton to="/" >{appleCareData.backText}</BackButton>
        <div className="pad24 onlySidePad">
          <h4 className="fontSize_3 textAlignCenter centerBlock color_red pad12 noSidePad">
            {appleCareData.label}
          </h4>
          <div>
            <div className="col span_2_of_5 pad6 onlyTopPad no-gutter">
              <Img src={appleCareData.imgURL} />
            </div>
            <div className="col span_3_of_5 pad6 onlyTopPad no-gutter">{appleCareData.description}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Applecare;

Applecare.propTypes = {
  appleCareData: PropTypes.object,
};
