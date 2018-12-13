/**
 * Created by hmahad on 1/10/2017.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { hashHistory } from './../../store';

export default class ZipCodeComponent extends Component {
  constructor(props) {
    super(props);
    this.onZipChange = this.onZipChange.bind(this);
    this.onZipSave = this.onZipSave.bind(this);
    this.state = {
      zipCode: props.zipCode ? props.zipCode : '',
      validZipCode: true,
    };
  }


  componentWillReceiveProps(newProps) {
    if (!newProps.isFetching) {
      window.hideLoader();
    }
    if (newProps.data.hasOwnProperty('validZip')) { // eslint-disable-line no-prototype-builtins
      const validZipCode = newProps.data.validZip;
      if (validZipCode) {
        /* eslint-disable react/prop-types */
        hashHistory.push('/duetoday');
        /* eslint-enable */
        this.props.asyncFetchClear();
      } else {
        this.setState({ validZipCode: false });
      }
    }
  }

  onZipChange(event) {
    const zipc = event.target.value;
    const isValidCode = /(^\d{5}(?:[-\s]\d{4})?$)/g.test(zipc);

    if (!isValidCode) {
      this.setState({ zipCode: event.target.value, validZipCode: false });
      return;
    }
    this.setState({ zipCode: zipc, validZipCode: true });
  }

  onZipSave(event) {
    /* TODO:Make an async call to service to update promo and display on Summary page */
    event.preventDefault();
    this.props.changeZipCode(this.state.zipCode);
  }
  render() {
    let cartErrorMessageElement = '';

    if (!this.props.cartMessages.get('cartReadyforCheckout')) {
      cartErrorMessageElement = <p className="color_red pad6">{this.props.cartMessages.get('message')}</p>;
    } else if (!this.state.validZipCode) {
      cartErrorMessageElement = <p className="color_red pad6">Not a Valid zipcode</p>;
    } else {
      cartErrorMessageElement = <p />;
    }


    return (
      <div className="cartPage_dmBrkdwn pad18 onlySidePad ">
        <form action="POST" name="zipCodeform" className="textAlignCenter">
          <section className="section group pad18 noSidePad">
            <Link to="/duetoday" className="margin12 floatLeft   color_000 fontSize_4 fontWeightBold">
              <span
                className="color_red margin6 onlyRightMargin"
              >&#10094;
              </span> Back
            </Link>
            <h4 className="color_red width80  clearLeft centerBlock textAlignCenter noSideMargin">
              Please enter a new ZIP code
            </h4>
            <div className="margin36 noSideMargin">
              <input type="text" maxLength="5" name="zipcode" onChange={this.onZipChange} value={this.state.zipCode} />
              {cartErrorMessageElement}
            </div>
          </section>

          <section className="section group">
            <div className="">

              {this.state.validZipCode ?
                <button type="button" onClick={this.onZipSave} className="button primary">Save</button> :
                <button type="button" className="button disabled primary">Save</button>}

            </div>
          </section>
        </form>
      </div>);
  }
}
ZipCodeComponent.propTypes = {
  cartMessages: PropTypes.object,
  changeZipCode: PropTypes.func,
  asyncFetchClear: PropTypes.func,
  zipCode: PropTypes.string,
};
