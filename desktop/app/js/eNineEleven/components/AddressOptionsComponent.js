/* eslint-disable arrow-body-style */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Title from '../../common/Title/Title';
import RadioButton from '../../common/RadioButton/';
import HorizontalRule from '../../common/HorizontalRule';

class AddressOptionsComponent extends Component {
  onRadioChange(event) {
    this.setState({
      address: event.target.value,
    });
  }

  submitAddress() {
    const selectedAddress = JSON.parse(this.state.address);
    this.props.onUpdateAddress(Object.assign({}, selectedAddress, { e911AddressValidated: true }), this.props.pageJSON.updateAddressUrl);
  }
  render() {
    const { cqContent, pageJSON } = this.props;
    return (
      <Grid className="pad32">
        <form>
          <Row className="clearfix">
            <Col xs={12}>
              <Row>
                <Col>
                  <Title className="noSidePad">{cqContent.label.OD_ENE_MULTI_ADDRESS_TITLE}</Title>
                  <HorizontalRule />
                </Col>
              </Row>
              <Row>
                <Col xs={12} className="noSidePad">
                  {pageJSON.addressInfo &&
                    pageJSON.addressInfo.map((address, i) => {
                      return (
                        <div key={`zip${i}`}>
                          <RadioButton
                            id={`zip${i}-${address.zipcode}`}
                            name="address"
                            value={JSON.stringify(address)}
                            tabIndex="0"
                            labelClassName="fontDisplayBold"
                            onChange={this.onRadioChange.bind(this)}
                            analyticstrack="e911-address-multi-option"
                          >
                            <div>{address.address1} {address.address2} </div>
                            <div className="pad6 onlyTopPad">{address.city}, {address.state} {address.zipcode}</div>
                          </RadioButton>
                          <HorizontalRule y={1} color="#d8dada" />
                        </div>
                      );
                    })
                  }
                </Col>
              </Row>
              <Row className="footerFixed">
                <Col xs={12}>
                  <button type="button" className="primary button large" analyticstrack="submit-selected-e911-address" onClick={this.submitAddress.bind(this)}>{cqContent.label.OD_ENE_NEXT_BTN}</button>
                </Col>
              </Row>
            </Col>
          </Row>
        </form>
      </Grid>
    );
  }
}

AddressOptionsComponent.propTypes = {
  pageJSON: PropTypes.object,
  onUpdateAddress: PropTypes.func,
  cqContent: PropTypes.object,
};

export default AddressOptionsComponent;
