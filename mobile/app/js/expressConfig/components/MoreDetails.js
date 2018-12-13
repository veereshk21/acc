/*
 Renders a Apple care details
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Button from '../../common/Button/Button';
import BackButton from '../../common/BackButton/BackButton';

class MoreDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moreDetailsData: null,
    };
  }

  componentDidMount() {
    axios.get(window.moreDetails).then((resp) => {
      const responseData = resp.data;
      this.setState({ moreDetailsData: responseData.output });
    }).catch((err) => {
      console.log(err);
    });
  }

  backButtonCall() {
    this.props.onBackChange(false);
  }

  render() {
    const { moreDetailsData } = this.state;
    return (
      <div className="pad12 onlyTopPad">
        {moreDetailsData !== null &&
          <div>
            <BackButton onClick={this.backButtonCall.bind(this)}>{moreDetailsData.backButtonText}</BackButton>
            <div className="pad24 onlySidePad" dangerouslySetInnerHTML={{ __html: moreDetailsData.detailsInfo }} />
            <div className="textAlignCenter clearBoth width100 pad18 noSidePad"> <Button href="#" onClick={this.backButtonCall.bind(this)} className="large button primary"> {moreDetailsData.gotItText}</Button></div>
          </div>
        }
      </div>
    );
  }
}

export default MoreDetails;

MoreDetails.propTypes = {
  // MoreDetailsData: PropTypes.object,
  onBackChange: PropTypes.func,
};
