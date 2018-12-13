
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import Button from './../../common/Button/Button';
import Loader from '../../common/Loader/Loader';

export default class NextButton extends Component {
  /**
   *
   * @param props
   */
  constructor(props) {
    super(props);
    this.onNextClick = this.nextClick.bind(this);
    this.state = {
      showLoader: false,
    };
  }

  /**
   *
   * @param event
   */
  nextClick() {
    if (this.props.goToUrl !== null) { this.setState({ showLoader: true }); }
    window.location.href = this.props.goToUrl;
  }

  /**
   *
   * @returns {XML}
   */
  render() {
    const { cqKeys } = this.props;
    const isDisabled = this.props.goToUrl === null;
    const nextButtonStatus = isDisabled ? 'disabled' : '';
    return (
      <Row className="footerFixed">
        {this.state.showLoader && <Loader />}
        <Col xs={12}>
          <Button type="button" className={`large button primary width40 ${nextButtonStatus}`} disabled={isDisabled} onClick={this.onNextClick} analyticstrack="submit-numbershare-device">
            {cqKeys.label.OD_NS_PROMPT_NEXT_CTA}
          </Button>
        </Col>
      </Row>);
  }
}


NextButton.propTypes = {
  goToUrl: PropTypes.string,
  cqKeys: PropTypes.shape({
    label: PropTypes.shape({
      OD_TRADEIN_PROMPT_NEXT_CTA: PropTypes.string,
    }),
  }),
};
