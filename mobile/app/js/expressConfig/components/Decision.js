/* eslint-disable prefer-destructuring */
import React from 'react';
import PropTypes from 'prop-types';
// import { hashHistory } from './../../store';
// import { connect } from 'react-redux';
import RadioButton from './../../common/RadioButton/RadioButton';

class Decision extends React.Component {
  static propTypes = {
  }
  constructor(props) {
    super(props);
    this.state = {
      customerType: null,
    };
  }

  // getQueryVariable(variable) {
  //   const query = window.location.href.split('?')[1];
  //   const vars = query.split('&');
  //   for (let i = 0; i < vars.length; i++) {
  //     const pair = vars[i].split('=');
  //     if (pair[0] === variable) { return pair[1]; }
  //   }
  //   return (false);
  // }

  toggle(data) {
    this.setState({ customerType: data });
  }

  continue() {
    const deviceId = this.props.deviceId; // this.getQueryVariable('deviceId');// this.props.productDetails.deviceId;
    const sorId = this.props.deviceSorId; // this.getQueryVariable('sorId'); // this.props.productDetails.deviceSorId;
    const skuId = this.props.deviceSkuId; // this.getQueryVariable('skuId');
    const contractTerm = this.props.contractTerm; // this.getQueryVariable('contractTerm');
    let aalDeviceIdParam = '';
    let aalskuIdParam = '';
    let sorIdParam = '';
    let aalsorIdParam = '';
    let contractParam = '';
    const aalTradeInSelected = '&tradeinSelected=' + this.props.tradeinSelected; // '&tradeinSelected=false';
    if (deviceId) {
      aalDeviceIdParam = 'deviceProdId=' + deviceId;
    }
    if (skuId) {
      aalskuIdParam = '&catalogRefId=' + skuId;
    }
    if (sorId) {
      sorIdParam = '&deviceSkuId=' + sorId;
      aalsorIdParam = '&deviceSorId=' + sorId;
    }
    if (contractTerm) {
      contractParam = '&contractTerm=' + contractTerm;
    }
    if (this.state.customerType === 'new') {
      const nextUrl = this.props.preOrderExpressConfigJSON.devices[this.props.selectedModel].prospectSeoUrl || '/prospect/preorder/start';
      window.location.href = nextUrl + sorIdParam + contractParam + aalTradeInSelected;
    } else if (this.state.customerType === 'existing') {
      const loggedInUrl = this.props.preOrderExpressConfigJSON.loginUrl + '?goto=' + encodeURIComponent(this.props.preOrderExpressConfigJSON.afterLoginUrl + '&' + aalDeviceIdParam + aalskuIdParam + aalsorIdParam + contractParam + aalTradeInSelected);
      window.location.href = loggedInUrl;
    }
  }

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

Decision.propTypes = {
  deviceId: PropTypes.string,
  deviceSorId: PropTypes.string,
  deviceSkuId: PropTypes.string,
  contractTerm: PropTypes.number,
  tradeinSelected: PropTypes.bool,
  preOrderExpressConfigJSON: PropTypes.object,
  selectedModel: PropTypes.string,
};

export default Decision;
