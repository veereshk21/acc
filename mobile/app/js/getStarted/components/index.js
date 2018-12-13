/* eslint-disable react/no-did-mount-set-state */
import React from 'react';
import PropTypes from 'prop-types';
import Title from '../../common/Title/Title';
import Button from '../../common/Button/Button';
import Loader from './../../common/Loader/Loader';

export default class GetStarted extends React.Component {
  constructor() {
    super();
    this.state = {
      displayLoader: false,
    };
    this.onClick = this.onClick.bind(this);
  }
  componentDidMount() {
    this.setState({ displayLoader: false });
  }
  onClick() {
    this.setState({
      displayLoader: true,
    });
    window.location = this.props.goToUrl;
  }
  render() {
    const { cqContent } = this.props;
    return (
      <div>
        {this.state.displayLoader && <Loader />}
        <div className="pad24">
          <Title className="fontSize_6 textAlignCenter">
            {cqContent.label.OD_GET_STARTED_SCREEN_TITLE}
          </Title>
          <div className="noSidePad pad36" >
            <div className="margin100 noSideMargin textAlignCenter media_splash pad20 background_lightblue" >
              <img src={cqContent.label.OD_GET_STARTED_SCREEN_IMG_URL} alt={cqContent.label.OD_GET_STARTED_SCREEN_TITLE} className="img_boxShadow" />
            </div>
          </div>
          <p className="textAlignCenter fontSize_3">
            {cqContent.label.OD_GET_STARTED_SCREEN_DESCRIPTION}
          </p>
          <div className="textAlignCenter footerContent width100 margin20 noSideMargin">
            <Button className="button large" type="button" onClick={this.onClick}>{cqContent.label.OD_GET_STARTED_SCREEN_SCREEN_BUTTON_CTA}</Button>
          </div>
        </div>
      </div>
    );
  }
}
GetStarted.propTypes = {
  goToUrl: PropTypes.string,
  cqContent: PropTypes.object,
};
