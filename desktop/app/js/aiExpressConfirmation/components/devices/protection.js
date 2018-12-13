import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';

class Protection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  render() {
    const { preSelectedProtection } = this.props;
    return (
      <div id="protectionSection" className="pad24 onlyTopPad">
        <div className="accordionItem border_black onlyTopBorder pad6 onlyTopPad">
          <Row>
            <Col xs={9}>
              <h3 className="fontSize_5 displayInlineBlock">Device protection</h3>
            </Col>
            <Col xs={2}>
              <p className="fontSize_5 bold">
                <span>{`$${preSelectedProtection.price}${preSelectedProtection.priceTerm || ''}`}</span>
              </p>
            </Col>
            <Col xs={1} aria-hidden className="fontSize_6 lineHeight18 overflowHidden accordion_icon textAlignRight" />
          </Row>

          <hr style={{ borderTop: '2px solid #E4E4E4', marginTop: 20 }} />

          <div className="">
            { preSelectedProtection.showProtectionDescription ?
              <p className="protectionIntroText pad20 noSidePad" dangerouslySetInnerHTML={{ __html: preSelectedProtection.introText }} /> :
              <p>
                <span>{preSelectedProtection.name}</span>
              </p>}
          </div>
        </div>
      </div>
    );
  }
}

Protection.propTypes = {
  // cqContent: PropTypes.object,
  preSelectedProtection: PropTypes.object,
};
export default reduxForm({})(connect((state) => ({ forms: state.get('form').toJS() }))(Protection));
