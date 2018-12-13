/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 */
import React from 'react';
import AlertImage from '../../images/Verizon_Alert_Icon.svg';

__webpack_public_path__ = window.resourceBaseUrl;

export default class NotFound extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <div className="textAlignCenter">
          <div className="vh80 ">
            <div className="pad48 ">
              <div className="pad60 onlyTopPad">
                <img className="svg-icon_alert" src={`${AlertImage}`} aria-hidden="true" alt="warning" />
              </div>
              <h2 className="fontSize_5">We&#39;re having trouble connecting.</h2>
              <p className="pad12 fontSize_2">You may want to check up on your network, then try again</p>
            </div>
          </div>
          <div>
            <a className="button" href="/" analyticstrack="page-not-found-ok">Ok</a>
          </div>
        </div>
      </div>
    );
  }
}
