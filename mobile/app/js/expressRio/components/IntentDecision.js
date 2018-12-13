/*
 * Created on Wed Aug 30 2017
 *
 * Copyright (c) 2017 Verizon Wireless
 * Author Srikrishna Gumma
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import RadioButton from '../../common/RadioButton/RadioButton';

class IntentDecision extends Component {
  constructor() {
    super();
    this.state = {
      customerType: null,
    };
  }
  toggle = (data) => {
    this.setState({
      customerType: data,
    });
  };
  continue = () => {
    const {
      defaultDevice, loginUrl, afterLoginUrl, selectedSku, contractTerm, cqdata,
    } = this.props;
    const { customerType } = this.state;
    // form data for existing customer
    const loggedIn = Object.assign({
      deviceProdId: defaultDevice.deviceProdId,
      catalogRefId: selectedSku.id,
      deviceSorId: selectedSku.sorId,
    }, {}, cqdata.params);
    // form data for new customer
    const newCust = {
      deviceSkuId: selectedSku.sorId,
    };
    // create form data
    const formData = Object.assign({
      contractTerm,
    }, {}, (customerType === 'existing' ? loggedIn : newCust));

    // NSE GOTO URL
    const nextUrl = defaultDevice.prospectSeoUrl;
    // existing GOTO URL
    const _loginUrl = loginUrl + '?goto=' + encodeURIComponent(afterLoginUrl + '&' + qs.stringify(formData));
    // form GOT URL
    const goToURL = ((customerType === 'existing') ? _loginUrl : (nextUrl + (nextUrl.indexOf('?') !== -1 ? '&' : '?') + qs.stringify(formData)));
    // redirect to page
    window.location.href = goToURL;
  };
  render() {
    return (
      <div>
        <section className="section group pad12 onlyTopPad">
          <div className="textAlignCenter pad18 onlySidePad">
            <h1 className="fontSize_6">Are you a new or existing customer</h1>
          </div>
        </section>
        <section className="section group pad24 onlyTopPad">
          <div className="width100 table clearfix pad15">
            <div className="table_tr">
              <div className="table_td  verticalAlignMiddle width30">
                <RadioButton id="newcustomer" checked={this.state.customerType === 'new'} onChange={() => this.toggle('new')} aria-label="New Customer" name="customertype" />
              </div>
              <div className="width70 verticalAlignMiddle table_td ">
                <span className="fontSize_4">New Customer</span>
              </div>
            </div>
          </div>
          <div className="width100 table clearfix pad15">
            <div className="table_tr">
              <div className="table_td  verticalAlignMiddle width30">
                <RadioButton id="existingcustomer" checked={this.state.customerType === 'existing'} onChange={() => this.toggle('existing')} aria-label="Customer number" name="customertype" />
              </div>
              <div className="width70 verticalAlignMiddle table_td ">
                <div className="fontSize_4">Existing Customer</div>
              </div>
            </div>
          </div>
        </section>
        <section className="section group ensighten_topButtons pad24 onlyTopPad">
          <div className="col span_5_of_5 textAlignCenter">
            <button
              type="button"
              role="button"
              disabled={this.state.customerType === null}
              className="button primary large margin6 onlySideMargin"
              onClick={() => this.continue()}
            >Continue
            </button>
          </div>
        </section>
      </div>
    );
  }
}

IntentDecision.propTypes = {
  defaultDevice: PropTypes.object,
  loginUrl: PropTypes.string,
  afterLoginUrl: PropTypes.string,
  selectedSku: PropTypes.object,
  contractTerm: PropTypes.number,
  cqdata: PropTypes.object,
};

export default IntentDecision;
